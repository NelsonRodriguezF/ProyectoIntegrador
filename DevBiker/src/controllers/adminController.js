/* const res = require("express/lib/response"); */
/* const { redirect } = require('express/lib/response'); */
const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.JSON');
let products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
    store: (req, res) => {
		let image = req.file ? req.file.filename : "default-image.png";
		let newProduct = {
			id: products[products.length - 1].id + 1,
			...req.body,
			image: image
		};

		products.push(newProduct);
		fs.writeFileSync(productsFilePath, JSON.stringify(products, null, ' '));

		res.redirect('/');
	},

    vista: (req,res)=>{
        res.render(("admin/create"));
    },
	
    index:(req,res)=>{
        res.render("admin/index",{
			products,
			toThousand
		})
    },
    
    edit:(req, res)=>{
        let id = req.params.id;		//conocer el id del product
		let productToEdit = products.find(product => product.id == id);

        res.render("admin/editar", {
            productToEdit,
			products
        });
    },

    update: (req, res) => {
		let id = req.params.id;
		let productToEdit = products.find(product => product.id == id);

		productToEdit = {
            id: productToEdit.id,
			...req.body,
            image: productToEdit.image
		};

		let newProducts = products.map(product => {
			if(product.id == productToEdit.id){
				product = {...productToEdit}
			}
			return product;
		})

		fs.writeFileSync(productsFilePath, JSON.stringify(newProducts, null, " "));
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect("/admin");
	},

    destroy : (req, res) => {
		let id = req.params.id;
		let finalProducts = products.filter(product => product.id != id);

		fs.writeFileSync(productsFilePath, JSON.stringify(finalProducts, null, " "));
		products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
		res.redirect("/admin");
	}
}

module.exports = controller;


