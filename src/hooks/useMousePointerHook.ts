import { useEffect, useState, } from "react"

const useMousePointer = () => {
    const [ coordinates, setCoordinates] = useState({x:0, y:0});
    // const [ x, setX ] = useState(0);
    // const [ y, setY ] = useState(0);

    useEffect(() => {
        const handleMouseMovement = (event: MouseEvent) => {
            setCoordinates({x: event.clientX, y: event.clientY})

        }

        window.addEventListener('mousemove', handleMouseMovement)

        return (() => {
            window.removeEventListener('mousemove',handleMouseMovement)
        })
    },[])

    

    return [coordinates];
}


export default useMousePointer;