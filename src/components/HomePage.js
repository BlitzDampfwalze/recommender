import React from 'react';
import Navbar from './Navbar';

const Homepage = (props) => {
  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>Recommender Homepage</h2>
        <p>lorem ipsum</p>
      </div>
    </main>
  )
};

export default Homepage;