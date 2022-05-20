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
import './TableGastos.css';
import axios from 'axios';

const GastosRow = ({gasto}) => {

        const deleteRow = async () => {
            let url = process.env.REACT_APP_API_URL_GASTOS + '/' + gasto.id;
            await axios.delete(url); 
        }

        return (
            <TableRow
                key={gasto.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" className="lineNome">
                    {gasto.name}
                </TableCell>
                <TableCell align="right" className="line">{gasto.description}</TableCell>
                <TableCell align="right" className="lineNome">{gasto.value}</TableCell>
                <TableCell align="right" className="lineIcons">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="events-menu"
                        sx={{ mr: 2 }}
                        id="events-button"
                        className="lineIcons"
                    //onClick={deleteLast}
                    >
                        <EditIcon />
                    </IconButton>
                </TableCell>
                <TableCell align="right" className="lineIcons">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="events-menu"
                        sx={{ mr: 2 }}
                        id="events-button"
                        className="lineIcons"
                        onClick={deleteRow}
                    >
                        <DeleteIcon />
                    </IconButton>
                </TableCell>
            </TableRow>
        );

}

export default GastosRow