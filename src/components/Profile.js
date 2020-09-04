import React from 'react';
import { Link } from 'react-router-dom';

const Profile = (props) => {
  console.log(props);
  const userData = props.user ?
    (<div>
      <h1>Profile</h1>
      <p><strong>ID:</strong> {props.user.id}</p>
      <p><strong>Username:</strong> {props.user.username}</p>
      <p><strong>First Name:</strong> {props.user.firstName}</p>
      <p><strong>Last Name:</strong> {props.user.lastName}</p>
    </div>) : <h4>Loading...</h4>

  const errorDiv = () => {
    return (
      <div className="text-center pt-4">
        <h3>Please <Link to="/login">login</Link> to view this page</h3>
      </div>
    );
  };

  return (
    <div>
      { props.user ? userData : errorDiv() }
    </div>
  );

}

export default Profile;