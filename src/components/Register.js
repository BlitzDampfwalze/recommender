import React, { useState } from 'react';
import Navbar from './Navbar';
import firebase from '../firebase';

const Register = (props) => {
  const [name, setName] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);

  async function onRegister() {
    try {
      await firebase.register(name, email, password);
      props.history.replace('/dashboard')
    } catch (error) {
      alert(error.message);
    }
  }


  return (
    <main>
      <Navbar {...props} />
      <div className="container">
        <h2>
          Recommender Register
        </h2>

        <form onSubmit={e => e.preventDefault() && false}>

          <div className="input-field">
            <input
              placeholder="username"
              type="text" value={name}
              aria-label="username"
              onChange={e => setName(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="email"
              type="text" value={email}
              aria-label="email"
              onChange={e => setEmail(e.target.value)}
            />
          </div>

          <div className="input-field">
            <input
              placeholder="password"
              type="text" value={password}
              aria-label="password"
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button 
          type="submit"
          className="button is-primary"
          onClick={onRegister}
          >
          Register
          </button>

        </form>
      </div>
    </main>
  )
};

export default Register;