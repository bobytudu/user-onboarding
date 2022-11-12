import React, { useEffect } from 'react'

export default function useLocalStorage(key: string) {
    const [data, setData] = React.useState(null);

    useEffect(() => {
        const localData = localStorage.getItem(key)
        if (localData) setData(JSON.parse(localData))
    }, [key]);

    return data
}
