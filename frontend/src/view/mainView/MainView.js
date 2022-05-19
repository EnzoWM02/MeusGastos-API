import logo from './logo.svg';
import './mainView.css';
import React, {Component} from "react";
import TextField from '@mui/material/TextField';
import TopMenuBar from '../components/TopMenuBar';
import TableGastos from '../components/TableGastos';
import {Button, ButtonGroup, Container, Table} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import Tooltip from '@mui/material/Tooltip';

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
                        <Tooltip title="Desfazer último">
                        <IconButton
                            size="large"
                            edge="start"
                            aria-label="events-menu"
                            sx={{ mr: 2 }}
                            id="events-button"
                            className="returnIcon"
                            //onClick={handleClick2}
                        >
                            <KeyboardReturnIcon />
                        </IconButton>
                        </Tooltip>
                        <TableGastos/>
                    </div>
                </div>
            </div>
        );
}

export default MainView;