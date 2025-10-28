import { chromium, Browser, Page } from "@playwright/test";
import { CartPage } from "../../pages/cart/CartPage";
import { HomePage } from "../../pages/home/HomePage";
import { ProductPage } from "../../pages/product/ProductPage";
import { CONFIG } from "../../config/config";

export class Context {
    private _browser!: Browser;
    private _page!: Page;

    homePage!: HomePage;
    productPage!: ProductPage;
    cartPage!: CartPage;

    async init(): Promise<void> {
        this._browser = await chromium.launch({headless: CONFIG.headless});
        const context = await this._browser.newContext();
        this._page = await context.newPage();
    
    this.homePage = new HomePage(this._page);
    this.productPage = new ProductPage(this._page);
    this.cartPage = new CartPage(this._page);
    }

    get page(): Page {
        return this._page;
    }
    async close(): Promise<void> {
        if(this._browser){
            await this._browser.close();
        }
    }
}