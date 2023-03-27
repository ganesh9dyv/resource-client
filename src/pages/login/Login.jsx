import { useContext, useRef } from "react";
import "./login.css"
import {loginCall} from "../../apiCalls"
import { AuthContext } from "../../context/AuthContext";
import {CircularProgress} from "@material-ui/core";

const Login = () =>{
    const email = useRef();
    const password = useRef();
    const {isFetching,dispatch}=useContext(AuthContext)

    const handleClick=(e)=>{
        e.preventDefault();
        console.log(email.current.value); 
        loginCall({email:email.current.value,password:password.current.value}, dispatch);
    }; 
    // console.log(user)
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
                        <input placeholder="Email" required type="email" className="loginInput" ref={email}/>
                        <input placeholder="Password" required minLength="6" type="password" className="loginInput" ref={password}/>
                        {/* <CircularProgress color="white" size="20px"/>   """Login ho raha haaa""" */}
                        <button className="loginButton" type="submit" disabled={isFetching}>{isFetching? (<CircularProgress color="white" size="20px"/>):("Login in")}</button>
                        <span className="loginForgot">Forgot Password</span>
                        <button className="loginRegisterButton" disabled={isFetching}>{isFetching? (<CircularProgress color="white" size="20px"/>):("Create new Account")}
                        </button>

                    </form>

                </div>
            </div>
        </div>
    )
}
export default Login