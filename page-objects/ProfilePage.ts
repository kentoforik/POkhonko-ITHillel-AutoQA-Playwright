import { Locator, Page } from '@playwright/test';
import { profilePageSelectors } from '../selectors/profilePage'


export default class ProfilePage {
  private page: Page;
  private profileName: Locator;

  constructor(page: Page) {
    this.page = page
    this.profileName = page.locator(profilePageSelectors.profileName)
  }

  async getProfileName() {
    const name = await this.profileName.innerText()
    return name
  }
}