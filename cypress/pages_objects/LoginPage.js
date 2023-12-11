/// <reference types="cypress"/>
import loginLocators from "../fixtures/loginLocators.json"

export class LoginPage {

    ingresarUsername(name) {
        cy.get(loginLocators.input_username).type(name)
    }

    ingresarPassword(pass) {
        cy.get(loginLocators.input_password).type(pass)
    }

    clickLogin() {
        cy.get(loginLocators.btn_login).click()
    }

    loginFull(user, pass) {
        this.ingresarUsername(user)
        this.ingresarPassword(pass)
        this.clickLogin()
    }
}