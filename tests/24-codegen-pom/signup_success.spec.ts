import { test, expect } from '@playwright/test'
import SignupForm from '../../page-objects/forms/signUpForm'
import { validUser } from '../test-data/user_login_data'
import { urls } from '../../constants/urls'

test.describe('Sign up is successful', () => {
  let signUpForm: SignupForm;

  test.beforeEach(async ({ page }) => {
    signUpForm = new SignupForm(page);
    await page.goto('/');
    await signUpForm.open();
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

