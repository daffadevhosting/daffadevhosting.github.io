/*!
 * (C) Ionic http://ionicframework.com - MIT License
 */
/**
 * Overwrites the default Playwright page.setContent method.
 *
 * Navigates to a blank page, sets the content, and waits for the
 * Stencil components to be hydrated before proceeding with the test.
 *
 * @param page The Playwright page object.
 * @param html The HTML content to set on the page.
 * @param testInfo The TestInfo associated with the current test run. (DEPRECATED)
 * @param options The test config associated with the current test run.
 */
export const setContent = async (page, html, testInfo, options) => {
    if (page.isClosed()) {
        throw new Error('setContent unavailable: page is already closed');
    }
    let mode;
    let direction;
    let palette;
    if (options == undefined) {
        mode = testInfo.project.metadata.mode;
        direction = testInfo.project.metadata.rtl ? 'rtl' : 'ltr';
        palette = testInfo.project.metadata.palette;
    }
    else {
        mode = options.mode;
        direction = options.direction;
        palette = options.palette;
    }
    const baseUrl = process.env.PLAYWRIGHT_TEST_BASE_URL;
    const output = `
    <!DOCTYPE html>
    <html dir="${direction}" lang="en">
      <head>
        <title>Ionic Playwright Test</title>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0" />
        <link href="${baseUrl}/css/ionic.bundle.css" rel="stylesheet" />
        <link href="${baseUrl}/scripts/testing/styles.css" rel="stylesheet" />
        ${palette !== 'light' ? `<link href="${baseUrl}/css/palettes/${palette}.always.css" rel="stylesheet" />` : ''}
        <script src="${baseUrl}/scripts/testing/scripts.js"></script>
        <script type="module" src="${baseUrl}/dist/ionic/ionic.esm.js"></script>
        <script>
          window.Ionic = {
            config: {
              mode: '${mode}'
            }
          }
        </script>
      </head>
      <body>
        ${html}
      </body>
    </html>
  `;
    testInfo.annotations.push({
        type: 'palette',
        description: palette,
    });
    if (baseUrl) {
        await page.route(baseUrl, (route) => {
            if (route.request().url() === `${baseUrl}/`) {
                /**
                 * Intercepts the empty page request and returns the
                 * HTML content that was passed in.
                 */
                route.fulfill({
                    status: 200,
                    contentType: 'text/html',
                    body: output,
                });
            }
            else {
                // Allow all other requests to pass through
                route.continue();
            }
        });
        await page.goto(`${baseUrl}#`, options);
    }
};
