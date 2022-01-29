const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const SECRET_KEY = 'Hiteshranjantask1'

const userSchema = new mongoose.Schema({
   name: {
       type: String,
       required:true
   },
   email: {
       type: String,
       required:true
   },
   password: {
       type: String,
       required:true
   },
   date: {
       type: Date,
       default: Date.now()
   },
   tasks: [
       {
           title: {
               type: String,
               required: true
           },
           desc: {
               type: String,
               required: true
           },
           creationDate: {
               type: Date,
               default: Date.now()
           },
           startDate: {
               type: Date,
               required: true
           },
           endDate: {
               type: Date,
               required: true
           }
       }
   ],
  
   tokens: [{
           token: {
               type: String,
               required: true
           }
    } ]
});

// hashing passwoed
userSchema.pre('save', async function(next){
    
    if(this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 12);
    }
    next();
});

  // token generate
  userSchema.methods.generateToken = async function() {
    try{
        let token = jwt.sign({_id: this._id}, SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch(err){
        console.log(err);
    }
}

// task
userSchema.methods.addTask = async function (title, desc, startDate, endDate) {
    try{
        this.tasks = this.tasks.concat( {title, desc, startDate, endDate});
        await this.save();
        return this.tasks;
         
    }catch(error) {
        console.log(error);
    }
}


const User = mongoose.model('USER', userSchema);

module.exports = User;