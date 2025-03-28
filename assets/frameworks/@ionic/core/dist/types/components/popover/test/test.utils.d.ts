import type { Locator } from '@playwright/test';
import type { E2EPage, ScreenshotFn } from "../../../utils/test/playwright/index";
export declare const openPopover: (page: E2EPage, buttonID: string, useEvalClick?: boolean) => Promise<void>;
export declare const closePopover: (page: E2EPage, popover?: Locator) => Promise<void>;
export declare const screenshotPopover: (page: E2EPage, screenshot: ScreenshotFn, buttonID: string, testName: string) => Promise<void>;
