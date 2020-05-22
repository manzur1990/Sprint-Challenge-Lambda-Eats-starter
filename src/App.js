import React from "react";
import { Link, Route } from 'react-router-dom';
import UserForm from './components/Form';
import Home from './components/Home';
const App = () => {
  return (
    <>
      <nav className="links">
        <h1>Lambda Eats</h1>
        <div>
          <Link to='/' className="homeBtn">Home</Link>
          <Link to='/pizza' className="orderBtn">Pizza?</Link>
        </div>
      </nav>
      <Route exact path='/'>
        <Home />
      </Route>
      <Route path='/pizza'>
        <UserForm />
      </Route>
    </>
  );
};
export default App;
