import React, { useState, useEffect } from 'react'
import { Mutation } from 'react-apollo'
import gql from 'graphql-tag'
import jwt_decode from 'jwt-decode'
import { AUTH_TOKEN } from '../constants'
import { Redirect } from 'react-router-dom';

const Login = (props) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const LOGIN_MUTATION = gql`
      mutation LoginMutation($username: String!, $password: String!) {
          login(username: $username, password: $password) {
              token
          }
      }
  `

  let handleSubmit = (e) => {
    e.preventDefault()
  }

  let confirm = async (data) => {
    const { token } = data.login
    localStorage.setItem(AUTH_TOKEN, token)
    const decoded = jwt_decode(token)
    props.nowCurrentUser(decoded);
  }

  if (props.user) return <Redirect to="/profile" user={props.user} />;

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Username</label>
              <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} className="form-control" required />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form-control" required />
            </div>
            <Mutation
              mutation={LOGIN_MUTATION}
              variables={{ username, password }}
              onCompleted={data => confirm(data)}
            >
              {mutation => (
                <button type="submit" className="btn btn-primary float-right" onClick={mutation}>Submit</button>
              )}
            </Mutation>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Login