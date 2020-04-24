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
          <Link t0='/pizza'>Order Pizza</Link>
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
