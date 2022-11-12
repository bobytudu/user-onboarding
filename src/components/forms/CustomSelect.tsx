
import React from 'react';
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Typography from '@mui/material/Typography'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import _ from 'lodash'
import { Controller, Control } from "react-hook-form";

interface PropTypes {
    control: Control<any>,
    name: string
    label: string
    errors: any
    inputProps?: TextFieldProps
    options: { label: string, value: string }[]
}

export default function CustomSelect({ control, name, label, errors, inputProps, options }: PropTypes) {
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <Box sx={{ width: '100%' }}>
                    <InputLabel>{label}</InputLabel>
                    <TextField
                        select
                        value={value}
                        {...inputProps}
                        onChange={e => onChange(e.target.value)}
                        error={Boolean(_.get(errors, name, false))}
                        sx={{ mb: 3, maxWidth: !_.get(inputProps, 'fullWidth', false) ? 400 : "auto", ..._.get(inputProps, 'sx', {}) }}
                        helperText={_.get(errors, `${name}.message`)}
                    >
                        {options.map(({ label, value }, idx) => (
                            <MenuItem value={value} key={idx}>
                                <Typography variant="subtitle2" color="inherit">
                                    {label}
                                </Typography>
                            </MenuItem>
                        ))}
                    </TextField>
                </Box>
            )}
        />
    )
};
