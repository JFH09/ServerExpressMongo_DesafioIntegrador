import express from "express";
import productsRoutes from "./routes/mongo/products.router.js";
import cartsRouter from "./routes/mongo/carts.router.js";
import messagesRouter from "./routes/mongo/messages.router.js";
import __dirname from "./utils.js";
import mongoose from "mongoose";
import handlerbars from "express-handlebars";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.engine("handlebars", handlerbars.engine());
app.set("views", __dirname + "/views");
app.set("view engine", "handlebars");
app.use(express.static(__dirname + "/public"));
//pass: 12345
mongoose.connect(
  "mongodb+srv://julanfzh:12345@cluster0.5pmt2j5.mongodb.net/?retryWrites=true&w=majority"
);
app.use("/api/products", productsRoutes);
app.use("/api/carts", cartsRouter);
app.use("/api/chat", messagesRouter);
app.use("/", (req, resp) => {
  resp.send("Servidor Arriba!!! pruebe con =  algo");
});
app.listen(8080, () => console.log("Escuchando por el puerto 8080"));
