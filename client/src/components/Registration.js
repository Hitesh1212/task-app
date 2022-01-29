import {useState} from 'react'
import {useNavigate} from 'react-router-dom'

const Registration = () => {
      const history = useNavigate()
    const [user, setUser] = useState({
        name:"",
        email: "",
        password: ""
    })

    const handelInput = (e) => {

        setUser({ ...user, [e.target.name]:e.target.value});
    }

    const formSubmit = async (e) => {
           
      e.preventDefault();
       const {name, email, password} = user

          const register = await fetch('http://localhost:1337/api/register',  {

              method: "POST",
              headers: {
                  "Content-Type" : "application/json"
              },
              body: JSON.stringify({
                  name, email, password
              })
          })

          try{
            if(register.status === 422 || !register) {
              
              window.alert("invalid registration");
            }
            else{
              window.alert("registration succesfull");
                history("/login");
            }
        
          } catch(error) {
               console.log(error)
          }

    }

    return (
        <>
        <div className="container mt-5">
           <h1 className="text-center">Registration</h1>

          <div className="form">

          <form method='POST'>
               <div className="mb-3 mt-3">
                <label htmlFor="name" className="form-label">Name:</label>
                <input type="text" className="form-control" id="name"
                  value={user.name}
                  onChange={ handelInput}
                placeholder="Enter name" name="name" />
               </div>
               <div className="mb-3 mt-3">
                <label htmlFor="email" className="form-label">Email:</label>
                <input type="email" className="form-control" id="email" 
                  value={user.email}
                  onChange={ handelInput}
                placeholder="Enter email" name="email" />
               </div>
              <div className="mb-3">
                <label htmlFor="pwd" className="form-label">Password:</label>
                <input type="password" className="form-control" id="pwd"
                   value={user.password}
                  onChange={ handelInput}
                placeholder="Enter password" name="password" />
              </div>
           
                <button type="submit" onClick={(event) => formSubmit(event)} className="btn btn-primary">Submit</button>
            </form>
          </div>

        </div>
        </>
    )

}

export default Registration