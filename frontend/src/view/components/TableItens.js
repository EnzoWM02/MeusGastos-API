import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ItensRow from '../components/ItensRow';
import Tooltip from '@mui/material/Tooltip';
import { useCookies } from "react-cookie";
import { toast } from 'react-toastify';
import { useNavigate } from "react-router-dom";
import { Button } from 'reactstrap';
import './TableItens.css';
import axios from 'axios';


const TableItens = () => {

    const [itens, setItens] = useState([]);
    const [total, setTotal] = useState(0);

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
        navigate('/home/new');
    }

    async function fetchItensAxios() {
        try {
            const { data: response } = await axios.get(process.env.REACT_APP_API_URL_GASTOS);
            setItens(response);
            let total = 0;
            response.map(function (key, index) {
                total += response[index].value;
            })
            setTotal(total);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchItensAxios();
    }, [itens]);

    return (
        <>
            <div className="outside">
                <div className="TableItens">
                    <Button className="createButton filledButton" variant="contained" onClick={toGo}>
                        Cadastrar novo item
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
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} aria-label="simple table">
                            <TableHead>
                                <TableRow>
                                    <TableCell><b>Nome</b></TableCell>
                                    <TableCell align="left"><b>Descrição</b></TableCell>
                                    <TableCell align="right"><b>Valor</b></TableCell>
                                    <TableCell align="right"></TableCell>
                                    <TableCell align="right"></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {itens.map(function (key, index) {
                                    if (itens[index].user_id == cookies.userid) {
                                    return <ItensRow key={index} item={itens[index]} />;
                                    }
                                })}
                                <TableRow
                                    key={total}
                                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                    <TableCell component="th" scope="row">

                                    </TableCell>
                                    <TableCell align="left"><b>Total</b></TableCell>
                                    <TableCell align="right">{total}</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </div>
        </>


    );
};

export default TableItens;