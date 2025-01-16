import { test, expect } from '@playwright/test'
import SignUpForm from '../../page-objects/forms/SignUpForm'
import { validUser } from '../test-data/user_login_data'
import { urls } from '../../constants/urls'
import HomePage from '../../page-objects/HomePage'

test.describe('Sign up is successful', () => {
  let signUpForm: SignUpForm;

  test.beforeEach(async ({ page }) => {
    const homePage = new HomePage(page)
    await homePage.open()
    const signInFrom = await homePage.openSignInForm()
    signUpForm = await signInFrom.openSignUpForm()
  })

  test('with common user', async ({ page }) => {
    await signUpForm.fill(validUser.common)
    await signUpForm.submitForm()
    await expect(page).toHaveURL(urls.garagePage)
  })

  test('with user Name of 2 chars, user Last name of 2 chars and password of 8 chars', async ({ page }) => {
    await signUpForm.fill(validUser.allInputsMinLength)
    await signUpForm.submitForm()
    await expect(page).toHaveURL(urls.garagePage)
  })

  test('with user Name of 20 chars, Last name of 20 chars and Password of 15 chars', async ({ page }) => {
    await signUpForm.fill(validUser.allInputsMaxLength)
    await signUpForm.submitForm()
    await expect(page).toHaveURL(urls.garagePage)
  })
})

