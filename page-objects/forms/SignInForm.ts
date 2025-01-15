import { type Locator, type Page } from '@playwright/test';
import SignUpForm from './SignUpForm';
import { loginModalSelectors } from '../../selectors/logInModal'

export default class SignInForm {
  private page: Page;
  readonly registrationButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = page.locator(loginModalSelectors.registration);
  }
  async openSignUpForm(): Promise<SignUpForm> {
    await this.registrationButton.click()
    return new SignUpForm(this.page)
  }
}