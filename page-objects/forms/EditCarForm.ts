import { type Page, type Locator, expect } from '@playwright/test'
import { editCarSelectors } from '../../selectors/editCarModal';

export default class EditCarForm {
  private page: Page;
  private brandInput: Locator;
  private modelInput: Locator;
  private milage: Locator;
  private creationDate: Locator;
  private saveButton: Locator;
  private cancelBtn: Locator;
  private removeCarButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandInput = page.locator(editCarSelectors.brandInput)
    this.modelInput = page.locator(editCarSelectors.modelInput)
    this.milage = page.locator(editCarSelectors.milageInput)
    this.creationDate = page.locator(editCarSelectors.creationDate)
    this.creationDate = page.locator(editCarSelectors.creationDate)
    this.cancelBtn = page.locator(editCarSelectors.cancelBtn)
    this.saveButton = page.locator(editCarSelectors.saveButton)
    this.removeCarButton = page.locator(editCarSelectors.removeCarButton)
  }

  async editCar(brand: string, model: string, milage: string, creationDate: string) {
    await this.brandInput.selectOption(brand)
    await this.modelInput.selectOption(model)
    await this.milage.fill(milage)
    await this.creationDate.fill(creationDate)
    await this.saveButton.click()
    await expect(this.saveButton).toBeHidden() // temporary solution to ensure form is closed
  }
}