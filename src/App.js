import React from "react";
import { Link, Route } from 'react-router-dom';
import Form from './components/Form';
import Home from './components/Home';
const App = () => {
  return (
    <>
      <nav className="links">
        <h1>Lambda Eats</h1>
        <div>
          <Link to='/'>Home</Link>
          <Link to='/pizza' classNmae="orderBtn">Pizza?</Link>
        </div>
      </nav>

      <Route exact path='/'>
        <Home />
      </Route>

      <Route path='/pizza'>
        <Form />
      </Route>

    </>
  );
};
export default App;
