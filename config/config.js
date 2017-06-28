//DIFFERENT ENVIRONMENTS
//usually want to gitignore this environment
var env = process.env.NODE_ENV || "dev";  //heroku will automatically set process.env.node_env to "production". if it doesn't exist, it will be dev

if(env === "dev" || env === "test"){
    var config = require('./config.json'); //takes json object with objects for different environments
    var envConfig = config[env];  //gets environment Object
    
    //Object.keys(obj) -> returns array of keys
    Object.keys(envConfig).forEach( (key)=> {
        process.env[key] = envConfig[key];
    });
}