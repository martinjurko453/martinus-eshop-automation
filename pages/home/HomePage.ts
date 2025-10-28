import { Page } from '@playwright/test';
import { ActionBasePage } from '../base/ActionBasePage';
import { HomePageLocators } from './HomePageLocators';
import { Logger } from '../../utils/Logger';
import { CONFIG } from '../../config/config'; 


export class HomePage extends ActionBasePage{
  constructor(page: Page) {
    super(page);
  }


  async goto() {
    await this.page.goto(CONFIG.baseUrl);
    await this.waitForContentLoadAndWait();
    await this.clickOn(HomePageLocators.COOKIE_REJECT_BTN);
    Logger.success('✅ Martinus Home Page opened');
  }


  async searchItem(item: string, resultLocator: string): Promise<void> {
    Logger.step(`Searching for item: ${item}`);
    await this.fillInput(HomePageLocators.SEARCH_INPUT, item);
    const isVisible = await this.isElementVisible(resultLocator);
    if (!isVisible) {
      Logger.error(`No visible search result for "${item}"`);
      throw new Error(`Expected search result not found for: ${item}`);
    }
    await this.clickOn(resultLocator);
    Logger.success(`Search result clicked for "${item}"`);
  }


  async getNoResultMessage(): Promise<string> {
  const isVisible = await this.isElementVisible(HomePageLocators.SEARCH_NO_RESULTS);
  if (!isVisible) {
    Logger.error('No results message not visible');
    throw new Error('No results message was not displayed!');
  }
  const message = await this.getElementText(HomePageLocators.SEARCH_NO_RESULTS);
  Logger.success('System correctly displayed "no results" message');
  return message;
  }
}
