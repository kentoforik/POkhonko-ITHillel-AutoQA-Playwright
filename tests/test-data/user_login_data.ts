//TODO: create test data generator

export const validUser = {
  common: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: process.env.VALID_TEST_USERNAME, //Increase by on on each test run
    password: process.env.VALID_TEST_PASSWORD,
    passwordRepeat: process.env.VALID_TEST_PASSWORD
  },

  allInputsMinLength: {
    name: 'Te',
    lastName: 'Te',
    email: process.env.VALID_TEST_SHORT_USERNAME, //Increase by on on each test run
    password: process.env.VALID_TEST_PASSWORD,
    passwordRepeat: process.env.VALID_TEST_PASSWORD
  },

  allInputsMaxLength: {
    name: 'TestNameTestNameTest',
    lastName: 'TestLastNameTestLast',
    email: process.env.VALID_TEST_LONG_USERNAME, //Increase by on on each test run
    password: process.env.VALID_TEST_PASSWORD,
    passwordRepeat: process.env.VALID_TEST_PASSWORD
  }
}

export const inValidUser = {
  alreadyRegistered: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: process.env.VALID_TEST_EXISTING_USERNAME,
    password: process.env.VALID_TEST_PASSWORD,
    passwordRepeat: process.env.VALID_TEST_PASSWORD
  },
  withoutName: {
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withInvalidLengthAndCharsName: {
    name: '123456789012345678901',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withShortName: {
    name: 'A',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withLongName: {
    name: 'AbcdeAbcdeAbcdeAbcdeAbcdeA',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withNonEnglishCharsName: {
    name: 'Павло',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withSpecialCharsName: {
    name: 'TestUser1@',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },

  withoutLastName: {
    name: 'TestName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withInvalidLengthAndCharsLastName: {
    name: 'TestName',
    lastName: '123456789012345678901',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withShortLastName: {
    name: 'TestName',
    lastName: 'T',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withLongLastName: {
    name: 'TestName',
    lastName: 'TestLastNameTestLastN',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withNonEnglishCharsLastName: {
    name: 'TestName',
    lastName: 'Охонько',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withSpecialCharsLastName: {
    name: 'TestName',
    lastName: 'TestLastName1@',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },

  withoutEmail: {
    name: 'TestName',
    lastName: 'TestLastName',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },
  withIncorrectEmail: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'ab.cd',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu'
  },

  withoutPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    passwordRepeat: '1Qwertyu'
  },
  withShortPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwerty',
    passwordRepeat: '1Qwertyu'
  },
  withLongPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyuiopasdfg',
    passwordRepeat: '1Qwertyu'
  },
  withNoIntegerInPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: 'Qwertyuiopasdfg',
    passwordRepeat: '1Qwertyu'
  },
  withNoCapitalInPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: 'qwertyuiopasdfg',
    passwordRepeat: '1Qwertyu'
  },
  withNoSmallInPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: 'QWERTYUIOPASDFG',
    passwordRepeat: '1Qwertyu'
  },

  withoutReEnteredPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu'
  },
  withNotMatchingReEnteredPassword: {
    name: 'TestName',
    lastName: 'TestLastName',
    email: 'test-user@gmail.com',
    password: '1Qwertyu',
    passwordRepeat: '1Qwertyu2'
  }

}