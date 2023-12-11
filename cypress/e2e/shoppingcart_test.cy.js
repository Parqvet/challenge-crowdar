import { LoginPage } from "../pages_objects/LoginPage"
import { HomePage } from "../pages_objects/HomePage"
import { ShoppingCartPage } from "../pages_objects/ShoppingCartPage"
import Utils from "../support/utils"

import homeLocators from "../fixtures/homeLocators.json"
import inventoryLocators from "../fixtures/inventoryLocators.json"
import shopingcartLocators from "../fixtures/shoppingcartLocators.json"
import checkoutLocators from "../fixtures/checkoutLocators.json"


describe('Shopping Cart Fixture', () => {

  const loginPage = new LoginPage()
  const homePage = new HomePage()
  const shoppingcartPage = new ShoppingCartPage()
  const utils = new Utils()

  beforeEach('Ingresar con usuario correcto a la pagina de Saucedemo', () => {
    cy.visit("/")
    loginPage.ingresarUsername('standard_user')
    loginPage.ingresarPassword('secret_sauce')
    loginPage.clickLogin()

    utils.verificarUrl("https://www.saucedemo.com/inventory.html")
    utils.verificarElementoYContenido(homeLocators.titulo_home, "Swag Labs")
  })

  it('Deberia agregar un producto al carrito y verificar que se haya agregado correctamente', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Bike Light';

    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();

      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart');
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);

      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })
  })

  it('Deberia agregar un producto al carrito y visualizar el detalle del producto desde el inventario', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Bike Light';

    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();

      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart');
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);

      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })

    shoppingcartPage.clickTituloProducto()
    utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
    utils.verificarElementoYContenido(inventoryLocators.product_name, producto)
  })

  it('Deberia remover un producto del carrito', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Backpack';

    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();

      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart');
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);

      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })

    utils.removerProductoDelCarrito(producto)
    utils.verificarCarritoVacio(shopingcartLocators.shopping_cart_link)
  })

  it('Deberia remover un producto del carrito y continuar comprando', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Backpack';

    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();

      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart');
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);

      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })

    utils.removerProductoDelCarrito(producto)
    utils.verificarCarritoVacio(shopingcartLocators.shopping_cart_link)

    shoppingcartPage.clickContinuarComprando()
    utils.verificarUrl("https://www.saucedemo.com/inventory.html");
    utils.verificarElementoYContenido(homeLocators.titulo_home, 'Swag Labs');
  })

  it('Deberia agregar un producto al carrito y dirigirse al Checkout correctamente', () => {
    // Elegir producto para agregar
    const producto = 'Sauce Labs Bike Light';

    utils.obtenerPrecioProductoSeleccionado(producto).then((precioProducto) => {

      utils.elegirProductoYAgregarAlCarrito(producto);
      utils.verificarProductoAgregadoAlCarrito(shopingcartLocators.shopping_cart_badge);
      homePage.dirigirseAlCarrito();

      utils.verificarUrl("https://www.saucedemo.com/cart.html");
      utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart');
      utils.obtenerTextoYComparar(shopingcartLocators.titulo_product_cart, producto);

      shoppingcartPage.obtenerPrecioYComparar(shopingcartLocators.item_price, precioProducto);
    })

    shoppingcartPage.clickCheckoutProduct()
    utils.verificarUrl("https://www.saucedemo.com/checkout-step-one.html")
    utils.verificarElementoYContenido(checkoutLocators.titulo_checkout, 'Checkout: Your Information')
  })

  it.only('Deberia agregar mas de un producto al carrito y verificar que se hayan agregado correctamente', () => {
    // Elegir productos para agregar
    const producto1 = 'Sauce Labs Bike Light'
    const producto2 = 'Sauce Labs Backpack'

    //utils.agregarDosProductosAlCarrito(producto1, producto2);
    utils.agregarProductosAlCarrito(producto1, producto2)
    utils.verificarProductosAgregadosAlCarrito(shopingcartLocators.shopping_cart_badge, "2");
    homePage.dirigirseAlCarrito()

    utils.verificarUrl("https://www.saucedemo.com/cart.html")
    utils.verificarElementoYContenido(shopingcartLocators.titulo_cart, 'Your Cart')
    utils.obtenerTextosYComparar(producto1, producto2)
    
  })

})