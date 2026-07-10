import './Button.css'
const Button = ({text, onClick}) => {
  return (
    <div>
      <button 
      type="submit"
      className="custom-button"
      onClick={onClick} 
      >
        {text}
      </button>
    </div>
  )
}

export default Button