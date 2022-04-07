/* const path = require('path'); */

const fs = require("fs");

const User = {                                  //.this se refiere a trabajar con un metodo
    fileName: './src/data/usuariosDB.json',

    getData: function () {                             //Convertir y leer la base de datos
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
    
    generateID: function() {                     //Generar automaticamente el id
        let allUsers = this.findAll();
        let lastUser = allUsers.pop();      //Coge el ultimo usuario
        if(lastUser){
            return lastUser.id + 1;     
        } 
        return 1;                           //Si esta vacio
    },

    findAll: function() {                        //Traer todos los usuarios
        return this.getData();
    },

    findByPk: function (id) {                     //Buscar por id en la db
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.id === id); //iterando todos los usuarios
        return userFound;
    },

    findByField: function (field, text) {         //Buscar por cualquier campo en la db
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser[field] === text); //iterando todos los usuarios
        return userFound;
    },

    findByEmail: function(email)  {         //Buscar por cualquier campo en la db
        let allUsers = this.findAll();
        let userFound = allUsers.find(oneUser => oneUser.email === email); //iterando todos los usuarios
        return userFound;
    },

    create: function(userData) {
        let allUsers = this.findAll();
        let newUser = {                     //En caso de que este sola la DB
            id: this.generateID(),
            ...userData
        } 
        allUsers.push(newUser);
        fs.writeFileSync(this.fileName, JSON.stringify(allUsers, null, ' '));
        return newUser;
    },

    delete: function(id)  {
        let allUsers = this.findAll();
        let finalUsers = allUsers.filter(oneUser => oneUser.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalUsers, null, ' '));
        return true;
    }
}

module.exports = User;