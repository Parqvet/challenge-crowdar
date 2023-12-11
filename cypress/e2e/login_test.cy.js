/// <reference types="cypress"/>

import { LoginPage } from "../pages_objects/LoginPage"
import { HomePage } from "../pages_objects/HomePage"
import Utils from "../support/utils";
import homeLocators from "../fixtures/homeLocators.json"
import loginLocators from "../fixtures/loginLocators.json"

// @tag: login
describe('Login Fixture', () => {

  const loginPage = new LoginPage()
  const homePage = new HomePage()
  const utils = new Utils()

  beforeEach('Dirigirse a la pagina de Login de Saucedemo', () => {
    cy.visit('/')
  })

  it('Deberia intentar ingresar con usuario incorrecto a Saucedemo', () => {
    loginPage.ingresarUsername("standard_error")
    loginPage.ingresarPassword("secret_sauce")
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Username and password do not match any user in this service')
  })

  it('Deberia intentar ingresar con contraseña incorrecta a Saucedemo', () => {
    loginPage.ingresarUsername("standard_user")
    loginPage.ingresarPassword("error")
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Username and password do not match any user in this service')
  })

  it('Deberia intentar ingresar con usuario y contraseña incorrecta a Saucedemo', () => {
    loginPage.ingresarUsername("standard_error")
    loginPage.ingresarPassword("error")
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Username and password do not match any user in this service')
  })

  it('Deberia intentar ingresar sin usuario a Saucedemo', () => {
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Username is required')
  })

  it('Deberia intentar ingresar sin contraseña a Saucedemo', () => {
    loginPage.ingresarUsername('standard_user')
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Password is required')
  })

  it('Deberia intentar ingresar sin usuario y sin contraseña a Saucedemo', () => {
    loginPage.clickLogin()
    
    utils.verificarElementoYContenido(loginLocators.msg_error, 'Epic sadface: Username is required')
  })

  it('Deberia ingresar con contraseña y usuario correcto a la pagina de Saucedemo', () => {
    loginPage.ingresarUsername('standard_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labs")
  })

  it.only('Deberia ingresar con contraseña y usuario correcto a la pagina de Saucedemo (fail)', () => {
    loginPage.ingresarUsername('visual_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labsss")
  })

  it('Deberia desloguearse de la pagina de Saucedemo a traves del menu hamburguesa', () => {
    loginPage.loginFull("standard_user", "secret_sauce")
    homePage.clickBtnBurger()
    homePage.click_logout()

    utils.verificarElementoYContenido(loginLocators.login_logo, "Swag Labs")
  })

})