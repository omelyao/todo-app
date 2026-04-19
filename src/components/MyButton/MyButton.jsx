import './MyButton.css'

const MyButton = function({children, ...props}){
    return(
        <button {...props} className="myBtn">
            {children}
        </button>
    )
}

export default MyButton