import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopMenuBar from "../components/TopMenuBar";
import {Button} from "reactstrap";
import TableGastos from "../components/TableGastos";
import TextField from "@mui/material/TextField";
import "./NewGastos.css"
import {useNavigate} from "react-router-dom";

const NewGastos = () => {

    const navigate = useNavigate();

    const backToMain = async () => {
        navigate('/MainView')
    }

    return (
        <div className="defaultBackground mainViewBackground">
            <div className="PageHeader">
                <TopMenuBar/>
            </div>
            <div className="card ngcard">
                <h2>Cadastrar novo gasto</h2>
                <TextField
                    className="textField"
                    id="name"
                    label="Nome"
                    variant="outlined"
                    type="text"
                />
                <TextField
                    className="textField"
                    id="description"
                    label="Descrição"
                    variant="outlined"
                    type="text"
                />
                <TextField
                    className="textField"
                    id="value"
                    label="Valor"
                    variant="outlined"
                    type="value"
                />
                <Button className="filledButton" variant="contained" >
                    Cadastrar
                </Button>
                    <Button className="signupButton outlinedButton" variant="outlined" onClick={backToMain}>
                        Voltar
                    </Button>
            </div>
        </div>
    );

}

export default NewGastos
