import * as React from 'react';
import TextField from '@mui/material/TextField';
import FormHelperText from '@mui/material/FormHelperText';

export default function DescriptionForm({
    label,
    rows,
    value,
    name,
    onChange,
    onBlur,
    error,
    helperText }) {


    return (
        <>
            <TextField sx={{ width: "100%" }}
                id="outlined-multiline-static"
                label={label}
                multiline
                rows={rows}
                value={value}
                name={name}
                onChange={onChange}
                onBlur={onBlur}
                error={error}
                helperText={helperText}
            />
            <FormHelperText>{helperText}</FormHelperText>
        </>
    );
}