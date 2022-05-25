import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from "@mui/material/TextField";
import { Button } from "reactstrap";
import './FilterDialog.css';

const FilterDialog = () => {

    const [dateValueMin, setDateValueMin] = useState(new Date(Date.now()-7));
    const [dateValueMax, setDateValueMax] = useState(new Date(Date.now()));

    const handleChangeMin = (e) => {
        setDateValueMin(e);
    };

    const handleChangeMax = (e) => {
        setDateValueMax(e);
    };

    return (

        <div className="outsideFilter">
            <div className="filterDateFieldMin">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Menor data"
                                inputFormat="dd/MM/yyyy"
                                value={dateValueMin}
                                className="datePicker"
                                onChange={(e) => handleChangeMin(e)}
                                renderInput={(params) => <TextField {...params} sx={{
                                        svg: { color:'white' },
                                        input: { color:'white' },
                                        label: { color:'white' }
                                }}/>}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
            <div className="filterDateFieldMax">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <Stack spacing={3}>
                            <DesktopDatePicker
                                label="Maior data"
                                inputFormat="dd/MM/yyyy"
                                value={dateValueMax}
                                onChange={(e) => handleChangeMax(e)}
                                renderInput={(params) => <TextField {...params} sx={{
                                    svg: { color:'white' },
                                    input: { color:'white' },
                                    label: { color:'white' }
                            }}/>}
                            />
                        </Stack>
                    </LocalizationProvider>
                </div>
                <Button className="filterButton filledButtonCreate" variant="contained" onClick={console.log("w")}>
                        Filtrar
                    </Button>
        </div>

    );
}

export default FilterDialog;