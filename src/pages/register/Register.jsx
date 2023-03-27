import axios from "axios";
import { useRef } from "react";
import { useHistory } from "react-router";
import "./register.css"

const Register = () =>{
    const username = useRef();
    const email = useRef();
    const password = useRef();
    const passwordAgain = useRef();
    const history = useHistory();
  //  const password = useRef();
  const handleClick=async(e)=>{
    e.preventDefault();
    if(password.current.value!==passwordAgain.current.value){
        passwordAgain.current.setCustomValidity("Passwords not matched!!!")
    }
    else{
        const user={
            username : username.current.value,
            email : email.current.value,
            password : password.current.value,
            
        };
        try{
            await axios.post("/auth/register", user);
            history.push("/login");
        }catch(err){
            console.log(err)
        }
    }
  };

    return(
        <div className="login">
        <div className="loginWrapper">
            <div className="loginLeft">
                <h3 className="loginLogo">dsaSocial</h3>
                <span className="loginDesc">Lorem ipsum dolor sit amet consectetur adipisicing elit.
                
                  </span>
            </div>
            <div className="loginRight">
                <form className="loginBox" onSubmit={handleClick}>
                    <input placeholder="Username" className="loginInput"  ref={username} required/>
                    <input placeholder="Email" className="loginInput" ref={email} type="email" required/>
                    <input placeholder="Password" className="loginInput" ref={password} required type="password" minLength="6" />
                    <input placeholder="Confirm Password" className="loginInput" ref={passwordAgain} required type="password" minLength="6" />
                    <button className="loginButton" type="submit">Sign Up</button>
                    {/* <span className="loginForgot">Forgot Password</span> */}
                    <button className="loginRegisterButton">
                        Log into Account
                    </button>

                </form>

            </div>
        </div>
    </div>
    )
}
export default Register