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

    const validateLogin = async () => {
        let emailOk = false;
        let passwdOk = false;
        const {data:response} = await axios.get(process.env.REACT_APP_API_URL_USER);
        response.map(function(key, index) {
            if (response[index].email === fieldValues.email) {
                emailOk = true;
                if (response[index].password === fieldValues.password) {
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
                </div>
            </div>
        );
}
export default Login;