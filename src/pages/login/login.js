import React from 'react';
import Loginform from '../../components/Loginform/Loginform';
import './login.css';

function Login() {
    return (
        <div className="loginpage">
            <div className="logincover">
                <Loginform />
            </div>
        </div>);
}

export default Login;