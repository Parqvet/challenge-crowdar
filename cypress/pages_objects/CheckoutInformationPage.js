import checkoutLocators from "../fixtures/checkoutLocators.json"

export class CheckoutInformationPage {

    escribirFirstName(name) {
        cy.get(checkoutLocators.input_firstname).type(name)
    }

    escribirLastName(lastname) {
        cy.get(checkoutLocators.input_lastname).type(lastname)
    }

    escribirPostalCode(code) {
        cy.get(checkoutLocators.input_postal_code).type(code)
    }

    clickContinue() {
        cy.get(checkoutLocators.btn_continue).click()
    }

    clickFinishCheckout() {
        cy.get(checkoutLocators.btn_finish).click()
    }

}