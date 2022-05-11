import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import './TableGastos.css';
import axios from 'axios';

function createData(nome, desc, valor) {
    return {nome, desc, valor};
}

const TableGastos = () => {

    const [gastos, setGastos] = useState([]);
    const [total, setTotal] = useState(0);

    async function fetchGastosAxios () {
        try {
            const {data:response} = await axios.get(process.env.REACT_APP_API_URL_GASTOS);
            setGastos(response);
            let total = 0;
            response.map(function(key, index) {
                total += response[index].value;
            })
            setTotal(total);
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        fetchGastosAxios();
    }, []);

    return (
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 650}} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell><b>Nome</b></TableCell>
                            <TableCell align="right"><b>Descrição</b></TableCell>
                            <TableCell align="right"><b>Valor</b></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {gastos.map(function(key, index) {
                            return (
                            <TableRow
                                key={gastos[index].name}
                                sx={{'&:last-child td, &:last-child th': {border: 0}}}
                            >
                                <TableCell component="th" scope="row">
                                    {gastos[index].name}
                                </TableCell>
                                <TableCell align="right">{gastos[index].description}</TableCell>
                                <TableCell align="right">{gastos[index].value}</TableCell>
                            </TableRow>
                            );
                        })}
                        <TableRow
                            key={total}
                            sx={{'&:last-child td, &:last-child th': {border: 0}}}
                        >
                            <TableCell component="th" scope="row">

                            </TableCell>
                            <TableCell align="right"><b>Total</b></TableCell>
                            <TableCell align="right">{total}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
    );
};

export default TableGastos;