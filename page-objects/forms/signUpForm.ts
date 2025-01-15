import { type Locator, type Page } from '@playwright/test';
import { signUpModalSelectors } from '../../selectors/signUpModal';
import { signUpModalInputs } from '../../types/signUpModal';

export default class SignUpForm {
  readonly page: Page;

  readonly nameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly passwordRepeatInput: Locator;

  readonly registerButton: Locator;

  readonly errors: {
    userAlreadyExist: Locator;
    required: {
      name: Locator;
      lastName: Locator;
      email: Locator;
      password: Locator;
      passwordRepeat: Locator;
    };
    invalid: {
      name: Locator;
      lastName: Locator;
      email: Locator;
      password: Locator;
      passwordRepeat: Locator;
    };
    lengthInvalid: {
      name: Locator;
      lastName: Locator;
    };
  };

  constructor(page: Page) {
    this.page = page;

    const { inputs, registerBtn, userAlreadyExist, ...errorSelectors } = signUpModalSelectors;

    this.nameInput = page.locator(inputs.nameInput);
    this.lastNameInput = page.locator(inputs.lastNameInput);
    this.emailInput = page.locator(inputs.emailInput);
    this.passwordInput = page.locator(inputs.passwordInput);
    this.passwordRepeatInput = page.locator(inputs.passwordRepeatInput);

    this.registerButton = page.locator(registerBtn);

    this.errors = {
      userAlreadyExist: page.locator(userAlreadyExist),
      required: {
        name: page.locator(errorSelectors.nameRequired),
        lastName: page.locator(errorSelectors.lastNameRequired),
        email: page.locator(errorSelectors.emailRequired),
        password: page.locator(errorSelectors.passwordRequired),
        passwordRepeat: page.locator(errorSelectors.passwordRepeatRequired),
      },
      invalid: {
        name: page.locator(errorSelectors.nameInvalid),
        lastName: page.locator(errorSelectors.lastNameInvalid),
        email: page.locator(errorSelectors.emailInvalid),
        password: page.locator(errorSelectors.passwordInvalid),
        passwordRepeat: page.locator(errorSelectors.passwordRepeatedInvalid),
      },
      lengthInvalid: {
        name: page.locator(errorSelectors.nameLengthInvalid),
        lastName: page.locator(errorSelectors.lastNameLengthInvalid),
      },
    };
  }

  async fill(userData: signUpModalInputs): Promise<void> {
    const {
      name,
      lastName,
      email,
      password,
      passwordRepeat
    } = userData

    const fillDataIfExist = async (data?: string, element?: Locator) => {
      if (data && element) {
        await element.fill(data)
      } else {
        console.log('Data or selector is not provided. If it\'s expected by test - just ignore this message.')
      }
    }
    await fillDataIfExist(name, this.nameInput)
    await fillDataIfExist(lastName, this.lastNameInput)
    await fillDataIfExist(email, this.emailInput)
    await fillDataIfExist(password, this.passwordInput)
    await fillDataIfExist(passwordRepeat, this.passwordRepeatInput)
  }

  async submitForm() {
    await this.registerButton.click()
  }
}

