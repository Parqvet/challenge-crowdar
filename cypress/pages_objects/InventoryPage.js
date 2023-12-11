/// <reference types="cypress"/>

export class InventoryPage {

    link_back = "#back-to-products"
    titulo_producto = ".inventory_details_name"
    btn_add_product = "#add-to-cart-sauce-labs-backpack"
    shopping_cart_badge = ".shopping_cart_badge"
    btn_remove_product = "#remove-sauce-labs-backpack"

    clickBtnBackToProducts() {
        cy.get(this.link_back).click()
    }

    clickAddProducto() {
        cy.get(this.btn_add_product).click()
    }

    quitarProductoDelCarrito() {
        cy.get(this.btn_remove_product).should('exist')
        cy.get(this.btn_remove_product).click()
        cy.get(this.btn_add_product).should('exist')
    }

}