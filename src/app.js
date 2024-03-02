const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const socket = require("socket.oi");
const ProductManager = require("../src/controller/product-manager.js");
console.log(ProductManager);
const productManager = new ProductManager("../express/src/models/product.json");
const PUERTO = 8080;

const productsRoute =require("./routes/products.routers.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.route.js");

//Middleware
app.use(express.json());
app.use(express.json());
app.use(express.static("./src/piblic"));

//Handlebars
app.engine("handlebars", exphbs.engine());
app.set("view engine","handlebars");
app.set("views","./src/views");


//Rutas
app.use("/api/products",productsRouter);
app.use("/api/carts",cartsRouter);
app.use("/",viewsRouter);
//Array de products
const ProductManager = require("./controllers/product-manager.js");
const ProductManager = new ProductManager("./src/models/products.json");

//Creamos servidor de Socket.io
const io = socket(httpServidor);

io.on("connection",async(socket) => {
    console.log("Un cliente se conecto");
})
// enviamos el arrays de products al cliente que se conecto 
socket.emit("products",await productManager.getProducts());

// Recibimos el evento "eliminarProduct" desde el cliente:
socket.on("deleteProduct",async(id) =>{
    await.productManager.deleteProduct(id);
})


app.get("/products", async (req, res) => {
    try {
        const limit = req.query.limit;
        const product = await productManager.getProducts();
        if (limit) {
            const nuevoArrayRecortado = product.slice(0, limit)
            res.json(nuevoArrayRecortado);
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ error: "Error interno del servidor" })

    }
})

app.get("/products/:pid", async (req,res) => {
    try{
        let id = req.params.pid;
        const product = await productManager.getProductById(parseInt(id));
        if(!product){
            return res.json({error:"ID no encontrado"});
        }
        res.json(product);
    } catch(error){
        res.status(500).json({error: "Error interno del servidor"})
    }

})
//listen del servidor para escuchar puerto


app.listen(PUERTO, () => {
    console.log(`Escuchando puerto: ${PUERTO}`);
})