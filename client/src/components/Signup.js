import React, { useState } from 'react';
import axios from 'axios';

function SignupForm() {
  const [values, setValues] = useState({
    name: '',
    email: '',
    password: '',
    role: 'user',
  });

  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleInput = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleSignup = (event) => {
    event.preventDefault();
    if (values.name !== '' && values.email !== '' && values.password !== '' && values.role !== '') {
      axios
        .post('http://localhost:4000/addUsers', values)
        .then((res) => {
          console.log(res);
          setRegistrationSuccess(true);
          setValues({
            name: '',
            email: '',
            password: '',
            role: 'user',
          });
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-header">
              <h2>Sign Up</h2>
            </div>
            <div className="card-body">
              {registrationSuccess ? (
                <div className="alert alert-success" role="alert">
                  Registration Successful! You can now Login.
                </div>
              ) : (
                <form onSubmit={handleSignup}>
                  <div className="mb-3">
                    <label htmlFor="signupName" className="form-label">
                      Name:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={values.name}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email:
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={values.email}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password:
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={values.password}
                      onChange={handleInput}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="role" className="form-label">
                      Role:
                    </label>
                    <select
                      className="form-control"
                      name="role"
                      value={values.role}
                      onChange={handleInput}
                      required
                    >
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Register
                  </button>
                </form>
              )}
            </div>
            <div className="card-footer text-center">
              <p>
                Already have an account? <a href="/">Login</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SignupForm;
