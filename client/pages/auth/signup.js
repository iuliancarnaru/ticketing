import { useState } from 'react';
import useRequest from '../../hooks/useRequest';
import Router from 'next/router';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { doRequest, errors } = useRequest({
    url: '/api/users/signup',
    method: 'post',
    body: {
      email,
      password,
    },
    onSuccess: () => Router.push('/'),
  });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    await doRequest();
  };

  return (
    <div className="container">
      <form onSubmit={handleFormSubmit}>
        <h1>Signup</h1>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input
            id="email"
            type="text"
            className="form-control"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="form-group mb-3">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            className="form-control"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errors}
        <button className="btn btn-primary">Sign up</button>
      </form>
    </div>
  );
};

export default Signup;
