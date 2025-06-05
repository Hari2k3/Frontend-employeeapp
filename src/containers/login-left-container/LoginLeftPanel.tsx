import LoginPageImage from "../../assets/kv-login.jpeg"
import './LoginLeftPanel.css'
const LoginLeftPanel = () => {
    return (
        <div className="image-div">
            <div className="circle">
                <img className="circle-logo" src={LoginPageImage}/>
            </div>
        </div>
    )
}

export default LoginLeftPanel;