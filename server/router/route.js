const router = require('express').Router();
const bcrypt = require('bcryptjs');
require('../db/connection');
const User = require('../model/userSchema');
const jwt = require("jsonwebtoken")

const auth = require('../middleware/auth');

router.get('/', (req, res) => {
   res.send("from router")
})

// registration

router.post('/register', async (req, res) =>{
   console.log(req.body)
   const { name, email, password } = req.body;
    if(!name || !email || !password){
        return res.status(422).json({error: "plz fill form properly"});
    }
    try{
       const userExist = await User.findOne( { email: email})
        
       if(userExist) {
           return res.status(422).json({ error: "email already exist"});

       }
       else {
           const user = new User({ name, email, password });
          
           // hashing used here
           await user.save();
   
           res.status(201).json({ message: "registration succesfull"});
       }
       

   } catch (err) {
        console.log(err);
    }

    });

   // login
    router.post("/login", async (req, res)=> {
      try{
           const { email, password} = req.body;
           if(!email || !password) {
               return res.status(400).json({error: "plz fill data"});
           }
           const userLogin = await User.findOne({ email: email});
  
           if(userLogin){
                const isMatch = await bcrypt.compare(password, userLogin.password);
  
                const token = await userLogin.generateToken();
                      
                   res.cookie("jwt_token", token, {
                     httpOnly: true,
                     maxAge: 60*60*24*30*1000
                      
                   })
  
               if(!isMatch){
                 res.status(400).json( {error: "login faild!"});
               }
               else{
  
                 
                 res.json( {message: "login successful"});
                }
           } else {
               res.status(400).json({error: "invalid login"});
           }
           
           
      } catch (err) {
          console.log(err);
      }
  });

  // logout
   router.get('/logout', async (req, res) => {
            res.clearCookie('jwt_token', {path: '/'});
            res.status(200).send('logout');
   })

  // dashboard
  router.get('/dashboard', auth, async (req, res)=> {
     
        res.status(200).send(req.rootUser);
  })

   // task added
   router.post("/task", auth, async (req, res) => {
        console.log(req.body)
    try{
        const { title, desc, startDate, endDate } = req.body;
  
        if( !title || !desc || !startDate || !endDate ) {
            console.log("error in adding task");
            return res.status(400).json({error: "plz add task properly"});
        }

        const userTask = await User.findOne({ _id: req.userID });

        if(userTask){
            const addTasks = await userTask.addTask(title, desc, startDate, endDate );

            await userTask.save();
            res.status(201).json({message: "task added succesfull"});
        }

    }catch(error){
        console.log(error)
    }
});


module.exports = router