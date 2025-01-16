import { test, expect } from '@playwright/test'
import { signUpFormFiller } from '../../helpers/auth_helper'
import { validUser } from '../test-data/user_login_data'
import { signUpModalSelectors } from '../../selectors/signUpModal'
import { urls } from '../../constants/urls'


test.describe('Sign up is successful', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('with common user', async ({ page }) => {
    await signUpFormFiller(page, validUser.common, signUpModalSelectors.inputs)
    await page.getByText('Register').click()
    await expect(page).toHaveURL(urls.garagePage)
  })

  test('with user Name of 2 chars, user Last name of 2 chars and password of 8 chars', async ({ page }) => {
    await signUpFormFiller(page, validUser.allInputsMinLength, signUpModalSelectors.inputs)
    await page.getByText('Register').click()
    await expect(page).toHaveURL(urls.garagePage)
  })

  test('with user Name of 20 chars, Last name of 20 chars and Password of 15 chars', async ({ page }) => {
    signUpFormFiller(page, validUser.allInputsMaxLength, signUpModalSelectors.inputs)
    await page.getByText('Register').click()
    await expect(page).toHaveURL(urls.garagePage)
  })
})

