import React from 'react';
import Registrationform from '../../components/Registrationform/Registrationform';
import './register.css';

function Register() {
    return (
        <div className="registerpage">
            <div className="registercover">
                <Registrationform />
            </div>
        </div>);
}

export default Register;