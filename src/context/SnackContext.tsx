
import React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
interface SnackContextInterface {
    snack: SnackTypes,
    setSnack: React.Dispatch<React.SetStateAction<SnackTypes>>
    openSuccess: (text: string) => void
    openError: (text: string) => void
}

type SnackTypes = {
    open: boolean,
    type: "success" | "error",
    text: string
}

const initialState = {} as SnackContextInterface

const SnackContext = createContext<SnackContextInterface>(initialState)

export const useSnackData = () => useContext(SnackContext)

const SnackContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [snack, setSnack] = useState<SnackTypes>({
        open: false,
        type: 'success',
        text: ''
    })

    const openSuccess = (text: string) => setSnack({ type: "success", open: true, text })
    const openError = (text: string) => setSnack({ type: "error", open: true, text })

    const contextValue = useMemo(
        () => ({ snack, setSnack, openSuccess, openError }),
        [snack, setSnack]
    )

    return (
        <SnackContext.Provider value={contextValue}>{children}</SnackContext.Provider>
    )
}

export default SnackContextProvider