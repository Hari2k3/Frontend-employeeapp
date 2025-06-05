import { useEffect, useState } from "react"

export const useLocalStorage = (key: string, defaultValue: string) : [string, (value: string) => void] => {
    const [data, setData] = useState(defaultValue)


    useEffect(() => {
        const value = localStorage.getItem(key)

        if (value) setData(value)
    }, [])

    const setToLocalStorage = (value: string) => {
        setData(value)
        localStorage.setItem(key, value)
    }

    return [data, setToLocalStorage];
}