import checkoutLocators from "../fixtures/checkoutLocators.json"

export class CheckoutOverviewPage {

    clickFinishCheckout() {
        cy.get(checkoutLocators.btn_finish).click()
    }

}