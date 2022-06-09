import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TopMenuBar from "./TopMenuBar";
import { Button } from "reactstrap";
import TextField from "@mui/material/TextField";
import "./NewItens.css"
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import { toastContainer, toast } from 'react-toastify';
import { useNavigate, useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff'
      },
      secondary: {
        main: '#11cb5f',
      },
    },
  });

const NewItens = () => {

    const { id } = useParams();
    const [fieldValues, setFieldValues] = useState({});

    const [cookies, setCookie] = useCookies(['user']);

    const navigate = useNavigate();

    const [dateValue, setDateValue] = useState(new Date(Date.now()));

    const handleChange = (e) => {
        setDateValue(e);
    };

    const fetchGasto = async () => {
        try {
            if (id) {
                const { data } = await axios.get(`${process.env.REACT_APP_API_URL_GASTOS}/${id}`);
                setFieldValues({
                    ...fieldValues,
                    name: data.name,
                    description: data.description,
                    value: data.value
                });
                setDateValue(new Date(data.item_date));
            }
        } catch (e) {
            console.log(e);
        }
    }

    const backToMain = async () => {
        navigate('/home')
    }

    const newGasto = async () => {
        let name = fieldValues.name;
        let description = fieldValues.description;
        let value = fieldValues.value;
        let user_id = cookies.userid;
        let item_date = dateValue.toISOString();
        try {
            if (!id) {
                const data = await axios.post(process.env.REACT_APP_API_URL_GASTOS, { name, description, value, user_id, item_date});
                setCookie('last', data.data.id, { path: '/', maxAge: '360000' });
            } else {
                let url = process.env.REACT_APP_API_URL_GASTOS + '/' + id;

                await axios.put(url, { name, description, value, user_id, item_date });
            }
            navigate('/home');
        } catch (e) {
            toast.error("Os campos não foram corretamente preenchidos");
            console.log(e);
        }
    }

    useEffect(() => {
        fetchGasto();
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <div className="card ngcard">
                <h2><b>Cadastrar novo item</b></h2>
                <TextField
                    className="textField"
                    id="name"
                    value={fieldValues.name}
                    label="Nome"
                    InputLabelProps={{ shrink: true }}
                    variant="outlined"
                    sx={{label: {color:'white'},
                         input: {color:'white'}
                        }}
                    type="text"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, name: e.target.value });
                    }}
                />
                <TextField
                    className="textField"
                    id="description"
                    value={fieldValues.description}
                    InputLabelProps={{ shrink: true }}
                    label="Descrição"
                    sx={{label: {color:'white'},
                         input: {color:'white'}
                        }}
                    variant="outlined"
                    type="text"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, description: e.target.value });
                    }}
                />
                <TextField
                    className="textField"
                    id="value"
                    value={fieldValues.value}
                    InputLabelProps={{ shrink: true }}
                    label="Valor"
                    sx={{label: {color:'white'},
                         input: {color:'white'}
                        }}
                    variant="outlined"
                    Input type="number"
                    onChange={(e) => {
                        setFieldValues({ ...fieldValues, value: e.target.value });
                    }}
                />
                <div className="dateField">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Data"
                                inputFormat="dd/MM/yyyy"
                                value={dateValue}
                                InputLabelProps={{ shrink: true }}
                                onChange={(e) => handleChange(e)}
                                renderInput={(params) => <TextField {...params} sx={{
                                    svg: { color:'white' },
                                    input: { color:'white' },
                                    label: { color:'white' }
                            }}/>}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
                <Button className="signupButton outlinedButton filledButtonCreate" variant="contained" onClick={newGasto}>
                    Cadastrar
                </Button>
                <Button className="signupButton outlinedButton filledButtonVoltar" variant="outlined" onClick={backToMain}>
                    Voltar
                </Button>
            </div>
        </ThemeProvider>
    );

}

export default NewItens
