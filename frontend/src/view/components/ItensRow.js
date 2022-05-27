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
import './ItensRow.css';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';

const ItensRow = ({item, fetchItensAxios}) => {

    const navigate = useNavigate();

        const deleteRow = async () => {
            let url = process.env.REACT_APP_API_URL_GASTOS + '/' + item.id;
            await axios.delete(url); 
            fetchItensAxios();
        }

        const editRow = async () => {
            navigate(`/home/new/${item.id}`);
        }

        return (
            <TableRow
                key={item.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
                <TableCell component="th" scope="row" className="lineNome">
                    {item.name}
                </TableCell>
                <TableCell align="right" className="line">{item.description}</TableCell>
                <TableCell align="right" className="line">{item.item_date.substring(0,10)}</TableCell>
                <TableCell align="right" className="lineNome">{item.value}</TableCell>
                <TableCell align="right" className="lineIcons">
                    <IconButton
                        size="large"
                        edge="start"
                        aria-label="events-menu"
                        sx={{ mr: 2 }}
                        id="events-button"
                        className="lineIcons"
                        onClick={editRow}
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

export default ItensRow