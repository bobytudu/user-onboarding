import React from 'react'
import Box from '@mui/material/Box'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { Controller, Control } from "react-hook-form"
import _ from 'lodash'


interface PropTypes {
    control: Control<any>,
    name: string
    label: string
    errors: any
    inputProps?: TextFieldProps
}

const CustomInput = ({ control, name, label, errors, inputProps }: PropTypes) => (
    <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
            <Box sx={{ width: '100%' }}>
                <InputLabel>{label}</InputLabel>
                <TextField
                    value={value}
                    {...inputProps}
                    onChange={e => onChange(e.target.value)}
                    error={Boolean(_.get(errors, name, false))}
                    sx={{ mb: 3, maxWidth: !_.get(inputProps, 'fullWidth', false) ? 400 : "auto", ..._.get(inputProps, 'sx', {}) }}
                    helperText={_.get(errors, `${name}.message`)}
                />
            </Box>
        )}
    />
)

export default CustomInput