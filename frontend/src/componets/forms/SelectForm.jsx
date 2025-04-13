import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import FormHelperText from '@mui/material/FormHelperText';

export default function SelectForm({ 
    label, 
    error, 
    helperText, 
    options, 
    value,
    name, 
    onChange, 
    onBlur 
}) {
    return (
        <FormControl fullWidth error={error}>
            <InputLabel id={`select-label-${label}`}>{label}</InputLabel>
            <Select
                labelId={`select-label-${label}`}
                id={`select-${label}`}
                label={ label }
                value={ value }
                name={ name }
                onChange={ onChange }
                onBlur={ onBlur }
            >
                {options.map((option) => (
                    <MenuItem key={option.id} value={option.id}>
                        {option.name}
                    </MenuItem>
                ))}
            </Select>
            {/* Solo muestra el FormHelperText si hay un error */}
            <FormHelperText error>{helperText}</FormHelperText>
        </FormControl>
    );
}
