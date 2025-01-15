import { type Locator, type Page } from '@playwright/test';
import { homePageSelectors } from '../selectors/homePage';
import SignInForm from './forms/SignInForm';

export default class HomePage {
  readonly page: Page;
  readonly signInButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signInButton = page.locator(homePageSelectors.header.signInButton)
  }
  async open() {
    await this.page.goto('/')
  }

  async openSignInForm() {
    await this.signInButton.click()
    return new SignInForm(this.page)
  }
}