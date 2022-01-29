 import { useState, useContext } from "react";
 import { useNavigate } from "react-router-dom";
 import { UserStateContext } from "../helpers/Contexts";
 

const Login = () => {
        const { setLogin} = useContext(UserStateContext) 

       const history = useNavigate()
  const [user, setUser] = useState({
    email:"", password:""
  });

  let name, value;

  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;

    setUser({...user, [name]:value});

  }
  const loginData = async (e) => {
     e.preventDefault();
    const {email, password} = user;

    const data = await fetch("http://localhost:1337/api/login", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        
      },
      credentials: "include",
      body: JSON.stringify({
        email, password
      })
    });

    try{
      if(data.status === 400 || !data) {
        
        window.alert("invalid login");
      }
      else{
         setLogin(true)
        window.alert("login succesfull");
          history("/Dashboard");
      }
  
    } catch(error) {
         console.log(error)
    }
  }


    return (
        <>
        
        <div className="container mt-5">
           <h1 className="text-center">Login</h1>

          <div className="form">

          <form method="POST">
               
               <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email"
                   value={user.email}
                   onChange={handleInputs}
                placeholder="Enter email" name="email" />
               </div>
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd"
                   value={user.password}
                   onChange={handleInputs}
                placeholder="Enter password" name="password" />
              </div>
           
                <div className="button ">
                <button type="submit"
                  onClick={(e) => loginData(e)}
                className="btn btn-primary">Submit</button>
                </div>
            </form>
          </div>

        </div>
        </>
    )

}

export default Login