/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h, writeTask } from "@stencil/core";
import { findIonContent, getScrollElement, printIonContentErrorMsg } from "../../utils/content/index";
import { inheritAriaAttributes } from "../../utils/helpers";
import { hostContext } from "../../utils/theme";
import { getIonMode } from "../../global/ionic-global";
import { cloneElement, createHeaderIndex, handleContentScroll, handleHeaderFade, handleToolbarIntersection, setHeaderActive, setToolbarBackgroundOpacity, } from "./header.utils";
/**
 * @virtualProp {"ios" | "md"} mode - The mode determines which platform styles to use.
 */
export class Header {
    constructor() {
        this.inheritedAttributes = {};
        this.setupFadeHeader = async (contentEl, condenseHeader) => {
            const scrollEl = (this.scrollEl = await getScrollElement(contentEl));
            /**
             * Handle fading of toolbars on scroll
             */
            this.contentScrollCallback = () => {
                handleHeaderFade(this.scrollEl, this.el, condenseHeader);
            };
            scrollEl.addEventListener('scroll', this.contentScrollCallback);
            handleHeaderFade(this.scrollEl, this.el, condenseHeader);
        };
        this.collapse = undefined;
        this.translucent = false;
    }
    componentWillLoad() {
        this.inheritedAttributes = inheritAriaAttributes(this.el);
    }
    componentDidLoad() {
        this.checkCollapsibleHeader();
    }
    componentDidUpdate() {
        this.checkCollapsibleHeader();
    }
    disconnectedCallback() {
        this.destroyCollapsibleHeader();
    }
    async checkCollapsibleHeader() {
        const mode = getIonMode(this);
        if (mode !== 'ios') {
            return;
        }
        const { collapse } = this;
        const hasCondense = collapse === 'condense';
        const hasFade = collapse === 'fade';
        this.destroyCollapsibleHeader();
        if (hasCondense) {
            const pageEl = this.el.closest('ion-app,ion-page,.ion-page,page-inner');
            const contentEl = pageEl ? findIonContent(pageEl) : null;
            // Cloned elements are always needed in iOS transition
            writeTask(() => {
                const title = cloneElement('ion-title');
                title.size = 'large';
                cloneElement('ion-back-button');
            });
            await this.setupCondenseHeader(contentEl, pageEl);
        }
        else if (hasFade) {
            const pageEl = this.el.closest('ion-app,ion-page,.ion-page,page-inner');
            const contentEl = pageEl ? findIonContent(pageEl) : null;
            if (!contentEl) {
                printIonContentErrorMsg(this.el);
                return;
            }
            const condenseHeader = contentEl.querySelector('ion-header[collapse="condense"]');
            await this.setupFadeHeader(contentEl, condenseHeader);
        }
    }
    destroyCollapsibleHeader() {
        if (this.intersectionObserver) {
            this.intersectionObserver.disconnect();
            this.intersectionObserver = undefined;
        }
        if (this.scrollEl && this.contentScrollCallback) {
            this.scrollEl.removeEventListener('scroll', this.contentScrollCallback);
            this.contentScrollCallback = undefined;
        }
        if (this.collapsibleMainHeader) {
            this.collapsibleMainHeader.classList.remove('header-collapse-main');
            this.collapsibleMainHeader = undefined;
        }
    }
    async setupCondenseHeader(contentEl, pageEl) {
        if (!contentEl || !pageEl) {
            printIonContentErrorMsg(this.el);
            return;
        }
        if (typeof IntersectionObserver === 'undefined') {
            return;
        }
        this.scrollEl = await getScrollElement(contentEl);
        const headers = pageEl.querySelectorAll('ion-header');
        this.collapsibleMainHeader = Array.from(headers).find((header) => header.collapse !== 'condense');
        if (!this.collapsibleMainHeader) {
            return;
        }
        const mainHeaderIndex = createHeaderIndex(this.collapsibleMainHeader);
        const scrollHeaderIndex = createHeaderIndex(this.el);
        if (!mainHeaderIndex || !scrollHeaderIndex) {
            return;
        }
        setHeaderActive(mainHeaderIndex, false);
        setToolbarBackgroundOpacity(mainHeaderIndex.el, 0);
        /**
         * Handle interaction between toolbar collapse and
         * showing/hiding content in the primary ion-header
         * as well as progressively showing/hiding the main header
         * border as the top-most toolbar collapses or expands.
         */
        const toolbarIntersection = (ev) => {
            handleToolbarIntersection(ev, mainHeaderIndex, scrollHeaderIndex, this.scrollEl);
        };
        this.intersectionObserver = new IntersectionObserver(toolbarIntersection, {
            root: contentEl,
            threshold: [0.25, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
        });
        this.intersectionObserver.observe(scrollHeaderIndex.toolbars[scrollHeaderIndex.toolbars.length - 1].el);
        /**
         * Handle scaling of large iOS titles and
         * showing/hiding border on last toolbar
         * in primary header
         */
        this.contentScrollCallback = () => {
            handleContentScroll(this.scrollEl, scrollHeaderIndex, contentEl);
        };
        this.scrollEl.addEventListener('scroll', this.contentScrollCallback);
        writeTask(() => {
            if (this.collapsibleMainHeader !== undefined) {
                this.collapsibleMainHeader.classList.add('header-collapse-main');
            }
        });
    }
    render() {
        const { translucent, inheritedAttributes } = this;
        const mode = getIonMode(this);
        const collapse = this.collapse || 'none';
        // banner role must be at top level, so remove role if inside a menu
        const roleType = hostContext('ion-menu', this.el) ? 'none' : 'banner';
        return (h(Host, Object.assign({ key: 'b6cc27f0b08afc9fcc889683525da765d80ba672', role: roleType, class: {
                [mode]: true,
                // Used internally for styling
                [`header-${mode}`]: true,
                [`header-translucent`]: this.translucent,
                [`header-collapse-${collapse}`]: true,
                [`header-translucent-${mode}`]: this.translucent,
            } }, inheritedAttributes), mode === 'ios' && translucent && h("div", { key: '395766d4dcee3398bc91960db21f922095292f14', class: "header-background" }), h("slot", { key: '09a67ece27b258ff1248805d43d92a49b2c6859a' })));
    }
    static get is() { return "ion-header"; }
    static get originalStyleUrls() {
        return {
            "ios": ["header.ios.scss"],
            "md": ["header.md.scss"]
        };
    }
    static get styleUrls() {
        return {
            "ios": ["header.ios.css"],
            "md": ["header.md.css"]
        };
    }
    static get properties() {
        return {
            "collapse": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'condense' | 'fade'",
                    "resolved": "\"condense\" | \"fade\" | undefined",
                    "references": {}
                },
                "required": false,
                "optional": true,
                "docs": {
                    "tags": [],
                    "text": "Describes the scroll effect that will be applied to the header.\nOnly applies in iOS mode.\n\nTypically used for [Collapsible Large Titles](https://ionicframework.com/docs/api/title#collapsible-large-titles)"
                },
                "attribute": "collapse",
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
                    "text": "If `true`, the header will be translucent.\nOnly applies when the mode is `\"ios\"` and the device supports\n[`backdrop-filter`](https://developer.mozilla.org/en-US/docs/Web/CSS/backdrop-filter#Browser_compatibility).\n\nNote: In order to scroll content behind the header, the `fullscreen`\nattribute needs to be set on the content."
                },
                "attribute": "translucent",
                "reflect": false,
                "defaultValue": "false"
            }
        };
    }
    static get elementRef() { return "el"; }
}
