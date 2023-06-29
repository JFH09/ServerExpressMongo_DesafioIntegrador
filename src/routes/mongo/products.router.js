import { Router } from "express";
import { productModel } from "../../dao/models/product.model.js";

const router = Router();

router.get("/", async (req, res) => {
  console.log("entro aqui...");
  try {
    let products = await productModel.find();
    // res.json({ result: "success", payload: products });
    res.send({ products });
  } catch (err) {
    console.log("No se pudo obtener los productos con mongoose : ", err);
  }
});

router.post(
  /*"/:title/:description/:price/:thumbnail/:code/:stock"*/ "/",
  async (req, res) => {
    console.log("entro a post ...");

    //let { title, description, price, thumbnail, code, stock } = req.params;
    console.log(req.body.title);
    let { title, description, price, thumbnail, code, stock } = req.body;

    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log("entro a condicional de valores incompletos");
      return res.json({ result: "error", error: "Valores incompletos..." });
    }
    try {
      let result = await productModel.create({
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      });
      res.status(201).json({ result: "success", payload: result });
    } catch (err) {
      console.log("No se pudo agregar un producto...", err);
    }
  }
);

router.put("/:id", async (req, res) => {
  let { id } = req.params;

  let productToReplace = req.body;
  if (
    !productToReplace.title ||
    !productToReplace.description ||
    !productToReplace.price ||
    !productToReplace.thumbnail ||
    !productToReplace.code ||
    !productToReplace.stock
  ) {
    console.log("entro a condicional de valores incompletos");
    return res.json({ result: "error", error: "Valores incompletos..." });
  }

  let result = await productModel.updateOne({ _id: id }, productToReplace);
  res.json({ status: "success", payload: result });
});

router.delete("/:id", async (req, res) => {
  let { id } = req.params;

  let result = await productModel.deleteOne({ _id: id });
  res.json({ status: "success", payload: result });
});

export default router;
