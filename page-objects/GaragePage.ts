import { type Locator, type Page } from '@playwright/test';
import { garagePageSelectors } from '../selectors/garagePage';
import AddCarForm from '../page-objects/forms/AddCarForm'
import { urls } from '../constants/urls'
import EditCarForm from './forms/EditCarForm';

export default class GaragePage {
  readonly page: Page;
  readonly addCarButton: Locator;
  readonly editCarButton: Locator;
  readonly carItem: Locator;

  constructor(page: Page) {
    this.page = page;
    this.addCarButton = page.locator(garagePageSelectors.addCarButton);
    this.editCarButton = page.locator(garagePageSelectors.editCarButton);
    this.carItem = page.locator(garagePageSelectors.carsListItem.container)
  }

  open = async () => {
    await this.page.goto(urls.garagePage)
  }

  addCar = async () => {
    await this.addCarButton.click()
    return new AddCarForm(this.page)
  }

  //Refine to edit first founded car by provided brand and model
  editCar = async (brand: string, model: string) => {
    await this.carItem.locator(this.editCarButton).click()
    return new EditCarForm(this.page)
  }

  //Refine to find by Brand and Model
  getCarPropsFromListItem = async () => {
    const name = await this.page.locator(garagePageSelectors.carsListItem.carName).innerText()
    return {
      carName: name,
    }
  }
}