import { signUpModalInputs, signUpModalSelectors } from '../types/signUpModal'
import { Page } from '@playwright/test'

export async function signUpFormFiller(page: Page, userData: signUpModalInputs, selectors: signUpModalSelectors): Promise<void> {

  const {
    name,
    lastName,
    email,
    password,
    passwordRepeat
  } = userData

  const {
    nameInput,
    lastNameInput,
    emailInput,
    passwordInput,
    passwordRepeatInput
  } = selectors

  const fillDataIfExist = async (data?: string, element?: string) => {
    if (data && element) {
      await page.locator(element).fill(data)
    } else {
      console.log('Data or selector is not provided. If it\'s expected by test - just ignore this message.')
    }
  }
  await page.getByText('Sign up').click()
  await fillDataIfExist(name, nameInput)
  await fillDataIfExist(lastName, lastNameInput)
  await fillDataIfExist(email, emailInput)
  await fillDataIfExist(password, passwordInput)
  await fillDataIfExist(passwordRepeat, passwordRepeatInput)
}