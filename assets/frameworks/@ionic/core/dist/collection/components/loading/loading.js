/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { ENABLE_HTML_CONTENT_DEFAULT } from "../../utils/config";
import { raf } from "../../utils/helpers";
import { createLockController } from "../../utils/lock-controller";
import { BACKDROP, dismiss, eventMethod, prepareOverlay, present, createDelegateController, createTriggerController, setOverlayId, } from "../../utils/overlays";
import { sanitizeDOMString } from "../../utils/sanitization/index";
import { getClassMap } from "../../utils/theme";
import { config } from "../../global/config";
import { getIonMode } from "../../global/ionic-global";
import { iosEnterAnimation } from "./animations/ios.enter";
import { iosLeaveAnimation } from "./animations/ios.leave";
import { mdEnterAnimation } from "./animations/md.enter";
import { mdLeaveAnimation } from "./animations/md.leave";
// TODO(FW-2832): types
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class Loading {
    constructor() {
        this.delegateController = createDelegateController(this);
        this.lockController = createLockController();
        this.triggerController = createTriggerController();
        this.customHTMLEnabled = config.get('innerHTMLTemplatesEnabled', ENABLE_HTML_CONTENT_DEFAULT);
        this.presented = false;
        this.onBackdropTap = () => {
            this.dismiss(undefined, BACKDROP);
        };
        this.overlayIndex = undefined;
        this.delegate = undefined;
        this.hasController = false;
        this.keyboardClose = true;
        this.enterAnimation = undefined;
        this.leaveAnimation = undefined;
        this.message = undefined;
        this.cssClass = undefined;
        this.duration = 0;
        this.backdropDismiss = false;
        this.showBackdrop = true;
        this.spinner = undefined;
        this.translucent = false;
        this.animated = true;
        this.htmlAttributes = undefined;
        this.isOpen = false;
        this.trigger = undefined;
    }
    onIsOpenChange(newValue, oldValue) {
        if (newValue === true && oldValue === false) {
            this.present();
        }
        else if (newValue === false && oldValue === true) {
            this.dismiss();
        }
    }
    triggerChanged() {
        const { trigger, el, triggerController } = this;
        if (trigger) {
            triggerController.addClickListener(el, trigger);
        }
    }
    connectedCallback() {
        prepareOverlay(this.el);
        this.triggerChanged();
    }
    componentWillLoad() {
        var _a;
        if (this.spinner === undefined) {
            const mode = getIonMode(this);
            this.spinner = config.get('loadingSpinner', config.get('spinner', mode === 'ios' ? 'lines' : 'crescent'));
        }
        if (!((_a = this.htmlAttributes) === null || _a === void 0 ? void 0 : _a.id)) {
            setOverlayId(this.el);
        }
    }
    componentDidLoad() {
        /**
         * If loading indicator was rendered with isOpen="true"
         * then we should open loading indicator immediately.
         */
        if (this.isOpen === true) {
            raf(() => this.present());
        }
        /**
         * When binding values in frameworks such as Angular
         * it is possible for the value to be set after the Web Component
         * initializes but before the value watcher is set up in Stencil.
         * As a result, the watcher callback may not be fired.
         * We work around this by manually calling the watcher
         * callback when the component has loaded and the watcher
         * is configured.
         */
        this.triggerChanged();
    }
    disconnectedCallback() {
        this.triggerController.removeClickListener();
    }
    /**
     * Present the loading overlay after it has been created.
     */
    async present() {
        const unlock = await this.lockController.lock();
        await this.delegateController.attachViewToDom();
        await present(this, 'loadingEnter', iosEnterAnimation, mdEnterAnimation);
        if (this.duration > 0) {
            this.durationTimeout = setTimeout(() => this.dismiss(), this.duration + 10);
        }
        unlock();
    }
    /**
     * Dismiss the loading overlay after it has been presented.
     *
     * @param data Any data to emit in the dismiss events.
     * @param role The role of the element that is dismissing the loading.
     * This can be useful in a button handler for determining which button was
     * clicked to dismiss the loading.
     * Some examples include: ``"cancel"`, `"destructive"`, "selected"`, and `"backdrop"`.
     *
     * This is a no-op if the overlay has not been presented yet. If you want
     * to remove an overlay from the DOM that was never presented, use the
     * [remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method.
     */
    async dismiss(data, role) {
        const unlock = await this.lockController.lock();
        if (this.durationTimeout) {
            clearTimeout(this.durationTimeout);
        }
        const dismissed = await dismiss(this, data, role, 'loadingLeave', iosLeaveAnimation, mdLeaveAnimation);
        if (dismissed) {
            this.delegateController.removeViewFromDom();
        }
        unlock();
        return dismissed;
    }
    /**
     * Returns a promise that resolves when the loading did dismiss.
     */
    onDidDismiss() {
        return eventMethod(this.el, 'ionLoadingDidDismiss');
    }
    /**
     * Returns a promise that resolves when the loading will dismiss.
     */
    onWillDismiss() {
        return eventMethod(this.el, 'ionLoadingWillDismiss');
    }
    renderLoadingMessage(msgId) {
        const { customHTMLEnabled, message } = this;
        if (customHTMLEnabled) {
            return h("div", { class: "loading-content", id: msgId, innerHTML: sanitizeDOMString(message) });
        }
        return (h("div", { class: "loading-content", id: msgId }, message));
    }
    render() {
        const { message, spinner, htmlAttributes, overlayIndex } = this;
        const mode = getIonMode(this);
        const msgId = `loading-${overlayIndex}-msg`;
        /**
         * If the message is defined, use that as the label.
         * Otherwise, don't set aria-labelledby.
         */
        const ariaLabelledBy = message !== undefined ? msgId : null;
        return (h(Host, Object.assign({ key: 'd6066c8b56b1fe4b597a243a7dab191ef0d21286', role: "dialog", "aria-modal": "true", "aria-labelledby": ariaLabelledBy, tabindex: "-1" }, htmlAttributes, { style: {
                zIndex: `${40000 + this.overlayIndex}`,
            }, onIonBackdropTap: this.onBackdropTap, class: Object.assign(Object.assign({}, getClassMap(this.cssClass)), { [mode]: true, 'overlay-hidden': true, 'loading-translucent': this.translucent }) }), h("ion-backdrop", { key: '2431eda00a2a3f510f5dfc39b7c7d47c056dfa3d', visible: this.showBackdrop, tappable: this.backdropDismiss }), h("div", { key: 'cf210aaf5e754e4eccdb49cf7ead4647b3f9b2d1', tabindex: "0", "aria-hidden": "true" }), h("div", { key: 'fa9375143d391656d70e181d25b952c77c2fc6ec', class: "loading-wrapper ion-overlay-wrapper" }, spinner && (h("div", { key: '8e4a4ed994f7f62df86b03696ac95162df41f52d', class: "loading-spinner" }, h("ion-spinner", { key: 'e5b323c272d365853ba92bd211e390b4fd4751d2', name: spinner, "aria-hidden": "true" }))), message !== undefined && this.renderLoadingMessage(msgId)), h("div", { key: 'cae35ec8c34800477bff3ebcec8010e632158233', tabindex: "0", "aria-hidden": "true" })));
    }
    static get is() { return "ion-loading"; }
    static get encapsulation() { return "scoped"; }
    static get originalStyleUrls() {
        return {
            "ios": ["loading.ios.scss"],
            "md": ["loading.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["loading.ios.css"],
            "md": ["loading.md.css"]
        };
    }
    static get properties() {
        return {
            "overlayIndex": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": true,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "attribute": "overlay-index",
                "reflect": false
            },
            "delegate": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "FrameworkDelegate",
                    "resolved": "FrameworkDelegate | undefined",
                    "references": {
                        "FrameworkDelegate": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::FrameworkDelegate"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                }
            },
            "hasController": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "attribute": "has-controller",
                "reflect": false,
                "defaultValue": "false"
            },
            "keyboardClose": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the keyboard will be automatically dismissed when the overlay is presented."
                },
                "attribute": "keyboard-close",
                "reflect": false,
                "defaultValue": "true"
            },
            "enterAnimation": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "AnimationBuilder",
                    "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
                    "references": {
                        "AnimationBuilder": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AnimationBuilder"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Animation to use when the loading indicator is presented."
                }
            },
            "leaveAnimation": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "AnimationBuilder",
                    "resolved": "((baseEl: any, opts?: any) => Animation) | undefined",
                    "references": {
                        "AnimationBuilder": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::AnimationBuilder"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Animation to use when the loading indicator is dismissed."
                }
            },
            "message": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | IonicSafeString",
                    "resolved": "IonicSafeString | string | undefined",
                    "references": {
                        "IonicSafeString": {
                            "location": "import",
                            "path": "../../utils/sanitization",
                            "id": "src/utils/sanitization/index.ts::IonicSafeString"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Optional text content to display in the loading indicator.\n\nThis property accepts custom HTML as a string.\nContent is parsed as plaintext by default.\n`innerHTMLTemplatesEnabled` must be set to `true` in the Ionic config\nbefore custom HTML can be used."
                },
                "attribute": "message",
                "reflect": false
            },
            "cssClass": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | string[]",
                    "resolved": "string | string[] | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Additional classes to apply for custom CSS. If multiple classes are\nprovided they should be separated by spaces."
                },
                "attribute": "css-class",
                "reflect": false
            },
            "duration": {
                "type": "number",
                "mutable": false,
                "complexType": {
                    "original": "number",
                    "resolved": "number",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "Number of milliseconds to wait before dismissing the loading indicator."
                },
                "attribute": "duration",
                "reflect": false,
                "defaultValue": "0"
            },
            "backdropDismiss": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the loading indicator will be dismissed when the backdrop is clicked."
                },
                "attribute": "backdrop-dismiss",
                "reflect": false,
                "defaultValue": "false"
            },
            "showBackdrop": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, a backdrop will be displayed behind the loading indicator."
                },
                "attribute": "show-backdrop",
                "reflect": false,
                "defaultValue": "true"
            },
            "spinner": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "SpinnerTypes | null",
                    "resolved": "\"bubbles\" | \"circles\" | \"circular\" | \"crescent\" | \"dots\" | \"lines\" | \"lines-sharp\" | \"lines-sharp-small\" | \"lines-small\" | null | undefined",
                    "references": {
                        "SpinnerTypes": {
                            "location": "import",
                            "path": "../spinner/spinner-configs",
                            "id": "src/components/spinner/spinner-configs.ts::SpinnerTypes"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The name of the spinner to display."
                },
                "attribute": "spinner",
                "reflect": false
            },
            "translucent": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the loading indicator will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility)."
                },
                "attribute": "translucent",
                "reflect": false,
                "defaultValue": "false"
            },
            "animated": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the loading indicator will animate."
                },
                "attribute": "animated",
                "reflect": false,
                "defaultValue": "true"
            },
            "htmlAttributes": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "{ [key: string]: any }",
                    "resolved": "undefined | { [key: string]: any; }",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Additional attributes to pass to the loader."
                }
            },
            "isOpen": {
                "type": "boolean",
                "mutable": false,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "If `true`, the loading indicator will open. If `false`, the loading indicator will close.\nUse this if you need finer grained control over presentation, otherwise\njust use the loadingController or the `trigger` property.\nNote: `isOpen` will not automatically be set back to `false` when\nthe loading indicator dismisses. You will need to do that in your code."
                },
                "attribute": "is-open",
                "reflect": false,
                "defaultValue": "false"
            },
            "trigger": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string | undefined",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "An ID corresponding to the trigger element that\ncauses the loading indicator to open when clicked."
                },
                "attribute": "trigger",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "didPresent",
                "name": "ionLoadingDidPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the loading has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willPresent",
                "name": "ionLoadingWillPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the loading has presented."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willDismiss",
                "name": "ionLoadingWillDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the loading has dismissed."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didDismiss",
                "name": "ionLoadingDidDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the loading has dismissed."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didPresentShorthand",
                "name": "didPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the loading indicator has presented.\nShorthand for ionLoadingWillDismiss."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willPresentShorthand",
                "name": "willPresent",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the loading indicator has presented.\nShorthand for ionLoadingWillPresent."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }, {
                "method": "willDismissShorthand",
                "name": "willDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted before the loading indicator has dismissed.\nShorthand for ionLoadingWillDismiss."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        }
                    }
                }
            }, {
                "method": "didDismissShorthand",
                "name": "didDismiss",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted after the loading indicator has dismissed.\nShorthand for ionLoadingDidDismiss."
                },
                "complexType": {
                    "original": "OverlayEventDetail",
                    "resolved": "OverlayEventDetail<any>",
                    "references": {
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        }
                    }
                }
            }];
    }
    static get methods() {
        return {
            "present": {
                "complexType": {
                    "signature": "() => Promise<void>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<void>"
                },
                "docs": {
                    "text": "Present the loading overlay after it has been created.",
                    "tags": []
                }
            },
            "dismiss": {
                "complexType": {
                    "signature": "(data?: any, role?: string) => Promise<boolean>",
                    "parameters": [{
                            "name": "data",
                            "type": "any",
                            "docs": "Any data to emit in the dismiss events."
                        }, {
                            "name": "role",
                            "type": "string | undefined",
                            "docs": "The role of the element that is dismissing the loading.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the loading.\nSome examples include: ``\"cancel\"`, `\"destructive\"`, \"selected\"`, and `\"backdrop\"`.\n\nThis is a no-op if the overlay has not been presented yet. If you want\nto remove an overlay from the DOM that was never presented, use the\n[remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method."
                        }],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        }
                    },
                    "return": "Promise<boolean>"
                },
                "docs": {
                    "text": "Dismiss the loading overlay after it has been presented.",
                    "tags": [{
                            "name": "param",
                            "text": "data Any data to emit in the dismiss events."
                        }, {
                            "name": "param",
                            "text": "role The role of the element that is dismissing the loading.\nThis can be useful in a button handler for determining which button was\nclicked to dismiss the loading.\nSome examples include: ``\"cancel\"`, `\"destructive\"`, \"selected\"`, and `\"backdrop\"`.\n\nThis is a no-op if the overlay has not been presented yet. If you want\nto remove an overlay from the DOM that was never presented, use the\n[remove](https://developer.mozilla.org/en-US/docs/Web/API/Element/remove) method."
                        }]
                }
            },
            "onDidDismiss": {
                "complexType": {
                    "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        },
                        "T": {
                            "location": "global",
                            "id": "global::T"
                        }
                    },
                    "return": "Promise<OverlayEventDetail<T>>"
                },
                "docs": {
                    "text": "Returns a promise that resolves when the loading did dismiss.",
                    "tags": []
                }
            },
            "onWillDismiss": {
                "complexType": {
                    "signature": "<T = any>() => Promise<OverlayEventDetail<T>>",
                    "parameters": [],
                    "references": {
                        "Promise": {
                            "location": "global",
                            "id": "global::Promise"
                        },
                        "OverlayEventDetail": {
                            "location": "import",
                            "path": "../../utils/overlays-interface",
                            "id": "src/utils/overlays-interface.ts::OverlayEventDetail"
                        },
                        "T": {
                            "location": "global",
                            "id": "global::T"
                        }
                    },
                    "return": "Promise<OverlayEventDetail<T>>"
                },
                "docs": {
                    "text": "Returns a promise that resolves when the loading will dismiss.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "isOpen",
                "methodName": "onIsOpenChange"
            }, {
                "propName": "trigger",
                "methodName": "triggerChanged"
            }];
    }
}
