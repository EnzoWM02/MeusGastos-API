import logo from './logo.svg';
import './mainView.css';
import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import TopMenuBar from '../components/TopMenuBar';
import TableGastos from '../components/TableGastos';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {useNavigate} from "react-router-dom";

const MainView = () => {

    const navigate = useNavigate();

    const toGo = async () => {
        navigate('/NewGastos');
    }

        return (
            <div className="defaultBackground mainViewBackground">
                <div className="PageHeader">
                    <TopMenuBar/>
                </div>
                <div className="outside">
                    <div className="TableGastos">
                        <Button className="createButton filledButton" variant="contained" onClick={toGo}>
                            Cadastrar novo gasto
                        </Button>
                        <TableGastos/>
                    </div>
                </div>
            </div>
        );
}

export default MainView;