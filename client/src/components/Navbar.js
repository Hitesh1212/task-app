import { UserStateContext } from "../helpers/Contexts"
import { useContext } from "react"
import {NavLink as Link } from "react-router-dom"
const Navbar = () => {
    const { login} = useContext(UserStateContext)
    return (
        <>
        <nav className="navbar navbar-expand-sm bg-dark ">

            <div className="container-fluid">
               <Link className="navbar-brand text-white" to=".">Todo</Link>
              { login ? (
                   <ul className="navbar-nav">
                   <li className="nav-item">
                   <Link className="nav-link text-white" to=".">Home</Link>
                   </li>
                 
   
                   <li className="nav-item">
                   <Link className="nav-link text-white" to="./Dashboard">Dashboard</Link>
                   </li>
   
                   <li className="nav-item">
                   <Link className="nav-link text-white" to="./Logout">Logout</Link>
                   </li>
               </ul>
              )
               : 
               <ul className="navbar-nav">
               <li className="nav-item">
               <Link className="nav-link text-white" to=".">Home</Link>
               </li>
               <li className="nav-item">
               <Link className="nav-link text-white" to="./Register">Register</Link>
               </li>
               <li className="nav-item">
               <Link className="nav-link text-white" to="./Login">Login</Link>
               </li>

             
           </ul>
               }
            </div>

        </nav>

        </>
    )

}

export default Navbar