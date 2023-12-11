Feature: Login Feature

    Scenario: Login con datos correctos en Saucedemo
        Given El usuario se dirige a la pagina de Login de Saucedemo
        And El usuario ingresa su nombre de usuario "standard_user"
        And El usuario ingresa su contrasenia "secret_sauce"
        When El usuario hace click en el boton de Login
        Then El usuario ingresa correctamente al Home
