/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { inheritAttributes } from "../../utils/helpers";
import { config } from "../../global/config";
import { getIonMode } from "../../global/ionic-global";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 *
 * @part native - The native HTML anchor element that wraps all child elements.
 */
export class TabButton {
    constructor() {
        this.inheritedAttributes = {};
        this.onKeyUp = (ev) => {
            if (ev.key === 'Enter' || ev.key === ' ') {
                this.selectTab(ev);
            }
        };
        this.onClick = (ev) => {
            this.selectTab(ev);
        };
        this.disabled = false;
        this.download = undefined;
        this.href = undefined;
        this.rel = undefined;
        this.layout = undefined;
        this.selected = false;
        this.tab = undefined;
        this.target = undefined;
    }
    onTabBarChanged(ev) {
        const dispatchedFrom = ev.target;
        const parent = this.el.parentElement;
        if (ev.composedPath().includes(parent) || (dispatchedFrom === null || dispatchedFrom === void 0 ? void 0 : dispatchedFrom.contains(this.el))) {
            this.selected = this.tab === ev.detail.tab;
        }
    }
    componentWillLoad() {
        this.inheritedAttributes = Object.assign({}, inheritAttributes(this.el, ['aria-label']));
        if (this.layout === undefined) {
            this.layout = config.get('tabButtonLayout', 'icon-top');
        }
    }
    selectTab(ev) {
        if (this.tab !== undefined) {
            if (!this.disabled) {
                this.ionTabButtonClick.emit({
                    tab: this.tab,
                    href: this.href,
                    selected: this.selected,
                });
            }
            ev.preventDefault();
        }
    }
    get hasLabel() {
        return !!this.el.querySelector('ion-label');
    }
    get hasIcon() {
        return !!this.el.querySelector('ion-icon');
    }
    render() {
        const { disabled, hasIcon, hasLabel, href, rel, target, layout, selected, tab, inheritedAttributes } = this;
        const mode = getIonMode(this);
        const attrs = {
            download: this.download,
            href,
            rel,
            target,
        };
        return (h(Host, { key: 'a86d441d8df350fe991f2f948fc6b6ad007728f7', onClick: this.onClick, onKeyup: this.onKeyUp, id: tab !== undefined ? `tab-button-${tab}` : null, class: {
                [mode]: true,
                'tab-selected': selected,
                'tab-disabled': disabled,
                'tab-has-label': hasLabel,
                'tab-has-icon': hasIcon,
                'tab-has-label-only': hasLabel && !hasIcon,
                'tab-has-icon-only': hasIcon && !hasLabel,
                [`tab-layout-${layout}`]: true,
                'ion-activatable': true,
                'ion-selectable': true,
                'ion-focusable': true,
            } }, h("a", Object.assign({ key: '8dfe1ccff2cf21601c5aea7f7f877c0fbe384e09' }, attrs, { class: "button-native", part: "native", role: "tab", "aria-selected": selected ? 'true' : null, "aria-disabled": disabled ? 'true' : null, tabindex: disabled ? '-1' : undefined }, inheritedAttributes), h("span", { key: '3f557cf6e96e22b9318b4aee19ede810eb7fb720', class: "button-inner" }, h("slot", { key: '836dd090dbe3c2ea97dc263fca7d01dea6ea0eb6' })), mode === 'md' && h("ion-ripple-effect", { key: '488a924fd04602c1b23e03d1a4c84dfa0f2ca03d', type: "unbounded" }))));
    }
    static get is() { return "ion-tab-button"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "ios": ["tab-button.ios.scss"],
            "md": ["tab-button.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["tab-button.ios.css"],
            "md": ["tab-button.md.css"]
        };
    }
    static get properties() {
        return {
            "disabled": {
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
                    "text": "If `true`, the user cannot interact with the tab button."
                },
                "attribute": "disabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "download": {
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
                    "text": "This attribute instructs browsers to download a URL instead of navigating to\nit, so the user will be prompted to save it as a local file. If the attribute\nhas a value, it is used as the pre-filled file name in the Save prompt\n(the user can still change the file name if they want)."
                },
                "attribute": "download",
                "reflect": false
            },
            "href": {
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
                    "text": "Contains a URL or a URL fragment that the hyperlink points to.\nIf this property is set, an anchor tag will be rendered."
                },
                "attribute": "href",
                "reflect": false
            },
            "rel": {
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
                    "text": "Specifies the relationship of the target object to the link object.\nThe value is a space-separated list of [link types](https://developer.mozilla.org/en-US/docs/Web/HTML/Link_types)."
                },
                "attribute": "rel",
                "reflect": false
            },
            "layout": {
                "type": "string",
                "mutable": true,
                "complexType": {
                    "original": "TabButtonLayout",
                    "resolved": "\"icon-bottom\" | \"icon-end\" | \"icon-hide\" | \"icon-start\" | \"icon-top\" | \"label-hide\" | undefined",
                    "references": {
                        "TabButtonLayout": {
                            "location": "import",
                            "path": "../tab-bar/tab-bar-interface",
                            "id": "src/components/tab-bar/tab-bar-interface.ts::TabButtonLayout"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Set the layout of the text and icon in the tab bar.\nIt defaults to `\"icon-top\"`."
                },
                "attribute": "layout",
                "reflect": false
            },
            "selected": {
                "type": "boolean",
                "mutable": true,
                "complexType": {
                    "original": "boolean",
                    "resolved": "boolean",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The selected tab component"
                },
                "attribute": "selected",
                "reflect": false,
                "defaultValue": "false"
            },
            "tab": {
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
                    "text": "A tab id must be provided for each `ion-tab`. It's used internally to reference\nthe selected tab or by the router to switch between them."
                },
                "attribute": "tab",
                "reflect": false
            },
            "target": {
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
                    "text": "Specifies where to display the linked URL.\nOnly applies when an `href` is provided.\nSpecial keywords: `\"_blank\"`, `\"_self\"`, `\"_parent\"`, `\"_top\"`."
                },
                "attribute": "target",
                "reflect": false
            }
        };
    }
    static get events() {
        return [{
                "method": "ionTabButtonClick",
                "name": "ionTabButtonClick",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [{
                            "name": "internal",
                            "text": undefined
                        }],
                    "text": "Emitted when the tab bar is clicked"
                },
                "complexType": {
                    "original": "TabButtonClickEventDetail",
                    "resolved": "TabButtonClickEventDetail",
                    "references": {
                        "TabButtonClickEventDetail": {
                            "location": "import",
                            "path": "../tab-bar/tab-bar-interface",
                            "id": "src/components/tab-bar/tab-bar-interface.ts::TabButtonClickEventDetail"
                        }
                    }
                }
            }];
    }
    static get elementRef() { return "el"; }
    static get listeners() {
        return [{
                "name": "ionTabBarChanged",
                "method": "onTabBarChanged",
                "target": "window",
                "capture": false,
                "passive": false
            }];
    }
}
