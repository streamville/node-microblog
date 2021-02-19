const mongoose = require('mongoose');
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);



class Database {

  constructor(){
    this.connect();
  }

  connect(){
    mongoose.connect('ENTER_KEY_HERE')
    .then(() => {
    console.log("Database connection successful");
    })
    .catch((err) =>{
    console.log("Database connection error: " + err);
    })
  }
}

module.exports = new Database();