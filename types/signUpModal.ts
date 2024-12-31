export type signUpModalInputs = {
  name?: string,
  lastName?: string,
  email?: string,
  password?: string,
  passwordRepeat?: string
}

export type signUpModalSelectors = {
  nameInput: string,
  lastNameInput: string,
  emailInput: string,
  passwordInput: string,
  passwordRepeatInput: string
}