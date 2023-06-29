# ServerExpressMongo_DesafioIntegrador
Para las pruebas : 
Uso de bd mongo atlas con colecciones 
  carts: 
    get - http://localhost:8080/api/carts/ -> traera toda la lista de carritos 
    post - http://localhost:8080/api/carts -> agregara un carrito a la coleccion
    put - http://localhost:8080/api/carts/idCarrito/product/idProduct -> modificara el carrito y si el producto ya existe sumara uno
                                example: 649bc54f1f5f6b1c9f3fa619/papas/3
    delete - http://localhost:8080/api/carts/idCarrito - se eliminara el carrito por el id
  products:
    get - http://localhost:8080/api/products -> traera toda la lista de productos 
    post - http://localhost:8080/api/products -> agregara un producto a la coleccion por body
            {"title":"agua","description":"bebida","price":2.66,"thumbnail":"ruta2.png","code":"bebidas#543","stock":33,"id":2}
    put -http://localhost:8080/api/products/id -> modificara el producto por id enviandolo por  body exmpId:649badf39bbbdc87450ff4e1
      example:{"title": "agua","description": "bebida","price": "4.66","thumbnail": "rutaagua.png", "code": "bebidas#543", "stock": "20"}
    delete - http://localhost:8080/api/carts/idProduct - se eliminara el carrito por el id

    messages: http://localhost:8080/api/chat/ - post - enviando user y message por body  y  get - render de chat con handlebars
      http://localhost:8080/api/chat/messages - get para obtener la lista de mensajes
