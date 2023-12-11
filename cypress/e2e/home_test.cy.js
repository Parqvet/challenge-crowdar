/// <reference types="cypress"/>

import { LoginPage } from "../pages_objects/LoginPage"
import { HomePage } from "../pages_objects/HomePage"
import Utils from "../support/utils"

import homeLocators from "../fixtures/homeLocators.json"

describe('Home Fixture', () => {

  const loginPage = new LoginPage()
  const homePage = new HomePage()
  const utils = new Utils()

  beforeEach('Deberia ingresar con usuario correcto a la pagina de Saucedemo', () => {
    cy.visit("/")
    loginPage.ingresarUsername('standard_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labs")
  })

  it('Deberia agregar un producto al carrito al hacer click en Add to cart desde el Home', () => {
    const producto = "Sauce Labs Bike Light"
    utils.elegirProductoYAgregarAlCarrito(producto)
    utils.verificarProductoAgregadoAlCarrito(homeLocators.shopping_cart_badge)
  })

  it('Deberia quitar el producto del carrito desde el Home', () => {
    const producto = "Sauce Labs Bike Light"
    utils.elegirProductoYAgregarAlCarrito(producto)
    utils.verificarProductoAgregadoAlCarrito(homeLocators.shopping_cart_badge)
    utils.removerProductoDelCarrito(producto)

    utils.verificarCarritoVacio(homeLocators.link_shopping_cart)
  })

  it('Deberia seleccionar el filtro Z to A', () => {
    utils.seleccionarFiltro(homeLocators.select_filter, 'Name (Z to A)')
    utils.verificarElementoYContenido(homeLocators.select_filter, 'Name (Z to A)')
  })

  it('Deberia seleccionar el filtro Price (low to high)', () => {
    utils.seleccionarFiltro(homeLocators.select_filter, 'Price (low to high)')
    utils.verificarElementoYContenido(homeLocators.select_filter, 'Price (low to high)')
  })

  it('Deberia seleccionar el filtro Price (high to low)', () => {
    utils.seleccionarFiltro(homeLocators.select_filter, 'Price (high to low)')
    utils.verificarElementoYContenido(homeLocators.select_filter, 'Price (high to low)')
  })

})