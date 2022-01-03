import React from 'react';
import { Link } from "react-router-dom";
import Loginform from '../../components/Loginform/Loginform';
import './login.css';

function Login() {
    return (
        <div className="loginpage">
            <div className="logincover">
                <Loginform />
                <Link to="/testmap">Testmap</Link>
            </div>
        </div>);
}

export default Login;