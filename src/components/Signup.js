import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import {Mutation} from "react-apollo"
import gql from 'graphql-tag'
import { AUTH_TOKEN } from '../constants'


const Signup = () => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [CID, setCID] = useState(23)
  const [gender, setGender] = useState("Male")
  const [firstName, setFirstName] = useState("Sayid")
  const [lastName, setLastName] = useState("Mitra")
  const [phone, setPhone] = useState("111-222-3333")
  const [permissionLevel, setPermissionLevel] = useState(1)
  const [age, setAge] = useState(22)

  let signupData = { username, CID, gender, firstName, lastName, phone, password, permissionLevel, age }

  const SIGNUP_MUTATION = gql`
      mutation SignupMutation($username: String!, $CID: ID!, $gender: String!, $firstName: String!, $lastName: String!, $phone: String!, $password: String!, $permissionLevel: Int!, $age: Int!) {
          signup(username: $username, CID: $CID, gender: $gender, firstName: $firstName, lastName: $lastName, phone: $phone, password: $password, permissionLevel: $permissionLevel, age: $age) {
              token
          }
      }
  `

  let handleSubmit = (e) => {
    e.preventDefault()
  }

  let confirm = async (data) => {
    const { token } = data.signup
    if (token) {
      setRedirect(true)
    }
  }

  if (redirect) return <Redirect to="/login" />

  return (
    <div className="row mt-4">
      <div className="col-md-7 offset-md-3">
        <div className="card card-body">
          <h2 className="py-2">Signup</h2>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" value={username} onChange={(e) => {setUsername(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="cid">CID</label>
              <input type="number" name="cid" value={CID} onChange={(e) => {setCID(Number(e.target.value))}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="gender">Gender</label>
              <input type="text" name="gender" value={gender} onChange={(e) => {setGender(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" value={firstName} onChange={(e) => {setFirstName(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" value={lastName} onChange={(e) => {setLastName(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="phone">Phone Number</label>
              <input type="tel" name="phone" value={phone} onChange={(e) => {setPhone(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="age">Age</label>
              <input type="tel" name="age" value={age} onChange={(e) => {setAge(Number(e.target.value))}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" name="password" value={password} onChange={(e) => {setPassword(e.target.value)}} className="form-control"/>
            </div>
            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" name="confirmPassword" value={confirmPassword} onChange={(e) =>{setConfirmPassword(e.target.value)}} className="form-control"/>
            </div>
            <Mutation
              mutation={SIGNUP_MUTATION}
              variables={signupData}
              onCompleted={data => confirm(data)}
            >
              {mutation => {
                const checkPassword = () => {
                  if (password === confirmPassword) {
                    mutation()
                  }
                }
                return (<button type="submit" className="btn btn-primary float-right" onClick={checkPassword}>Submit</button>)
              }}
            </Mutation>
          </form>
        </div>
      </div>
    </div>
  );

}

export default Signup;