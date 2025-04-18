/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { createKeyboardController } from "../../utils/keyboard/keyboard-controller";
import { createColorClasses } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class TabBar {
    constructor() {
        this.keyboardCtrl = null;
        this.keyboardVisible = false;
        this.color = undefined;
        this.selectedTab = undefined;
        this.translucent = false;
    }
    selectedTabChanged() {
        if (this.selectedTab !== undefined) {
            this.ionTabBarChanged.emit({
                tab: this.selectedTab,
            });
        }
    }
    componentWillLoad() {
        this.selectedTabChanged();
    }
    async connectedCallback() {
        this.keyboardCtrl = await createKeyboardController(async (keyboardOpen, waitForResize) => {
            /**
             * If the keyboard is hiding, then we need to wait
             * for the webview to resize. Otherwise, the tab bar
             * will flicker before the webview resizes.
             */
            if (keyboardOpen === false && waitForResize !== undefined) {
                await waitForResize;
            }
            this.keyboardVisible = keyboardOpen; // trigger re-render by updating state
        });
    }
    disconnectedCallback() {
        if (this.keyboardCtrl) {
            this.keyboardCtrl.destroy();
        }
    }
    componentDidLoad() {
        this.ionTabBarLoaded.emit();
    }
    render() {
        const { color, translucent, keyboardVisible } = this;
        const mode = getIonMode(this);
        const shouldHide = keyboardVisible && this.el.getAttribute('slot') !== 'top';
        return (h(Host, { key: '62303a7f9d8c98ffab51a5900c144c5117b9c543', role: "tablist", "aria-hidden": shouldHide ? 'true' : null, class: createColorClasses(color, {
                [mode]: true,
                'tab-bar-translucent': translucent,
                'tab-bar-hidden': shouldHide,
            }) }, h("slot", { key: '5771a9828f748c2bd6b5e26758b9723c6b3de5ff' })));
    }
    static get is() { return "ion-tab-bar"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["tab-bar.ios.scss"],
            "md": ["tab-bar.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["tab-bar.ios.css"],
            "md": ["tab-bar.md.css"]
        };
    }
    static get properties() {
        return {
            "color": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "Color",
                    "resolved": "\"danger\" | \"dark\" | \"light\" | \"medium\" | \"primary\" | \"secondary\" | \"success\" | \"tertiary\" | \"warning\" | string & Record<never, never> | undefined",
                    "references": {
                        "Color": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::Color"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The color to use from your application's color palette.\nDefault options are: `\"primary\"`, `\"secondary\"`, `\"tertiary\"`, `\"success\"`, `\"warning\"`, `\"danger\"`, `\"light\"`, `\"medium\"`, and `\"dark\"`.\nFor more information on colors, see [theming](/docs/theming/basics)."
                },
                "attribute": "color",
                "reflect": true
            },
            "selectedTab": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "The selected tab component"
                },
                "attribute": "selected-tab",
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
                    "text": "If `true`, the tab bar will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility)."
                },
                "attribute": "translucent",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get states() {
        return {
            "keyboardVisible": {}
        };
    }
    static get events() {
        return [{
                "method": "ionTabBarChanged",
                "name": "ionTabBarChanged",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "TabBarChangedEventDetail",
                    "resolved": "TabBarChangedEventDetail",
                    "references": {
                        "TabBarChangedEventDetail": {
                            "location": "import",
                            "path": "./tab-bar-interface",
                            "id": "src/components/tab-bar/tab-bar-interface.ts::TabBarChangedEventDetail"
                        }
                    }
                }
            }, {
                "method": "ionTabBarLoaded",
                "name": "ionTabBarLoaded",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": "This event is used in IonContent to correctly\ncalculate the fullscreen content offsets\nwhen IonTabBar is used."
                        }],
                    "text": ""
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "selectedTab",
                "methodName": "selectedTabChanged"
            }];
    }
}
