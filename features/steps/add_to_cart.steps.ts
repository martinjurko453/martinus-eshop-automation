import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import test, { chromium, Browser, Page, expect } from '@playwright/test';
import { CONFIG } from '../../config/config';
import { HomePage } from '../../pages/home/HomePage';
import { ProductPage } from '../../pages/product/ProductPage';
import { CartPage } from '../../pages/cart/CartPage';
import productData from '../../test-data/product.json';
import { HomePageLocators } from '../../pages/home/HomePageLocators';
import { HomePageMessages } from '../../pages/home/HomePageMessages';
import { Context } from '../context/TestContext';
import { CustomWorld } from '../support/world';


// let browser: Browser;
// let page: Page;
// let homePage: HomePage;
// let productPage: ProductPage;
// let cartPage: CartPage;

// const testContext = new TestContext();
const itemName = productData.product.name;
const itemWrongName = productData.product.wrongName
const expectedPrice = productData.product.expectedPrice;

Given('user opens Martinus Home Page', async function(this:CustomWorld) {
  await this.context.homePage.goto();
  await this.context.homePage.setViewPort(CONFIG.viewport.width, CONFIG.viewport.height);
  // await testContext.init();
  // await testContext.homePage.goto();
  // await testContext.homePage.setViewPort(CONFIG.viewport.width, CONFIG.viewport.height)
  // browser = await chromium.launch({ headless: CONFIG.headless });
  // const context = await browser.newContext();
  // page = await context.newPage();

  // (global as any).browser = browser;

  // homePage = new HomePage(page);
  // productPage = new ProductPage(page);
  // cartPage = new CartPage(page);

  // await homePage.goto();
  // await homePage.setViewPort(CONFIG.viewport.width, CONFIG.viewport.height);
});


When('user searches for an existing item by search bar', async function (this:CustomWorld) {
  await this.context.homePage.searchItem(itemName, HomePageLocators.SEARCH_RESULT_PREBIJEM_SA_STEFANIK)
  // await homePage.searchItem(itemName, HomePageLocators.SEARCH_RESULT_PREBIJEM_SA_STEFANIK);
  // await testContext.homePage.searchItem(itemName, HomePageLocators.SEARCH_RESULT_PREBIJEM_SA_STEFANIK)
});

When('user adds the item to the basket', async function (this:CustomWorld) {
  await this.context.productPage.addToCart();
  // await productPage.addToCart();
  // await testContext.productPage.addToCart();
});


Then('basket contains the searched item', async function (this:CustomWorld) {
  const title = await this.context.cartPage.getCartItemTitle();
  expect(title).toContain(itemName)
  // const title = await testContext.cartPage.getCartItemTitle();
  // expect(title).toContain(itemName)
  // const title = await cartPage.getCartItemTitle();
  // expect(title).toContain(itemName);

  // const price = await cartPage.getCartItemPrice();
  // expect(price).toContain(expectedPrice);

  const price = await this.context.cartPage.getCartItemPrice();
  expect(price).toContain(expectedPrice)
  // const price = await testContext.cartPage.getCartItemPrice();
  // expect(price).toContain(expectedPrice)
});


When('user searches for a non-existing item by search bar', async function (this:CustomWorld) {
  await this.context.homePage.fillInput(HomePageLocators.SEARCH_INPUT, itemWrongName)
  // await homePage.fillInput(HomePageLocators.SEARCH_INPUT, itemWrongName)
  // await testContext.homePage.fillInput(HomePageLocators.SEARCH_INPUT, itemWrongName)
});


Then('system displays message that no results were found', async function (this:CustomWorld) {
  // const message = await homePage.getNoResultMessage();
  // expect(message).toContain(HomePageMessages.NO_RESULTS_TEXT);
  const message = await this.context.homePage.getNoResultMessage();
  expect(message).toContain(HomePageMessages.NO_RESULTS_TEXT)
  // const message = await testContext.homePage.getNoResultMessage();
  // expect(message).toContain(HomePageMessages.NO_RESULTS_TEXT)
});
