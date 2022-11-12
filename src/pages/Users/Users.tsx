import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/Delete'
import MaterialTable, { MTableToolbar } from '@material-table/core'
import { ExportCsv, ExportPdf } from '@material-table/exporters';
import { query, collection, DocumentData, onSnapshot, deleteDoc, doc } from "firebase/firestore";
import { db } from 'firebaseConfig'
import { useNavigate } from 'react-router-dom'
import EditUser from './components/EditUser'
import { useSnackData } from 'context/SnackContext'
interface FormValues {
    email: string
    name: string
    org: string
    role: string
    uid: string
}

export default function User() {
    const navigate = useNavigate();
    const { openError, openSuccess } = useSnackData()
    const [editData, setEditData] = React.useState<FormValues | null>(null)
    const [data, setData] = React.useState<DocumentData[]>([]);
    React.useEffect(() => {
        const q = query(collection(db, "users"));
        onSnapshot(q, (querySnapshot) => {
            const documents = querySnapshot.docs.map(doc => {
                return { ...doc.data(), uid: doc.id }
            })
            setData(documents)
        });
    }, []);

    async function removeUser(id: string) {
        try {
            await deleteDoc(doc(db, "users", id));
            openSuccess("user data updated successfully")
        } catch (error: any) {
            openError(error.message)
        }
    }

    return (
        <Box p={5}>
            <EditUser editData={editData} open={Boolean(editData)} onClose={() => setEditData(null)} />
            <Button variant='contained' sx={{ mb: 2 }} onClick={() => navigate('/add-user')}>Create user</Button>
            <MaterialTable
                data={data}
                title={<Typography variant="h3">All Users</Typography>}
                columns={[
                    { title: "Name", field: "name", render: (data) => <Typography variant="h6">{data.name}</Typography> },
                    { title: "email", field: "email", render: (data) => <Typography variant="h6">{data.email}</Typography> },
                    { title: "Role", field: "role", render: (data) => <Typography variant="h6">{data.role}</Typography> },
                    { title: "Org", field: "org", render: (data) => <Typography variant="h6">{data.org}</Typography> },
                    { title: "Uid", field: "uid", render: (data) => <Typography variant="h6">{data.uid}</Typography> },
                ]}
                options={{
                    searchFieldVariant: "outlined",
                    pageSize: 10,
                    exportAllData: true,
                    exportMenu: [{
                        label: 'Export PDF',
                        exportFunc: (cols, datas) => ExportPdf(cols, datas, 'myPdfFileName')
                    }, {
                        label: 'Export CSV',
                        exportFunc: (cols, datas) => ExportCsv(cols, datas, 'myCsvFileName')
                    }],
                    columnsButton: true,
                    actionsColumnIndex: -1
                }}
                actions={[
                    {
                        icon: EditIcon,
                        tooltip: 'Edit user',
                        onClick: (event, rowData: any) => {
                            if (!rowData.uid) return alert('Not editable')
                            if (rowData.uid) return setEditData(rowData)
                        }
                    },
                    {
                        icon: DeleteIcon,
                        tooltip: 'Delete user',
                        onClick: async (event, rowData: any) => {
                            if (!rowData.uid) return alert('Not deletable')
                            if (rowData.uid) return removeUser(rowData.uid)
                        }
                    },
                ]}
                components={{
                    Toolbar: data => (
                        <Box p={2}>
                            <MTableToolbar {...data} />
                        </Box>
                    )
                }}
            />
        </Box>
    )
}
