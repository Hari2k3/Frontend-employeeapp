import "./FormHeaderButton.css"
import edit from "../../assets/edit.png"

interface Props {
    type: "Edit" | "Create";
    onclick?: () => void;   
}

export const FormHeaderButton = (props: Props) => {
    return (
         <button className='form-header-button' onClick={props.onclick}>
            <div className='form-header-button-icon'>
               { (props.type==="Edit") && <img src={edit}></img> }
                { (props.type==="Create") && <p>+</p> }
            </div>
            <div className='form-header-button-text'>{props.type} Employee</div>
        </button>
    )
}