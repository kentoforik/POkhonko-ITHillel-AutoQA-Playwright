export const garagePageSelectors = {
  addCarButton: 'button.btn.btn-primary:has-text("Add car")',
  editCarButton: 'span.icon-edit',
  carsListItem: {
    container: 'div.car.jumbotron',
    carName: 'p.car_name.h2',
    milage: 'input[name="miles"]',
    milageUpdateDate: '.car_update-mileage',
    editBtn: 'span.icon.icon-edit'
  }
}