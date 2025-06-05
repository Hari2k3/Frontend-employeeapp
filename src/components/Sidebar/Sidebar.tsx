import "./Sidebar.css"
import employeeIcon from "../../assets/icon.svg"
import logoutIcon from "../../assets/out.png"
import profileicon from "../../assets/profile.png"
import logouticon from "../../assets/out.png"

import { useLocalStorage } from "../../hooks/useLocalStorage"
import { useNavigate } from "react-router-dom"

export const Sidebar = () => {
    const [isLoggedIn, setIsLoggedIn] = useLocalStorage("isLoggedIn", "false")

    const navigate = useNavigate()
    
    const logout = () => {
        setIsLoggedIn("false")
        navigate('/login')
    }

    return (
        <aside className="sidebar">
            <nav className="nav">
                <a className = "nav-button-employees" onClick={()=>navigate('/employees')}>
                    <div className="button-image-employee">
                        <img src={employeeIcon} />
                    </div>
                    <div className="sidebar-label">Employee List</div>   
                </a>    
                <a className = "nav-button-profile" onClick={()=>navigate('/profile')}>
                    <div className="button-image-profile">
                        <img className="img" src={profileicon} />
                    </div>
                   
                    <div className="sidebar-label">Profile</div>   
                </a> 
                <a className = "nav-button-logout" onClick={logout} style={{backgroundColor: "red"}}>
                    <div className="button-image-profile">
                        <img className="img" src={logouticon} />
                    </div>
                    <div className="sidebar-label">Logout</div>   
                </a>
            </nav>  
            
        </aside>
    )
}
