const { setWorldConstructor} = require("cucumber");

function World({attach}) {
    //Enables the world to attach data (screenshots)
    this.attach = attach;
    this.name = "";
    this.email = "";

    this.setName = function (name) {
        this.name = name;
    }
    this.setEmail = function (email) {
        this.email = email;
    }
}

setWorldConstructor(World);