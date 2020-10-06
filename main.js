const playwright = require('playwright');
const { SearchPage } = require('./src/models/SearchPage');


(async () => {
  for (const browserType of ['chromium', 'firefox', 'webkit']) {

    // Create the Browser instance
    const browser = await playwright[browserType].launch({ 
      headless: true 
    });

    // Create a Browser Context
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 2,
      locale: 'fr-CH',
      timezoneId: 'Europe/Zurich',
    });

    // Consent the privacy policy
    await context.addCookies([{
      name: 'CONSENT',
      value: 'YES+CH.fr+V10+BX',
      url: 'https://www.google.ch',
      httpOnly: false,
      secure: true,
      sameSite: 'None'
    }]);

    const page = await context.newPage();

    const searchPage = new SearchPage(page);
    await searchPage.goto();
    await searchPage.search('Odaceo');

    await page.screenshot({ path: `screenshot-${browserType}.png`, fullPage: true });
    await browser.close();
  }
})();
