import './Home.css';
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

const Home = () => {

    const navigate = useNavigate();
    const [cookies, setCookie] = useCookies(['user']);

    const deleteLast = async () => {
        try {
        console.log(cookies.last);
        let url = process.env.REACT_APP_API_URL_GASTOS + '/' + cookies.last;
        await axios.delete(url);
        } catch (e) {
            toast.error("O último gasto já foi removido");
        }
    }


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
                        <TableGastos/>
                    </div>
                </div>
            </div>
        );
}

export default Home;