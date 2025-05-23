/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h } from "@stencil/core";
import { getIonMode } from "../../global/ionic-global";
export class Grid {
    constructor() {
        this.fixed = false;
    }
    render() {
        const mode = getIonMode(this);
        return (h(Host, { key: '617127ecfabf9bf615bef1dda1be3fed5a065949', class: {
                [mode]: true,
                'grid-fixed': this.fixed,
            } }, h("slot", { key: 'c781fff853b093d8f44bdb7943bbc4f17c903803' })));
    }
    static get is() { return "ion-grid"; }
    static get encapsulation() { return "shadow"; }
    static get originalStyleUrls() {
        return {
            "$": ["grid.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["grid.css"]
        };
    }
    static get properties() {
        return {
            "fixed": {
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
                    "text": "If `true`, the grid will have a fixed width based on the screen size."
                },
                "attribute": "fixed",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
}
