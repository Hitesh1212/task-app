  import { useEffect, useContext } from "react"
  import { useNavigate } from "react-router-dom"
  import { UserStateContext } from "../helpers/Contexts"
const Logout = () => {
    const { setLogin} = useContext(UserStateContext) 
        const history = useNavigate();
    useEffect( ()=> {
          fetch('http://localhost:1337/api/logout', {
              method: "GET",
              headers: {
                  Accept: "application/json",
                  "Content-Type": "application/json"
              },
              credentials: 'include'
          })
          .then( (res)=> {
              setLogin(false)
             history('/Login', {replace: true})
              if(res.status !== 200 ){
                  const error = new Error(res.err)
                  throw error;
              }
          })
          .catch( (err) => {
              console.log(err)
          })
    })
    return (
        <>
         logout
        </>
    )

}

export default Logout