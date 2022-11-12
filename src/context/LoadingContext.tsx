
import React from 'react'
import { createContext, useContext, useMemo, useState } from 'react'
interface LoadingContextInterface {
    loading: LoaderTypes,
    setLoading: React.Dispatch<React.SetStateAction<LoaderTypes>>
}

type LoaderTypes = boolean

const initialState = {} as LoadingContextInterface

const LoadingContext = createContext<LoadingContextInterface>(initialState)

export const useLoadingData = () => useContext(LoadingContext)

const LoadingContextProvider = ({ children }: { children: React.ReactNode }) => {
    const [loading, setLoading] = useState<LoaderTypes>(false)

    const contextValue = useMemo(
        () => ({ loading, setLoading }),
        [loading, setLoading]
    )

    return (
        <LoadingContext.Provider value={contextValue}>{children}</LoadingContext.Provider>
    )
}

export default LoadingContextProvider