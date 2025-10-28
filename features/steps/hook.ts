import { Before, After } from '@cucumber/cucumber';
import { Browser } from '@playwright/test';
import { Logger } from '../../utils/Logger';

declare let browser: Browser;

Before(async function (scenario) {
  Logger.step(`🎬 Starting scenario: ${scenario.pickle.name}`);
  await this.context.init();
});

After(async function (scenario) {
  try {    
    await this.context.close()
    Logger.cleanup('Browser closed after scenario');
    

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

