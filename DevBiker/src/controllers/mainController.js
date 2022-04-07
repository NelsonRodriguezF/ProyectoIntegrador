const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.JSON');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const localizarUbicacion = (tipo) => {
    return products.filter(
      (ubicacion) => ubicacion.tipo === tipo
    );
};

const mostrarCategoria = (category) => {
    return products.filter(
      (categoria) => categoria.category === category
    );
};
  
const masVendidos = localizarUbicacion("mas vendido");
const carrito = localizarUbicacion("para-el-carrito");
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

module.exports = {
    //Mostrar página de inicio
    home: (req,res)=>{
        res.render("users/home", {
            masVendidos,
        });
    },
    //Mostrar página de login
/*     loginUser: (req,res)=> {
        res.render("users/login");
    }, */
    //Mostrar página de registro
    registerUser: (req,res) => {
        res.render(("users/register"));
    },
    //Mostrar página de carrito de compras
    carrito:(req,res)=>{
        res.render("users/carrito",{
			carrito,
			toThousand
		});
    },
    //Mostrar página de todos los productos
    products: (req, res)=>{
        res.render("products/products", {
            products
        });
    },
    //Mostrar página para el detalle del producto
    detail: (req, res)=>{
        let id = req.params.id;
        let product = products.find(p => p.id == id);
        res.render("products/detail", {
            product,
            toThousand
        });
    },
    //Páginas por categoria
    montana: (req, res)=>{
        const montana = mostrarCategoria("Montaña");
        res.render("products/cMontana", {
            montana
        });
    },
    ruta: (req, res)=>{
        const ruta = mostrarCategoria("Ruta");
        res.render("products/cRuta",{
            ruta
        });
    },
    bmx: (req, res)=>{
        const bmx = mostrarCategoria("BMX");
        res.render("products/cBmx", {
            bmx
        });
    },
    urbana: (req, res)=>{
        const urbana = mostrarCategoria("Urbana");
        res.render("products/cUrbana", {
            
            urbana
        });
    },
    oferta: (req,res)=>{
        res.render("products/oferta", {
            products
        });
    }
}



