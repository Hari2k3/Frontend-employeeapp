// import { LoginLeftPanel } from "../../containers/login-left-container/LoginLeftPanel"
import LoginLeftPanel from "../../containers/login-left-container/LoginLeftPanel"
// import { LoginRightPanel } from "../../containers/login.right.container/LoginRightPanel"
import LoginRightPanel from "../../containers/login.right.container/LoginRightPanel"
import { UncontrolledLogin } from "../../containers/login.right.container/UncontrolledLogin"
import "./Login.css"

const Login= () => {

    return (
        <div className="container">
            <LoginLeftPanel/>
            <LoginRightPanel/>
            {/* <UncontrolledLogin/> */}
        </div>
    )
}
export default Login;