class Utils {

  verificarUrl(url) {
    cy.url()
      .should('eq', url);
  }

  verificarElementoYContenido(locator, text) {
    cy.get(locator)
      .should('exist')
      .contains(text)
  }

  obtenerTextoYComparar(locator, text) {
    cy.get(locator)
      .invoke('text')
      .should('eq', text)
  }

  obtenerTextosYComparar(...productos) {
    productos.forEach((producto, index) => {
      const xpath = `//div[normalize-space()='${producto}']`;
  
      cy.xpath(xpath)
        .invoke('text')
        .should('eq', producto);
    });
  }

  verificarProductoAgregadoAlCarrito(locator) {
    cy.get(locator)
      .should('exist')
      .invoke('text')
      .should('eq', "1")
  }

  verificarProductosAgregadosAlCarrito(locator, cantidad) {
    cy.get(locator)
      .should('exist')
      .invoke('text')
      .should('eq', cantidad)
  }

  verificarCarritoVacio(locator) {
    cy.get(locator).should('be.empty')
  }

  hacerClicEnElementoLista(elements, opcion) {
    cy.get(elements)
      .contains(opcion)
      .click()
  }

  seleccionarFiltro(locator, filtro) {
    cy.get(locator).select(filtro)
  }

  transformarNombreProducto(nombreProducto) {
    // Convertir el texto a minúsculas y reemplazar espacios con guiones
    return nombreProducto.toLowerCase().replace(/\s+/g, '-');
  }

  obtenerPrecioProductoSeleccionado(nombreProducto) {
    const idProducto = this.transformarNombreProducto(nombreProducto);

    // Crear el XPath con el id del producto y localizar el precio
    const xpath = `//button[@id='add-to-cart-${idProducto}']/preceding-sibling::div[@class='inventory_item_price']`;
    const price = cy.xpath(xpath).invoke('text')
    return price
  }

  elegirProductoYAgregarAlCarrito(nombreProducto) {
    const idProducto = this.transformarNombreProducto(nombreProducto);
    const xpath = `//button[@id='add-to-cart-${idProducto}']`;
    cy.xpath(xpath).click();
  }

  removerProductoDelCarrito(nombreProducto) {
    const idProducto = this.transformarNombreProducto(nombreProducto);

    const xpath = `//button[@id='remove-${idProducto}']`;
    cy.xpath(xpath).click();
  }

  agregarDosProductosAlCarrito(product1, product2) {
    const idProducto1 = this.transformarNombreProducto(product1);
    const idProducto2 = this.transformarNombreProducto(product2);

    const xpath1 = `//button[@id='add-to-cart-${idProducto1}']`;
    const xpath2 = `//button[@id='add-to-cart-${idProducto2}']`;

    cy.xpath(xpath1).click();
    cy.xpath(xpath2).click();
  }

  agregarProductosAlCarrito(...productos) {
    productos.forEach((producto) => {
      const idProducto = this.transformarNombreProducto(producto);
      const xpath = `//button[@id='add-to-cart-${idProducto}']`;
      cy.xpath(xpath).click();
    });
  }

}

export default Utils;