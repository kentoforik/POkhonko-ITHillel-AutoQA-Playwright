import { type Locator, type Page } from '@playwright/test';
import SignUpForm from './signUpForm';
import { loginModalSelectors } from '../../selectors/logInModal'

export default class SignInForm {
  private page: Page;
  readonly registrationButton: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.registrationButton = page.locator(loginModalSelectors.registration);
    this.emailInput = page.locator(loginModalSelectors.emailInput)
    this.passwordInput = page.locator(loginModalSelectors.passwordInput)
    this.loginButton = page.locator(loginModalSelectors.loginButton)
  }
  async openSignUpForm(): Promise<SignUpForm> {
    await this.registrationButton.click()
    return new SignUpForm(this.page)
  }
  async logIn(email: string, password: string) {
    if (!email || !password) { throw new Error('email and password are required') }
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }
}