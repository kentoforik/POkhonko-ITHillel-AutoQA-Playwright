import { test as base, chromium } from '@playwright/test'
import GaragePage from '../page-objects/GaragePage'
import { carDataForEditing } from '../tests/test-data/edit-car'

import path from 'path'

const loggedUserStoragePath = path.join(__dirname, '../storage/auth.json')

type GaragePageTypes = {
  garagePageWithOneAddedCar: GaragePage

}

export const test = base.extend<GaragePageTypes>({
  garagePageWithOneAddedCar: async ({ }, use) => {
    const browser = await chromium.launch()
    const context = await browser.newContext({ storageState: loggedUserStoragePath })
    const page = await context.newPage()

    const garagePage = new GaragePage(page)
    await garagePage.open()
    const addCarForm = await garagePage.addCar()
    await addCarForm.addCar(carDataForEditing.initialCar.brand, carDataForEditing.initialCar.model, carDataForEditing.initialCar.milage)

    await use(garagePage)

    //add cleanUp in separate fixture

    await context.close();
    await browser.close();
  }
})

