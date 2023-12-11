import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor"

import { LoginPage } from "../../pages_objects/LoginPage"
import { HomePage } from "../../pages_objects/HomePage"
import Utils from "../utils"

const loginPage = new LoginPage()
const homePage = new HomePage()
const utils = new Utils()

Given('El usuario se dirige a la pagina de Login de Saucedemo', () => {

    cy.visit('/')
    utils.verificarUrl("https://www.saucedemo.com/")
})

When('El usuario ingresa su nombre de usuario {string}', (username) => {

    loginPage.ingresarUsername(username)
})

When('El usuario ingresa su contrasenia {string}', (pass) => {

    loginPage.ingresarPassword(pass)
})

When('El usuario hace click en el boton de Login', () => {

    loginPage.clickLogin()
})

Then('El usuario ingresa correctamente al Home', () => {

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
})