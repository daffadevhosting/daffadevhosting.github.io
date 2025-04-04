/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { navLink } from "./nav-link-utils";
export class NavLink {
    constructor() {
        this.onClick = () => {
            return navLink(this.el, this.routerDirection, this.component, this.componentProps, this.routerAnimation);
        };
        this.component = undefined;
        this.componentProps = undefined;
        this.routerDirection = 'forward';
        this.routerAnimation = undefined;
    }
    render() {
        return h(Host, { key: '9ba170d1b10e08e8a6b5e6a30d363871d455a0a9', onClick: this.onClick });
    }
    static get is() { return "ion-nav-link"; }
    static get properties() {
        return {
            "component": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "NavComponent",
                    "resolved": "Function | HTMLElement | ViewController | null | string | undefined",
                    "references": {
                        "NavComponent": {
                            "location": "import",
                            "path": "../nav/nav-interface",
                            "id": "src/components/nav/nav-interface.ts::NavComponent"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Component to navigate to. Only used if the `routerDirection` is `\"forward\"` or `\"root\"`."
                },
                "attribute": "component",
                "reflect": false
            },
            "componentProps": {
                "type": "unknown",
                "mutable": false,
                "complexType": {
                    "original": "ComponentProps",
                    "resolved": "undefined | { [key: string]: any; }",
                    "references": {
                        "ComponentProps": {
                            "location": "import",
                            "path": "../../interface",
                            "id": "src/interface.d.ts::ComponentProps"
                        }
                    }
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Data you want to pass to the component as props. Only used if the `\"routerDirection\"` is `\"forward\"` or `\"root\"`."
                }
            },
            "routerDirection": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "RouterDirection",
                    "resolved": "\"back\" | \"forward\" | \"root\"",
                    "references": {
                        "RouterDirection": {
                            "location": "import",
                            "path": "../router/utils/interface",
                            "id": "src/components/router/utils/interface.ts::RouterDirection"
                        }
                    }
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The transition direction when navigating to another page."
                },
                "attribute": "router-direction",
                "reflect": false,
                "defaultValue": "'forward'"
            },
            "routerAnimation": {
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
                    "text": "The transition animation when navigating to another page."
                }
            }
        };
    }
    static get elementRef() { return "el"; }
}
