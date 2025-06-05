import logo from '../../assets/kv-logo.png'
import './Header.css'

export const Header = () => {
    return (
        <header>
            <div className="header-bar">
                <img id="logo" src={logo}/>
            </div>
        </header>
    )
}