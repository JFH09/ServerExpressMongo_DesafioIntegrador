import { Router } from "express";
import { cartModel } from "../../dao/models/cart.model.js";

const router = Router();

router.get("/", async (req, res) => {
  console.log("obteniendo lista total de carritos :");
  try {
    let carts = await cartModel.find();
    res.json({ result: "success", payload: carts });
  } catch (err) {
    console.log("No se pudo obtener el carrito con mongoose : ", err);
  }
});

//AGREGANDO PRODUCTO A CARRITO
router.put("/:idCarrito/:product/:idProduct", async (req, res) => {
  let quantity = 0;
  let { idCarrito, product, idProduct } = req.params;
  //console.log("entro a post ...", req.body.products);
  console.log("entro a post ...");
  console.log("agregando el carrito con la info -> ", product);

  if (!product || !idProduct || !idCarrito) {
    console.log("entro a condicional de valores incompletos");
    return res.json({ result: "error", error: "Valores incompletos..." });
  }

  console.log("buscando si existe un carrito con el id ", idCarrito);

  let cart = await cartModel.findOne({ _id: idCarrito });
  console.log("result: ", cart);

  if (!cart) {
    quantity = 1;
    console.log("No se encontro el carrito...");
    console.log("se debe crear un nuevo carrito....");
    console.log(
      "puede que no exista el carrito con ese id, para poder agregar un product cree un nuevo carro ..."
    );

    return res.json({
      result: "error",
      error: "e debe crear un nuevo carrito....",
    });
  } else {
    console.log("si existe el carrito ...Agregando el producto al carrito...");
    console.log(
      "buscando la posicion y datos del idproduct que hay que agregar..."
    );
    let productPosc = cart.products.findIndex(
      (elemento) => elemento.product == product
    );
    let productData = cart.products.find(
      (elemento) => elemento.product == product
    );

    console.log(productData);
    if (!productData) {
      quantity = 1;
      productData = { product, quantity, idProduct };
      cart.products.push(productData);
    } else {
      productData.quantity = productData.quantity + 1;
      cart.products[productPosc] = productData;
    }

    console.log(cart);
    let result = await cartModel.updateOne({ _id: idCarrito }, cart);
    res.json({ status: "success", payload: result });
  }
});

//Agregando un nuevo carrito...
router.post("/", async (req, res) => {
  let products = [];
  try {
    let result = await cartModel.create({
      products,
    });
    console.log("carrito agregado...");
    res.status(201).json({ result: "success", payload: result });
  } catch (err) {
    console.log("No se pudo agregar un producto...", err);
  }
});

router.delete("/:id", async (req, res) => {
  console.log("entro a eliminar carrito...");
  let { id } = req.params;

  let result = await cartModel.deleteOne({ _id: id });
  res.json({ status: "success", payload: result });
  // try {
  // } catch (err) {
  //   console.log("No se pudo eliminar el carrito, puede que no exista");
  //   res.json({
  //     result: "error",
  //     error: "No se pudo eliminar el carrito, puede que no exista",
  //   });
  // }
});
export default router;
