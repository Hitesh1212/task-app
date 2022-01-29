const mongoose = require('mongoose');

const DB = 'mongodb://127.0.0.1:27017/task1'

mongoose.connect(DB, {
    useNewUrlParser: true,
  //  useCreateIndex: true,
    useUnifiedTopology: true,
   // useFindAndModify: false
}).then(() => {
        console.log(`database connection succesfull`);
}).catch((err)=> console.log(err));
