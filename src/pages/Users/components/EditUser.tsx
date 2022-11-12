import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import Divider from '@mui/material/Divider'
import { DialogContent, DialogTitle } from '@mui/material'
import { useForm } from 'react-hook-form'
import CustomInput from 'components/forms/CustomInput'
import CustomSelect from 'components/forms/CustomSelect'
import { useLoadingData } from 'context/LoadingContext'
import { useSnackData } from 'context/SnackContext'
import { setDoc, doc } from 'firebase/firestore'
import { db } from 'firebaseConfig'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import _ from 'lodash'

interface PropTypes {
    open: boolean
    onClose: () => void
    editData: FormValues | null
}
interface FormValues {
    email: string
    name: string
    org: string
    role: string
    uid: string
}

const validationSchema = yup.object({
    email: yup.string().email("should be valid email").required(),
    name: yup.string().required(),
    org: yup.string().required(),
    role: yup.string().required()
})


export default function EditUser(props: PropTypes) {
    const { setLoading } = useLoadingData()
    const { openError, openSuccess } = useSnackData()
    const { control, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
        defaultValues: {
            email: "",
            name: "",
            org: "",
            role: 'user'
        },
        resolver: yupResolver(validationSchema)
    });

    React.useEffect(() => {
        if (props.editData) {
            reset(props.editData)
        }
    }, [props.editData, reset])

    async function onSubmit(values: FormValues) {
        setLoading(true)
        try {
            await setDoc(doc(db, 'users', _.get(props, "editData.uid", '')), { ...values, uid: _.get(props, "editData.uid", '') })
            openSuccess("user data updated successfully")
            props.onClose()
        } catch (error: any) {
            openError(error.message)
        }
        setLoading(false)
    }

    return (
        <Dialog open={props.open} maxWidth='sm' fullWidth>
            <DialogTitle sx={{ fontSize: 18 }}>update User Details for {_.get(props, "editData.email", '')}</DialogTitle>
            <Divider />
            <DialogContent>
                <CustomInput inputProps={{ fullWidth: true }} control={control} name='email' label="Email" errors={errors} />
                <CustomInput inputProps={{ fullWidth: true }} control={control} name='name' label="Name" errors={errors} />
                <CustomInput inputProps={{ fullWidth: true }} control={control} name='org' label="Org" errors={errors} />
                <CustomSelect inputProps={{ fullWidth: true }} control={control} name='role' label="Role" options={[{ label: 'User', value: "user" }, { label: "Member", value: "member" }]} errors={errors} />
                <Box display='flex' justifyContent='flex-end'>
                    <Button variant="contained" onClick={handleSubmit(onSubmit)}>Submit</Button>
                </Box>
            </DialogContent>
        </Dialog>
    )
}
