import { expect, test } from '@playwright/test'
import HomePage from '../page-objects/HomePage'
import { urls } from '../constants/urls'
import path from 'path'

const authFile = path.join(__dirname, '../storage/auth.json')

test.describe('Authorize and save state to storage', () => {
  test('', async ({ page }) => {
    const username = process.env.VALID_TEST_EXISTING_USERNAME as string;
    const password = process.env.VALID_TEST_EXISTING_PASSWORD as string;

    const homePage = new HomePage(page)
    await homePage.open()

    const singInForm = await homePage.openSignInForm()
    await singInForm.logIn(username, password)
    await expect(page).toHaveURL(urls.garagePage)
    await page.context().storageState({ path: authFile });
  })
})