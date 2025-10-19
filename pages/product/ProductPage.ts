import { Page } from '@playwright/test';
import { ActionBasePage } from '../base/ActionBasePage';
import { ProductPageLocators } from './ProductPageLocators';
import { CartPageLocators } from '../cart/CartPageLocators';
import { Logger } from '../../utils/Logger';

export class ProductPage extends ActionBasePage {
  constructor(page: Page) {
    super(page);
  }

  async addToCart(): Promise<void> {
    await this.isElementVisible(ProductPageLocators.ADD_TO_CART_BTN);
    await this.clickOn(ProductPageLocators.ADD_TO_CART_BTN);
    await this.page.locator('text=Do košíka ste práve pridali').waitFor({ timeout: 10000 });
    await this.clickOn(CartPageLocators.EDIT_CART_BTN);
    await this.waitForContentLoadAndWait();
    Logger.success('✅ Item successfully added to basket');
  }
}
