import './mainView.css';
import React, {Component} from "react";
import TopMenuBar from '../components/TopMenuBar';
import TableGastos from '../components/TableGastos';
import {Button} from 'reactstrap';
import {useNavigate} from "react-router-dom";
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import axios from 'axios';
import Tooltip from '@mui/material/Tooltip';
import {useCookies} from "react-cookie";
import { toast } from 'react-toastify';

const MainView = () => {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const deleteLast = async () => {
        try {
        console.log(cookies.last);
        let url = process.env.REACT_APP_API_URL_GASTOS + '/' + cookies.last;
        const {data} = await axios.delete(url);
        reload();
        } catch (e) {
            toast.error("O último gasto já foi removido");
        }
    }


    const toGo = async () => {
        navigate('/NewGastos');
    }

    const reload = () => {
        window.location.reload(false);
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
                            onClick={deleteLast}
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