import { type Locator, type Page } from '@playwright/test';
import { homePageSelectors } from '../selectors/homePage';

class HomePage {
  readonly page: Page;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator(homePageSelectors.header.signInButton)
  }
  async open() {
    await this.page.goto('/')
  }

  async openSignInModal() {
    await this.signInButton.click()
  }
}