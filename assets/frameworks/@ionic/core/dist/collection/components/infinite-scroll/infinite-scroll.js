/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
import { Host, h, readTask, writeTask } from "@stencil/core";
import { findClosestIonContent, getScrollElement, printIonContentErrorMsg } from "../../utils/content/index";
import { getIonMode } from "../../global/ionic-global";
export class InfiniteScroll {
    constructor() {
        this.thrPx = 0;
        this.thrPc = 0;
        /**
         * didFire exists so that ionInfinite
         * does not fire multiple times if
         * users continue to scroll after
         * scrolling into the infinite
         * scroll threshold.
         */
        this.didFire = false;
        this.isBusy = false;
        this.onScroll = () => {
            const scrollEl = this.scrollEl;
            if (!scrollEl || !this.canStart()) {
                return 1;
            }
            const infiniteHeight = this.el.offsetHeight;
            if (infiniteHeight === 0) {
                // if there is no height of this element then do nothing
                return 2;
            }
            const scrollTop = scrollEl.scrollTop;
            const scrollHeight = scrollEl.scrollHeight;
            const height = scrollEl.offsetHeight;
            const threshold = this.thrPc !== 0 ? height * this.thrPc : this.thrPx;
            const distanceFromInfinite = this.position === 'bottom'
                ? scrollHeight - infiniteHeight - scrollTop - threshold - height
                : scrollTop - infiniteHeight - threshold;
            if (distanceFromInfinite < 0) {
                if (!this.didFire) {
                    this.isLoading = true;
                    this.didFire = true;
                    this.ionInfinite.emit();
                    return 3;
                }
            }
            return 4;
        };
        this.isLoading = false;
        this.threshold = '15%';
        this.disabled = false;
        this.position = 'bottom';
    }
    thresholdChanged() {
        const val = this.threshold;
        if (val.lastIndexOf('%') > -1) {
            this.thrPx = 0;
            this.thrPc = parseFloat(val) / 100;
        }
        else {
            this.thrPx = parseFloat(val);
            this.thrPc = 0;
        }
    }
    disabledChanged() {
        const disabled = this.disabled;
        if (disabled) {
            this.isLoading = false;
            this.isBusy = false;
        }
        this.enableScrollEvents(!disabled);
    }
    async connectedCallback() {
        const contentEl = findClosestIonContent(this.el);
        if (!contentEl) {
            printIonContentErrorMsg(this.el);
            return;
        }
        this.scrollEl = await getScrollElement(contentEl);
        this.thresholdChanged();
        this.disabledChanged();
        if (this.position === 'top') {
            writeTask(() => {
                if (this.scrollEl) {
                    this.scrollEl.scrollTop = this.scrollEl.scrollHeight - this.scrollEl.clientHeight;
                }
            });
        }
    }
    disconnectedCallback() {
        this.enableScrollEvents(false);
        this.scrollEl = undefined;
    }
    /**
     * Call `complete()` within the `ionInfinite` output event handler when
     * your async operation has completed. For example, the `loading`
     * state is while the app is performing an asynchronous operation,
     * such as receiving more data from an AJAX request to add more items
     * to a data list. Once the data has been received and UI updated, you
     * then call this method to signify that the loading has completed.
     * This method will change the infinite scroll's state from `loading`
     * to `enabled`.
     */
    async complete() {
        const scrollEl = this.scrollEl;
        if (!this.isLoading || !scrollEl) {
            return;
        }
        this.isLoading = false;
        if (this.position === 'top') {
            /**
             * New content is being added at the top, but the scrollTop position stays the same,
             * which causes a scroll jump visually. This algorithm makes sure to prevent this.
             * (Frame 1)
             *    - complete() is called, but the UI hasn't had time to update yet.
             *    - Save the current content dimensions.
             *    - Wait for the next frame using _dom.read, so the UI will be updated.
             * (Frame 2)
             *    - Read the new content dimensions.
             *    - Calculate the height difference and the new scroll position.
             *    - Delay the scroll position change until other possible dom reads are done using _dom.write to be performant.
             * (Still frame 2, if I'm correct)
             *    - Change the scroll position (= visually maintain the scroll position).
             *    - Change the state to re-enable the InfiniteScroll.
             *    - This should be after changing the scroll position, or it could
             *    cause the InfiniteScroll to be triggered again immediately.
             * (Frame 3)
             *    Done.
             */
            this.isBusy = true;
            // ******** DOM READ ****************
            // Save the current content dimensions before the UI updates
            const prev = scrollEl.scrollHeight - scrollEl.scrollTop;
            // ******** DOM READ ****************
            requestAnimationFrame(() => {
                readTask(() => {
                    // UI has updated, save the new content dimensions
                    const scrollHeight = scrollEl.scrollHeight;
                    // New content was added on top, so the scroll position should be changed immediately to prevent it from jumping around
                    const newScrollTop = scrollHeight - prev;
                    // ******** DOM WRITE ****************
                    requestAnimationFrame(() => {
                        writeTask(() => {
                            scrollEl.scrollTop = newScrollTop;
                            this.isBusy = false;
                            this.didFire = false;
                        });
                    });
                });
            });
        }
        else {
            this.didFire = false;
        }
    }
    canStart() {
        return !this.disabled && !this.isBusy && !!this.scrollEl && !this.isLoading;
    }
    enableScrollEvents(shouldListen) {
        if (this.scrollEl) {
            if (shouldListen) {
                this.scrollEl.addEventListener('scroll', this.onScroll);
            }
            else {
                this.scrollEl.removeEventListener('scroll', this.onScroll);
            }
        }
    }
    render() {
        const mode = getIonMode(this);
        const disabled = this.disabled;
        return (h(Host, { key: 'e844956795f69be33396ce4480aa7a54ad01b28c', class: {
                [mode]: true,
                'infinite-scroll-loading': this.isLoading,
                'infinite-scroll-enabled': !disabled,
            } }));
    }
    static get is() { return "ion-infinite-scroll"; }
    static get originalStyleUrls() {
        return {
            "$": ["infinite-scroll.scss"]
        };
    }
    static get styleUrls() {
        return {
            "$": ["infinite-scroll.css"]
        };
    }
    static get properties() {
        return {
            "threshold": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "string",
                    "resolved": "string",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The threshold distance from the bottom\nof the content to call the `infinite` output event when scrolled.\nThe threshold value can be either a percent, or\nin pixels. For example, use the value of `10%` for the `infinite`\noutput event to get called when the user has scrolled 10%\nfrom the bottom of the page. Use the value `100px` when the\nscroll is within 100 pixels from the bottom of the page."
                },
                "attribute": "threshold",
                "reflect": false,
                "defaultValue": "'15%'"
            },
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
                    "text": "If `true`, the infinite scroll will be hidden and scroll event listeners\nwill be removed.\n\nSet this to true to disable the infinite scroll from actively\ntrying to receive new data while scrolling. This is useful\nwhen it is known that there is no more data that can be added, and\nthe infinite scroll is no longer needed."
                },
                "attribute": "disabled",
                "reflect": false,
                "defaultValue": "false"
            },
            "position": {
                "type": "string",
                "mutable": false,
                "complexType": {
                    "original": "'top' | 'bottom'",
                    "resolved": "\"bottom\" | \"top\"",
                    "references": {}
                },
                "required": false,
                "optional": false,
                "docs": {
                    "tags": [],
                    "text": "The position of the infinite scroll element.\nThe value can be either `top` or `bottom`."
                },
                "attribute": "position",
                "reflect": false,
                "defaultValue": "'bottom'"
            }
        };
    }
    static get states() {
        return {
            "isLoading": {}
        };
    }
    static get events() {
        return [{
                "method": "ionInfinite",
                "name": "ionInfinite",
                "bubbles": true,
                "cancelable": true,
                "composed": true,
                "docs": {
                    "tags": [],
                    "text": "Emitted when the scroll reaches\nthe threshold distance. From within your infinite handler,\nyou must call the infinite scroll's `complete()` method when\nyour async operation has completed."
                },
                "complexType": {
                    "original": "void",
                    "resolved": "void",
                    "references": {}
                }
            }];
    }
    static get methods() {
        return {
            "complete": {
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
                    "text": "Call `complete()` within the `ionInfinite` output event handler when\nyour async operation has completed. For example, the `loading`\nstate is while the app is performing an asynchronous operation,\nsuch as receiving more data from an AJAX request to add more items\nto a data list. Once the data has been received and UI updated, you\nthen call this method to signify that the loading has completed.\nThis method will change the infinite scroll's state from `loading`\nto `enabled`.",
                    "tags": []
                }
            }
        };
    }
    static get elementRef() { return "el"; }
    static get watchers() {
        return [{
                "propName": "threshold",
                "methodName": "thresholdChanged"
            }, {
                "propName": "disabled",
                "methodName": "disabledChanged"
            }];
    }
}
