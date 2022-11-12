import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';
import { styled } from '@mui/material/styles';
import { useLoadingData } from 'context/LoadingContext';

const StyledBackdrop = styled(Backdrop)(({ theme }) => ({
    color: '#fff',
    zIndex: theme.zIndex.modal + 1
}))

function Loader() {
    const { loading } = useLoadingData()
    return (
        <StyledBackdrop
            open={loading}
        >
            <CircularProgress color="inherit" />
        </StyledBackdrop>
    )
}

export default Loader
