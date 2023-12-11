import shopingcartLocators from "../fixtures/shoppingcartLocators.json"

export class ShoppingCartPage {

    clickTituloProducto() {
        cy.get(shopingcartLocators.titulo_product_cart).click()
    }

    clickCheckoutProduct() {
        cy.get(shopingcartLocators.btn_checkout).click()
    }

    obtenerPrecioYComparar(locator, price) {
        cy.get(locator)
            .invoke('text')
            .should('eq', price)
    }

    clickContinuarComprando() {
        cy.get(shopingcartLocators.continue_shop).click()
    }
}