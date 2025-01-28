import { apiPath } from '../../../../../constants/apiPath';
import { test, expect, APIRequestContext } from '@playwright/test';
import { request } from 'playwright';
import { carsData } from '../../../../test-data/api';
import { apiErrors } from '../../../../../constants/apiErrors';



const authURL = `${process.env.BASE_URL}${apiPath.auth.signIn}`;
const carsURL = `${process.env.BASE_URL}${apiPath.cars}`;

let apiContext: APIRequestContext;
let sidGlobal: string;

test.beforeAll(async ({ request: APIRequest }) => {

  const response = await APIRequest.post(authURL, {
    data: {
      email: process.env.VALID_TEST_EXISTING_USERNAME,
      password: process.env.VALID_TEST_EXISTING_PASSWORD,
      remember: false
    }
  });

  sidGlobal = response.headers()['set-cookie'].split(';')[0].split('=')[1];
});

test.beforeEach(async () => {
  apiContext = await request.newContext({
    baseURL: carsURL,
    extraHTTPHeaders: {
      'Cookie': `sid=${sidGlobal}`
    }
  });

  //cleanup before each test
  const response = await apiContext.get('');
  const carsList = await response.json();

  if (carsList.data.length > 0) {
    for (let el of carsList.data) {
      await apiContext.delete(`${carsURL}/${el.id}`);
    }
  }
});

test.describe('POST /cars ', () => {
  test('creates car', async () => {
    const carResponse = await apiContext.post('', { data: carsData.newCar });
    const carResponseParsed = await carResponse.json();
    const carId = carResponseParsed.data.id;

    const response = await apiContext.get('');
    const carsList = await response.json();
    const addedCarId = carsList.data[0].id;
    expect(addedCarId).toBe(carId);
  });

  test('does not create car with invalid brand', async () => {
    const carResponse = await apiContext.post('', { data: carsData.invalidBrandCar });
    const carResponseParsed = await carResponse.json();

    expect(carResponse.status()).toBe(404);
    expect(carResponseParsed.message).toBe(apiErrors.cars.invalidBrand);
  });

  test('does not create car with invalid model', async () => {
    const carResponse = await apiContext.post('', { data: carsData.invalidModelCar });
    const carResponseParsed = await carResponse.json();

    expect(carResponse.status()).toBe(404);
    expect(carResponseParsed.message).toBe(apiErrors.cars.invalidModel);
  });

});