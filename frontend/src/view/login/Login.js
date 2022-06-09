import './Login.css';
import React, { useEffect, useState, Component } from 'react';
import TextField from '@mui/material/TextField';
import { Button } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';
import Checkbox from '@mui/material/Checkbox';

const Login = ({setLoggedIn}) => {

    const [fieldValues, setFieldValues] = useState([]);
    const [cookies, setCookie] = useCookies(['user']);
    const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
    const navigate = useNavigate();

    const [keepLoginCheck, setkeepLoginCheck] = useState(false);

    const handleChange = event => {
      setkeepLoginCheck(current => !current);
    };

    // const setTokenCookie = async () => {
    //     setCookie('Name', fieldValues.email, { path: '/', maxAge:'3600'});
    //     console.log(cookies.Name);
    // }

    // Usado para testar a criptografia
    // const teste = async () => {
    //     let email = fieldValues.email;
    //     let password = fieldValues.password;
    //     await axios.post(process.env.REACT_APP_API_URL_USER, {email, password});
    //     const {data:response} = await axios.get(process.env.REACT_APP_API_URL_USER);
    //     const finalPassword = await axios.post(process.env.REACT_APP_API_URL_USER_PASSWORD, password, {headers: {"Content-Type": "text/plain"}});

    //     console.log(fieldValues.password);
    //     console.log(finalPassword.data);

    //     response.map(function(key, index) {
    //         if (response[index].email === fieldValues.email) {
    //             console.log(response[index].password);
    //             if (response[index].password === finalPassword.data) {
    //             }
    //         }
    //     })

    // }

    const validateLogin = async () => {
        let emailOk = false;
        let passwdOk = false;
        let password = fieldValues.password;
        let userid = '';
        const {data:response} = await axios.get(process.env.REACT_APP_API_URL_USER);
        const finalPassword = await axios.post(process.env.REACT_APP_API_URL_USER_PASSWORD, password, {headers: {"Content-Type": "text/plain"}});

        response.map(function(key, index) {
            if (response[index].email === fieldValues.email) {
                emailOk = true;
                if (response[index].password === finalPassword.data) {
                    passwdOk = true;
                    userid = response[index].id;
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
            if (keepLoginCheck === true) {
                setCookie('token', finalPassword.data, { path: '/', maxAge:'360000'});
                setCookie('userid', userid, { path: '/', maxAge:'360000'});
            } else {
                setCookie('token', finalPassword.data, { path: '/'});
                setCookie('userid', userid, { path: '/'});
            }
            toast.success("Login realizado com sucesso");
            setLoggedIn(true);
            navigate('/home');
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
                    <div className="checkboxKeepLogin">
                    <Checkbox {...label}  id="keepLoggedIn" onChange={handleChange}/> Lembrar de mim
                    </div>
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