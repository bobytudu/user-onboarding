import React from "react";
import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar'
import { useSnackData } from "context/SnackContext";

function SnacbarComponent() {
    const { snack, setSnack } = useSnackData();
    const closeSnack = () => setSnack({ type: "error", text: '', open: false })
    return (
        <Snackbar
            anchorOrigin={{
                vertical: "top",
                horizontal: "right",
            }}
            open={snack.open}
            autoHideDuration={5000}
            onClose={closeSnack}
        >
            <Alert variant="filled"
                severity={snack.type === 'success' ? "success" : "error"}
                sx={{ width: "100%" }}
                onClose={closeSnack}>
                {snack.text}
            </Alert>
        </Snackbar>
    );
}

export default SnacbarComponent;
