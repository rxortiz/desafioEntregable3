const { response } = require("express");
const express = require("express");
const res = require("express/lib/response");
const fs = require("fs");

const app = express()
const PORT = 8080
const server = app.listen(PORT, ()=>{
    console.log("Servidor levantado")

});

class Contenedor{
   
    async getAll(){
        try {
            const contenido = await fs.promises.readFile("./productos.txt","utf-8" )
            console.log(contenido);
            return JSON.parse(contenido,null,2);
        } catch (error) {
            console.log(error)
        }
    }

    async getById(id){
        const contenido = await this.getAll();
        const productoBuscado = contenido.filter(producto => producto.id === id);
        //console.log(productoBuscado);
        return productoBuscado;
    }
}

const contenedor = new Contenedor();

app.get("/productos", (req, resp) => {
    contenedor.getAll().then(respuesta => resp.send(respuesta));
  });

  app.get("/productoRandom", async (req, resp) => {
    let productoRandom = Math.floor(Math.random()*3+1)
   
    contenedor.getById(productoRandom).then(respuesta => resp.send(respuesta));
  });