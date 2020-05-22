import React from "react";
import { Link } from 'react-router-dom';


const Home = () => {
    return (
        <>
            <h1>Best Pizzas in Town!</h1>
            <Link to='/pizza' classNmae="orderBtn">Pizza?</Link>
        </>
    );
};
export default Home;
