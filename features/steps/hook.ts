// import { After } from '@cucumber/cucumber';
// import { Browser } from '@playwright/test';

// declare let browser: Browser;

// After(async function () {
//   try {
//     if (browser) {
//       await browser.close();
//       console.log('🧹 Browser closed after scenario');
//     }
//   } catch (error) {
//     console.error('⚠️ Error while closing browser:', error);
//   }
// });


import { Before, After } from '@cucumber/cucumber';
import { Browser } from '@playwright/test';
import { Logger } from '../../utils/Logger';

declare let browser: Browser;

Before(async function (scenario) {
  Logger.step(`🎬 Starting scenario: ${scenario.pickle.name}`);
});

After(async function (scenario) {
  try {
    if (browser) {
      await browser.close();
      Logger.cleanup('Browser closed after scenario');
    }

    if (scenario.result?.status === 'PASSED') {
      Logger.success(`✅ Scenario passed: ${scenario.pickle.name}`);
    } else if (scenario.result?.status === 'FAILED') {
      Logger.error(`❌ Scenario failed: ${scenario.pickle.name}`);
    } else {
      Logger.warn(`⚠️ Scenario finished with status: ${scenario.result?.status}`);
    }

  } catch (error) {
    Logger.error(`⚠️ Error while closing browser: ${(error as Error).message}`);
  }
});

