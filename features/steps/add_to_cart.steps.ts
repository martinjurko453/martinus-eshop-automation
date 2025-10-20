import { Given, When, Then } from '@cucumber/cucumber';
import { chromium, Browser, Page, expect } from '@playwright/test';
import { CONFIG } from '../../config/config';
import { HomePage } from '../../pages/home/HomePage';
import { ProductPage } from '../../pages/product/ProductPage';
import { CartPage } from '../../pages/cart/CartPage';
import productData from '../../test-data/product.json';
import { HomePageLocators } from '../../pages/home/HomePageLocators';
import { HomePageMessages } from '../../pages/home/HomePageMessages';


let browser: Browser;
let page: Page;
let homePage: HomePage;
let productPage: ProductPage;
let cartPage: CartPage;

const itemName = productData.product.name;
const itemWrongName = productData.product.wrongName
const expectedPrice = productData.product.expectedPrice;

Given('user opens Martinus Home Page', { timeout: 30000 }, async function () {
  browser = await chromium.launch({ headless: CONFIG.headless });
  const context = await browser.newContext();
  page = await context.newPage();

  (global as any).browser = browser;

  homePage = new HomePage(page);
  productPage = new ProductPage(page);
  cartPage = new CartPage(page);

  await homePage.goto();
  await homePage.setViewPort(CONFIG.viewport.width, CONFIG.viewport.height);
});


When('user searches for an existing item by search bar', async function () {
  await homePage.searchItem(itemName, HomePageLocators.SEARCH_RESULT_PREBIJEM_SA_STEFANIK);
});

When('user adds the item to the basket', async function () {
  await productPage.addToCart();
});


Then('basket contains the searched item', async function () {
  const title = await cartPage.getCartItemTitle();
  expect(title).toContain(itemName);

  const price = await cartPage.getCartItemPrice();
  expect(price).toContain(expectedPrice);
});


When('user searches for a non-existing item by search bar', async function () {
  await homePage.fillInput(HomePageLocators.SEARCH_INPUT, itemWrongName)
});


Then('system displays message that no results were found', async function () {
  const message = await homePage.getNoResultMessage();
  expect(message).toContain(HomePageMessages.NO_RESULTS_TEXT);
});
