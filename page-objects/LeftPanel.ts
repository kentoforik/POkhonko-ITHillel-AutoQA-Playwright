import { Locator, Page } from '@playwright/test';
import { leftPanelSelectors } from '../selectors/leftPanel'
import ProfilePage from '../page-objects/ProfilePage'

export default class LeftPanel {
  page: Page;
  private profileButton: Locator;

  constructor(page: Page) {
    this.page = page
    this.profileButton = page.locator(leftPanelSelectors.profileButton);
  }

  async open() {
    await this.page.goto('/')
  }

  async openProfilePage() {
    await this.profileButton.click()
    return new ProfilePage(this.page)
  }
}