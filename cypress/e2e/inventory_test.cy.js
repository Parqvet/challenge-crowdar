/// <reference types="cypress"/>

import { LoginPage } from "../pages_objects/LoginPage"
import { HomePage } from "../pages_objects/HomePage"
import { InventoryPage } from "../pages_objects/InventoryPage"
import Utils from "../support/utils"

import homeLocators from "../fixtures/homeLocators.json"
import inventoryLocators from "../fixtures/inventoryLocators.json"

describe('Inventory Fixture', () => {

  const loginPage = new LoginPage()
  const homePage = new HomePage()
  const inventoryPage = new InventoryPage()
  const utils = new Utils()

  beforeEach('Deberia ingresar con usuario correcto a la pagina de Saucedemo', () => {
    cy.visit("/")
    loginPage.ingresarUsername('standard_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labs")
  })

  it('Deberia seleccionar un producto desde el Home y verificar que sea el producto seleccionado', () => {
    // Definir el nombre del producto que esperas seleccionar
    const nombreProductoSeleccionado = 'Sauce Labs Bike Light';
    homePage.seleccionarProductoDesdeElHome(nombreProductoSeleccionado);

    utils.obtenerTextoYComparar(inventoryLocators.product_name, nombreProductoSeleccionado)
  });

  it('Deberia regresar al home desde el inventario', () => {
    const nombreProductoSeleccionado = 'Sauce Labs Bike Light';
    homePage.seleccionarProductoDesdeElHome(nombreProductoSeleccionado);
    utils.obtenerTextoYComparar(inventoryLocators.product_name, nombreProductoSeleccionado)
    
    inventoryPage.clickBtnBackToProducts()
    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
  })

  it('Deberia agregar el producto al carrito desde el inventario', () => {
    const producto = 'Sauce Labs Bike Light';
    homePage.seleccionarProductoDesdeElHome(producto);
    utils.obtenerTextoYComparar(inventoryLocators.product_name, producto)

    utils.elegirProductoYAgregarAlCarrito(producto)
    utils.verificarProductoAgregadoAlCarrito(inventoryLocators.shopping_cart_badge)
  })

  it('Deberia quitar el producto al carrito desde el inventario', () => {
    const producto = 'Sauce Labs Bike Light';
    homePage.seleccionarProductoDesdeElHome(producto);
    utils.obtenerTextoYComparar(inventoryLocators.product_name, producto)

    utils.elegirProductoYAgregarAlCarrito(producto)
    utils.verificarProductoAgregadoAlCarrito(inventoryLocators.shopping_cart_badge)
    utils.removerProductoDelCarrito(producto)
    utils.verificarCarritoVacio(inventoryLocators.link_shopping_cart)
  })

})