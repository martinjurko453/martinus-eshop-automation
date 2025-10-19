import { CartPageLocators } from './CartPageLocators';
import { ActionBasePage } from '../base/ActionBasePage';
import { Logger } from '../../utils/Logger';

export class CartPage extends ActionBasePage {

  async getCartItemTitle(): Promise<string> {
    const title = await this.getElementText(CartPageLocators.CART_ITEM_TITLE);
    Logger.step(`🛒 Fetched cart item title: "${title.trim()}"`);
    return title.trim();
  }

  async getCartItemPrice(): Promise<string> {
    const price = await this.getElementText(CartPageLocators.CART_ITEM_PRICE);
    Logger.step(`💰 Fetched cart item price: "${price.trim()}"`);
    return price.trim();
  }
}

