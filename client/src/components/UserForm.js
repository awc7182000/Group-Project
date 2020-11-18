import React, {useState} from 'react';
import axios from 'axios';
import {Link, navigate} from '@reach/router';

const UserForm = () => {
    const [first_name, setFirst_Name] = useState("");
    const [last_name, setLast_Name] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errs, setErrs] = useState({});

    const newUser = (e) => {
        e.preventDefault();
        axios.post("http://localhost:8000/api/users/new", {
            first_name,
            last_name,
            username,
            email,
            password
        })
            .then(res => {
                console.log(res.data);
                if (res.data.errors) {
                    setErrs(res.data.errors);
                } else {
                    navigate("/home");
                }
            })
            .catch(err => console.log(err));
    }
    
    return(
        <div className="container">
            
            <h1>User Information</h1>
            <form onSubmit={newUser} className="col-md-6" style={{display: "inline-block"}}>
                    <div className="form-group">
                        <label for="firstname">First Name:</label>
                        {errs.first_name ? <span className="text-danger small">{errs.first_name.message}</span> : null}
                        <input type="text" name="firstname" onChange= { e => setFirst_Name(e.target.value)} value={first_name} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label for="lastname">Last Name:</label>
                        {errs.last_name ? <span className="text-danger small">{errs.last_name.message}</span> : null}
                        <input type="text" name="lastname" onChange= { e => setLast_Name(e.target.value)} value={last_name}className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label for="email">Email:</label>
                        {errs.email ? <span className="text-danger small">{errs.email.message}</span> : null}
                        <input type="text" name="email" onChange= { e => setEmail(e.target.value)} value={email} className="form-control"/>
                    </div>
                    <div className="form-group">
                        <label for="password">Password:</label>
                        {errs.password ? <span className="text-danger small">{errs.password.message}</span> : null}
                        <input type="text" name="password" onChange= { e => setPassword(e.target.value)} value={password} className="form-control"/>
                    </div>
                    <button type="sumbit" className="btn btn-primary" style={{marginBottom: '10px'}}>Create User</button>
                </form>
        </div>
    )
}

export default UserForm;