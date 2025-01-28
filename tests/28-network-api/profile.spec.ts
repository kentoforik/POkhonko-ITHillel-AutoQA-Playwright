import { test, expect } from '@playwright/test'
import LeftPanel from '../../page-objects/LeftPanel'
import { apiPath } from '../../constants/api'
import { profilePageTestData } from '../test-data/profilePage'

let sidGlobal: string;

test.beforeAll(async ({ request }) => {
  const response = await request.post(`${process.env.BASE_URL}${apiPath.auth.signIn}`, {
    data: {
      email: process.env.VALID_TEST_EXISTING_USERNAME,
      password: process.env.VALID_TEST_EXISTING_PASSWORD,
      remember: false
    }
  })

  sidGlobal = response.headers()['set-cookie'].split(';')[0].split('=')[1]
})

test('Profile data substitution with mocked requests', async ({ page }) => {
  const responseBody = JSON.stringify(profilePageTestData.mockedUserNameApiResponse)

  await page.route('**/profile', route => {
    route.fulfill({ body: responseBody })
  })

  await page.context().addCookies([
    {
      name: 'sid',
      value: sidGlobal,
      domain: 'qauto.forstudy.space',
      path: '/',
    }
  ])

  const leftPanel = new LeftPanel(page)
  await leftPanel.open()
  const profilePage = await leftPanel.openProfilePage()

  const { name, lastName } = profilePageTestData.mockedUserNameApiResponse.data
  expect(await profilePage.getProfileName()).toEqual(`${name} ${lastName}`)
})

