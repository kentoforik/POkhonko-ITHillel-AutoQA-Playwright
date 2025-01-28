import { apiPath } from '../../../../../constants/apiPath';
import { test, expect, APIRequestContext } from '@playwright/test';
import { request } from 'playwright';
import { carsData } from '../../../../test-data/api';

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

test.describe('GET /cars ', () => {
  //this test may be flaky due to parallelism
  test('returns empty cars list when NO cars in garage', async () => {
    const response = await apiContext.get('');
    const carsList = await response.json();
    expect(carsList.data).toHaveLength(0);
  });

  test('returns a car if added to garage', async () => {
    await apiContext.post('', { data: carsData.newCar });

    const response = await apiContext.get('');
    const carsList = await response.json();
    const { carBrandId, carModelId, mileage } = carsList.data[0];

    expect(carsList.data).toHaveLength(1);
    expect(carBrandId).toBe(1);
    expect(carModelId).toBe(1);
    expect(mileage).toBe(1);
  });

});




