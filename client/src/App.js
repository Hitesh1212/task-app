
import './App.css';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Registration from './components/Registration';
import Home from './components/Home';
import Dashboard from './components/Dashboard';

import { UserStateContext } from './helpers/Contexts';

import {
  BrowserRouter,
  Routes,
  Route,
 
} from "react-router-dom";
import Logout from './components/Logout';
import { useState } from 'react';


function App() {
    const [login, setLogin] = useState(false);
  return (
    <>
    
      <UserStateContext.Provider value = {{login, setLogin}}>
       <BrowserRouter>
       <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Register" element={ login === false && <Registration />} />
          <Route exact path="/Login" element={ login === false && <Login />} />
          <Route exact path="/Dashboard" element={ login === true && <Dashboard />} />
          <Route exact path="/Logout" element={ login === true && <Logout />} />
            
          </Routes>

      </BrowserRouter>
      </UserStateContext.Provider>

    {/* <Switch>
          <Route path="/">
             <Home />
          </Route>
          <Route path="/Registration">
             <Registration />
          </Route>
          <Route path="/Login">
             <Login />
          </Route>
          <Route path="/Dashboard">
             <Dashboard />
          </Route>
        </Switch> */}
    
    
    
    
    </>
  
  );
}

export default App;
