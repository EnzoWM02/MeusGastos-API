import './Login.css';
import React, { Component } from "react";
import TextField from '@mui/material/TextField';
import TopMenuBar from '../components/TopMenuBar';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const validateLogin = async () => {
        navigate('/mainView');
    }

        return (
            <div className="Login defaultBackground">
                <div className="card">
                    <h2>Meus Gastos</h2>
                    <TextField
                        className="textField"
                        id="email"
                        label="E-mail"
                        variant="outlined"
                        type="email"
                    />
                    <TextField
                        className="textField"
                        id="password"
                        label="Senha"
                        variant="outlined"
                        type="password"
                    />
                    <Button className="filledButton" variant="contained" onClick={validateLogin}>
                        Login
                    </Button>
                    <a className="signupRedirect" href="/signup">
                        <Button className="signupButton outlinedButton" variant="outlined" >
                            Sign up
                        </Button>
                    </a>
                </div>
            </div>
        );
}
export default Login;