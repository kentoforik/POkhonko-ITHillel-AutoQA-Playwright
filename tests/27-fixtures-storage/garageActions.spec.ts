import { expect } from '@playwright/test'
import { test } from '../../fixtures/userGaragePage'
import { carDataForEditing } from '../test-data/edit-car'


test.describe('From Garage page user', () => {
  test('should be able to edit car', async ({ garagePageWithOneAddedCar }) => {
    const carForEditing = await garagePageWithOneAddedCar.editCar(carDataForEditing.initialCar.brand, carDataForEditing.initialCar.model)

    await carForEditing.editCar(
      carDataForEditing.editedCar.brand,
      carDataForEditing.editedCar.model,
      carDataForEditing.editedCar.milage,
      carDataForEditing.editedCar.creationDate,
    )
    const editedCar = await garagePageWithOneAddedCar.getCarPropsFromListItem()
    expect(editedCar.carName).toBe(`${carDataForEditing.editedCar.brand} ${carDataForEditing.editedCar.model}`)
  })
})
