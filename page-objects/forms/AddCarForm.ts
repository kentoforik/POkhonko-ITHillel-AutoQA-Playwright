import { type Page, type Locator } from '@playwright/test'
import { addCarFormSelectors } from '../../selectors/addCarModal';

export default class AddCarForm {
  private page: Page;
  private brandInput: Locator;
  private modelInput: Locator;
  private milage: Locator;
  private submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.brandInput = page.locator(addCarFormSelectors.brandInput)
    this.modelInput = page.locator(addCarFormSelectors.modelInput)
    this.milage = page.locator(addCarFormSelectors.milageInput)
    this.submitButton = page.locator(addCarFormSelectors.addBtn)
  }

  async addCar(brand: string, model: string, milage: string) {
    await this.brandInput.selectOption(brand)
    await this.modelInput.selectOption(model)
    await this.milage.fill(milage)
    await this.submitButton.click()
  }
}