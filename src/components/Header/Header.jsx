import logo from '/favicon.svg'
import './Header.css'
function Header(){
    return(
        <header>
            <img src={logo} alt="" />
            <h1>Todo App</h1>
        </header>
    )
}

export default Header