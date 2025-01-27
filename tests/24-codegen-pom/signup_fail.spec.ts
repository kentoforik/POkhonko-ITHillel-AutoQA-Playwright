import { test, expect } from '@playwright/test'
import HomePage from '../../page-objects/HomePage'
import SignUpForm from '../../page-objects/forms/signUpForm'
import { inValidUser } from '../test-data/user_login_data'
import { signupModalErrorText } from '../../constants/signUpModalTexts'
import { invalidInputProps } from '../../constants/element_props'

const invalidClassRegex = new RegExp(`\\b${invalidInputProps.classProp}\\b`)

test.describe('User Sign up', () => {
  let signUpForm: SignUpForm;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
    const signInFrom = await homePage.openSignInForm()
    signUpForm = await signInFrom.openSignUpForm()
  })

  test('is failed and shows appropriate error for existing user', async ({ page }) => {
    await signUpForm.fill(inValidUser.alreadyRegistered)
    await signUpForm.submitForm()
    await expect(signUpForm.errors.userAlreadyExist)
      .toHaveText(signupModalErrorText.userAlreadyExist)
  })

  test.describe('is forbidden and shows appropriate error when NAME', () => {
    test.afterEach(async () => {
      await expect(signUpForm.nameInput).toHaveCSS('border-color', invalidInputProps.borderColor)
      await expect(signUpForm.nameInput).toHaveClass(invalidClassRegex)
      await expect(signUpForm.registerButton).toBeDisabled()
    })

    test('is empty', async () => {
      await signUpForm.fill(inValidUser.withoutName)
      await signUpForm.nameInput.focus()
      await signUpForm.nameInput.blur()

      await expect(signUpForm.errors.required.name)
        .toHaveText(signupModalErrorText.requiredName)
    })

    test('of invalid length and chars (2 errors simultaneously)', async () => {
      await signUpForm.fill(inValidUser.withInvalidLengthAndCharsName)

      await expect(signUpForm.errors.invalid.name)
        .toHaveText(signupModalErrorText.invalidName)
      await expect(signUpForm.errors.lengthInvalid.name)
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of 1 char', async () => {
      await signUpForm.fill(inValidUser.withShortName)
      await expect(signUpForm.errors.lengthInvalid.name)
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of 21 chars', async () => {
      await signUpForm.fill(inValidUser.withLongName)
      await expect(signUpForm.errors.lengthInvalid.name)
        .toHaveText(signupModalErrorText.invalidNameLength)
    })

    test('of valid length but contains NON english chars', async () => {
      await signUpForm.fill(inValidUser.withNonEnglishCharsName)
      await expect(signUpForm.errors.invalid.name)
        .toHaveText(signupModalErrorText.invalidName)
    })

    test('of valid length, but containing special characters and numbers', async () => {
      await signUpForm.fill(inValidUser.withSpecialCharsName)
      await expect(signUpForm.errors.invalid.name)
        .toHaveText(signupModalErrorText.invalidName)
    })
  })
})
