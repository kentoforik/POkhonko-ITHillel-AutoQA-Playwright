import { test, expect } from '@playwright/test'
import { signUpFormFiller } from '../../helpers/auth_helper'
import { inValidUser } from '../test-data/user_login_data'
import { signUpModalSelectors } from '../../selectors/signUpModal'
import { signupModalErrorText } from '../../constants/signUpModalTexts'
import { invalidInputProps } from '../../constants/element_props'

const invalidClassRegex = new RegExp(`\\b${invalidInputProps.classProp}\\b`)

test.describe('User Sign up', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('is failed and shows appropriate error for existing user', async ({ page }) => {
    await signUpFormFiller(page, inValidUser.alreadyRegistered, signUpModalSelectors.inputs)
    await page.locator(signUpModalSelectors.registerBtn).click()
    await expect(page.locator(signUpModalSelectors.userAlreadyExist))
      .toHaveText(signupModalErrorText.userAlreadyExist)
  })

  test.describe('is forbidden and shows appropriate error when NAME', () => {
    test.afterEach(async ({ page }) => {
      await expect(page.locator(signUpModalSelectors.registerBtn)).toBeDisabled()
    })

    test('is empty', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withoutName, signUpModalSelectors.inputs)
      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await nameField.focus()
      await nameField.blur()
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameRequired))
        .toHaveText(signupModalErrorText.requiredName)
    })

    test('of invalid length and chars (2 errors simultaneously)', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withInvalidLengthAndCharsName, signUpModalSelectors.inputs)

      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameInvalid))
        .toHaveText(signupModalErrorText.invalidName)

      await expect(page.locator(signUpModalSelectors.nameLengthInvalid))
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of 1 char', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withShortName, signUpModalSelectors.inputs)

      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameLengthInvalid))
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of 21 chars', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withLongName, signUpModalSelectors.inputs)

      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameLengthInvalid))
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of valid length but contains NON english chars', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withNonEnglishCharsName, signUpModalSelectors.inputs)

      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameInvalid))
        .toHaveText(signupModalErrorText.invalidName)
    })

    test('of valid length, but containing special characters and numbers', async ({ page }) => {
      await signUpFormFiller(page, inValidUser.withSpecialCharsName, signUpModalSelectors.inputs)

      const nameField = page.locator(signUpModalSelectors.inputs.nameInput)
      await expect(nameField).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(nameField).toHaveClass(invalidClassRegex)

      await expect(page.locator(signUpModalSelectors.nameInvalid))
        .toHaveText(signupModalErrorText.invalidName)
    })
  })

})
