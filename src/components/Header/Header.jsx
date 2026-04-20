import logo from '/favicon.svg'
import './Header.css'
import MyButton from '../MyButton/MyButton'
function Header({toggleTheme, themeType}){
    
    const buttonText = themeType === 'dark' ? 'Light' : 'Dark';
    const onToggle = () =>{
        toggleTheme();
    }
    return(
        <header>
            <img src={logo} alt="" />
            <h1>Todo App</h1>
            <MyButton onClick={onToggle}>
                 {buttonText}
            </MyButton>
        </header>
    )
}

export default Header