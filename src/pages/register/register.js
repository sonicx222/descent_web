import React from 'react';
import Registrationform from '../../components/Registrationform/Registrationform';
import './register.css';

function Register() {
    return (
        <div className="login-start-cover">
            <div className="vertical-align ">
                <Registrationform />
            </div>
        </div>);
}

export default Register;