import { expect, Locator, Page } from '@playwright/test';
import { Logger } from '../../utils/Logger';

export abstract class ActionBasePage {
  readonly page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  async clickOn(locator: string, index: number = 0, timeout: number = 5000): Promise<void> {
    await this.page.locator(locator).nth(index).click({ timeout });
  }

  async clickOnByText(text: string, nthIndex: number = 0): Promise<void> {
    await this.page.getByText(text).nth(nthIndex).click();
  }

  async isElementDisabled(locator: string): Promise<boolean> {
    try {
      await expect(this.page.locator(locator)).toBeDisabled();
      return true;
    } catch {
      return false;
    }
  }

  async isElementEnabled(locator: string): Promise<boolean> {
    try {
      await expect(this.page.locator(locator)).toBeEnabled();
      return true;
    } catch {
      return false;
    }
  }

  async isElementVisible(locator: string, nthIndex: number = 0, timeout: number = 5000): Promise<boolean> {
    try {
      await expect(this.page.locator(locator).nth(nthIndex)).toBeVisible({ timeout });
      return true;
    } catch {
      return false;
    }
  }

  async setViewPort(width:number = 1700, height: number = 800): Promise<void> {
    await this.page.setViewportSize({ width, height});
  }

  async waitForContentLoadAndWait(timeout: number = 500): Promise<void> {
    await this.page.waitForLoadState('domcontentloaded');
    await this.page.waitForTimeout(timeout);
  }

  async getElementCount(locator: string): Promise<number> {
    return await this.page.locator(locator).count();
  }

  async fillInput(locator: string, value: string, index: number = 0): Promise<void> {
    await this.isElementVisible(locator);
    await this.page.locator(locator).nth(index).fill(value);
  }

  async pressKey(key: string, timeout: number = 500): Promise<void> {
    await this.page.keyboard.press(key);
    await this.page.waitForTimeout(timeout);
  }

  async getElementText(locator: string, nthIndex: number = 0, timeout: number = 5000): Promise<string> {
    const element = this.page.locator(locator).nth(nthIndex);
    await element.waitFor({ state: 'visible', timeout });
    return await element.textContent() ?? '';
  }

    async logStep(message: string, type: 'info' | 'success' | 'warning' | 'error' = 'info'): Promise<void> {
    Logger.log(message, type);
  }


}