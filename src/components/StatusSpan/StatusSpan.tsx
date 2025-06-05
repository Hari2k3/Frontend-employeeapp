import "./StatusSpan.css"

export const StatusSpan = ({status} : {status : string}) => {
    return (
        <span className={`span ${status.toLowerCase()}`}>{status}</span>
    )
}