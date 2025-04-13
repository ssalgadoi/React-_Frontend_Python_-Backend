import * as React from 'react';
import Box from '@mui/material/Box';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Chip from '@mui/material/Chip';
import FormHelperText from '@mui/material/FormHelperText';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

export default function MultiSelectForm({
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
        <div>
            <FormControl sx={{ width: "100%" }} error={error}>
                <InputLabel id="demo-multiple-chip-label">{label}</InputLabel>
                <Select
                    labelId="demo-multiple-chip-label"
                    id="demo-multiple-chip"
                    multiple
                    value={value || []}  // Asegúrate de que sea un array vacío si no hay valor
                    name={name}
                    onChange={onChange}
                    onBlur={onBlur}
                    input={<OutlinedInput id="select-multiple-chip" label={label} />}
                    renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                            {(selected || []).map((value) => (
                                <Chip
                                    key={value}
                                    label={options.find((option) => option.id === value)?.name || value}
                                />
                            ))}
                        </Box>
                    )}
                    MenuProps={MenuProps}
                >
                    {options.map((option) => (
                        <MenuItem key={option.id} value={option.id}>
                            {option.name}
                        </MenuItem>
                    ))}
                </Select>
                {/* Solo se muestra FormHelperText si hay error y helperText */}
                <FormHelperText error>{helperText}</FormHelperText>
            </FormControl>
        </div>
    );
}
