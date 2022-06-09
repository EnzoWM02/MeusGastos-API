import React, { useState } from 'react';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import Stack from '@mui/material/Stack';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import TextField from "@mui/material/TextField";
import { Button } from "reactstrap";
import './FilterDialog.css';

const FilterDialog = ({filter, applyFilter, handleCloseFilter}) => {

    const [dateValueMin, setDateValueMin] = useState(filter.dateValueMin ? filter.dateValueMin : new Date(Date.now()));
    const [dateValueMax, setDateValueMax] = useState(filter.dateValueMax ? filter.dateValueMax : new Date(Date.now()));

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
                <Button className="filterButton filledButtonCreate" variant="contained" onClick={() => {
                    applyFilter({dateValueMin, dateValueMax});
                    handleCloseFilter();
                }
                }> 
                        Filtrar
                    </Button>
        </div>

    );
}

export default FilterDialog;