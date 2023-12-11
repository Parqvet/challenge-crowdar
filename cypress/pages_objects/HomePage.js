/// <reference types="cypress"/>

import homeLocators from "../fixtures/homeLocators.json"
import Utils from "../support/utils";

export class HomePage {

    constructor() {
        this.utils = new Utils();
    }

    clickBtnBurger() {
        cy.get(homeLocators.btn_burger).click()
    }

    click_logout() {
        cy.get(homeLocators.link_logout).click()
    }

    logout() {
        this.clickBtnBurger()
        this.click_logout()
    }

    seleccionarProductoDesdeElHome(nombreProducto) {
        this.utils.hacerClicEnElementoLista(homeLocators.inventory_products_name, nombreProducto);
    }

    dirigirseAlCarrito() {
        cy.get(homeLocators.link_shopping_cart).click()
    }

}