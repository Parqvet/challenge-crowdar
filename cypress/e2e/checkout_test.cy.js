import { LoginPage } from "../pages_objects/LoginPage"
import { HomePage } from "../pages_objects/HomePage"
import { ShoppingCartPage } from "../pages_objects/ShoppingCartPage"
import { CheckoutInformationPage } from "../pages_objects/CheckoutInformationPage"
import { CheckoutOverviewPage } from "../pages_objects/CheckoutOverviewPage"
import Utils from "../support/utils"

import homeLocators from "../fixtures/homeLocators.json"
import inventoryLocators from "../fixtures/inventoryLocators.json"
import shopingcartLocators from "../fixtures/shoppingcartLocators.json"
import checkoutLocators from "../fixtures/checkoutLocators.json"


describe('Shopping Cart Fixture', () => {

  const loginPage = new LoginPage()
  const homePage = new HomePage()
  const shoppingcartPage = new ShoppingCartPage()
  const checkoutIn = new CheckoutInformationPage()
  const checkoutOv = new CheckoutOverviewPage()
  const utils = new Utils()

  beforeEach('Ingresar con usuario correcto a la pagina de Saucedemo', () => {
    cy.visit("/")
    loginPage.ingresarUsername('standard_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labs")
  })

  it('Deberia completar el checkout de un producto correctamente', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Bike Light';
  
    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();
  
      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);
      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })

    shoppingcartPage.clickCheckoutProduct()
    checkoutIn.escribirFirstName("Pepe")
    checkoutIn.escribirLastName("Test")
    checkoutIn.escribirPostalCode("123")
    checkoutIn.clickContinue()
    checkoutOv.clickFinishCheckout()
    utils.verificarElementoYContenido(checkoutLocators.titulo_complete, "Thank you for your order!")
  })

})