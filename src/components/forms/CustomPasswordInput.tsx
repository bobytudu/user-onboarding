import React, { useState } from 'react';
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import TextField, { TextFieldProps } from '@mui/material/TextField'
import InputLabel from '@mui/material/InputLabel'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Controller, Control } from "react-hook-form"
import _ from 'lodash'

interface PropTypes {
    control: Control<any>,
    name: string
    label: string
    errors: any
    inputProps?: TextFieldProps
}

export default function CustomPasswordInput({
    control,
    name,
    inputProps = {},
    label,
    errors
}: PropTypes) {
    const [showPassword, setShowPassword] = useState(false)
    const handleClickShowPassword = () => setShowPassword(!showPassword);
    return (
        <Controller
            control={control}
            name={name}
            render={({ field: { value, onChange } }) => (
                <Box sx={{ width: '100%' }}>
                    <InputLabel>{label}</InputLabel>
                    <TextField
                        type={showPassword ? "text" : "password"}
                        value={value}
                        {...inputProps}
                        InputProps={{
                            endAdornment: (
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        edge="end"
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            ),
                        }}
                        onChange={e => onChange(e.target.value)}
                        error={Boolean(_.get(errors, name, false))}
                        sx={{ mb: 3, maxWidth: !_.get(inputProps, 'fullWidth', false) ? 400 : "auto", ..._.get(inputProps, 'sx', {}) }}
                        helperText={_.get(errors, `${name}.message`)}
                    />
                </Box>
            )}
        />
    )
};