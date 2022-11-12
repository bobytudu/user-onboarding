import React, { useState } from 'react'
import Paper from '@mui/material/Paper'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useForm } from 'react-hook-form'
import { auth } from 'firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import CustomPasswordInput from 'components/forms/CustomPasswordInput'
import CustomInput from 'components/forms/CustomInput'

import { Typography } from '@mui/material'
import { useLoadingData } from 'context/LoadingContext'
import { useSnackData } from 'context/SnackContext'
import DetailDialog from './components/DetailDialog'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

interface FormValues {
    email: string
    password: string
}
const validationSchema = yup.object({
    email: yup.string().email("should be valid email").required(),
    password: yup.string().min(4, 'min 4 character is required').required()
})

export default function AddUser() {
    const { setLoading } = useLoadingData()
    const [openDialog, setOpenDialog] = useState(false)
    const { openError, openSuccess } = useSnackData()
    const { control, handleSubmit, formState: { errors } } = useForm<FormValues>({
        defaultValues: {
            email: "",
            password: ""
        },
        resolver: yupResolver(validationSchema)
    });
    const closeDialog = () => setOpenDialog(false)
    async function onSubmit(values: FormValues) {
        setLoading(true)
        try {
            const { user } = await createUserWithEmailAndPassword(auth, values.email, values.password)
            if (user) {
                console.log(user)
                openSuccess(`user with email: ${values.email} created successfully`)
                localStorage.setItem("userdata", JSON.stringify(user))
                setOpenDialog(true)
            }
        } catch (error: any) {
            var errorCode = error.code;
            var errorMessage = error.message;
            if (errorCode === 'auth/weak-password') {
                openError('The password is too weak.');
            } else {
                openError(errorMessage);
            }
            console.log(error);
        }

        setLoading(false)
    }

    React.useEffect(() => {
        if (localStorage.getItem('userdata')) setOpenDialog(true)
    }, [])


    return (
        <Box display="flex" flexDirection='column' justifyContent='center' height="100vh" width="100%">
            {openDialog && <DetailDialog open onClose={closeDialog} />}
            <Paper sx={{
                p: 3,
                width: { sm: "100%", md: "40%", lg: "30%" },
                // textAlign: 'center',
                m: "auto"
            }}>
                <Typography variant="h3" sx={{ textAlign: 'center' }}>Add User</Typography>
                <CustomInput control={control} name='email' inputProps={{ fullWidth: true }} label="Email" errors={errors} />
                <CustomPasswordInput control={control} name='password' inputProps={{ fullWidth: true }} label="Password" errors={errors} />
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Box>
            </Paper>
        </Box>
    )
}
