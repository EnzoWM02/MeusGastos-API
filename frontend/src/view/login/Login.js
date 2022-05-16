import './Login.css';
import React, { useEffect, useState, Component } from 'react';
import TextField from '@mui/material/TextField';
import TopMenuBar from '../components/TopMenuBar';
import { Button, ButtonGroup, Container, Table } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {

    const [fieldValues, setFieldValues] = useState([]);

    const navigate = useNavigate();

    const teste = async () => {
        let email = fieldValues.email;
        let password = fieldValues.password;
        await axios.post(process.env.REACT_APP_API_URL_USER, {email, password});
        const {data:response} = await axios.get(process.env.REACT_APP_API_URL_USER);
        const finalPassword = await axios.post(process.env.REACT_APP_API_URL_USER_PASSWORD, {password});

        console.log(fieldValues.password);
        console.log(finalPassword);

        response.map(function(key, index) {
            if (response[index].email === fieldValues.email) {
                console.log(response[index].password);
                if (response[index].password === finalPassword.data) {
                }
            }
        })

    }

    const validateLogin = async () => {
        let emailOk = false;
        let passwdOk = false;
        let password = fieldValues.password;
        const {data:response} = await axios.get(process.env.REACT_APP_API_URL_USER);
        const finalPassword = await axios.post(process.env.REACT_APP_API_URL_USER_PASSWORD, {password});

        console.log(fieldValues.password);
        console.log(finalPassword.data);
        response.map(function(key, index) {
            if (response[index].email === fieldValues.email) {
                emailOk = true;
                console.log(response[index].password);
                if (response[index].password === finalPassword.data) {
                    passwdOk = true;
                }
             }
        })

        if (emailOk === false) {
            toast.error("Esse e-mail não está cadastrado");
        }
        if (emailOk === true && passwdOk === false) {
            toast.error("A senha não está correta");
        }
        if (emailOk === true && passwdOk === true) {
            toast.success("Login realizado com sucesso");
            navigate('/mainView');
        }
    }

    const goSignup = async () => {
        navigate('/signup');
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
                        onChange={(e) =>
                            setFieldValues({ ...fieldValues, email: e.currentTarget.value })
                        }
                    />
                    <TextField
                        className="textField"
                        id="password"
                        label="Senha"
                        variant="outlined"
                        type="password"
                        onChange={(e) =>
                            setFieldValues({ ...fieldValues, password: e.currentTarget.value })
                        }
                    />
                    <Button className="filledButton" variant="contained" onClick={validateLogin}>
                        Login
                    </Button>
                        <Button className="signupButton outlinedButton" variant="outlined" onClick={goSignup}>
                            Sign up
                        </Button>
                    <Button className="signupButton outlinedButton" variant="outlined" onClick={teste}>
                        Teste
                    </Button>
                </div>
            </div>
        );
}
export default Login;