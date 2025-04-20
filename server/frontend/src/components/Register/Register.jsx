import React, { useState } from "react";
import "./Register.css";
import user_icon from "../assets/person.png"
import email_icon from "../assets/email.png"
import password_icon from "../assets/password.png"
import close_icon from "../assets/close.png"

const Register = () => {

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setlastName] = useState("");


  const gohome = ()=> {
    window.location.href = window.location.origin;
  }

  const register = async (e) => {
    e.preventDefault();

    let register_url = window.location.origin+"/djangoapp/register";
    
    const res = await fetch(register_url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            "userName": userName,
            "password": password,
            "firstName":firstName,
            "lastName":lastName,
            "email":email
        }),
    });

    const json = await res.json();
    if (json.status) {
        sessionStorage.setItem('username', json.userName);
        window.location.href = window.location.origin;
    }
    else if (json.error === "Already Registered") {
      alert("The user with same username is already registered");
      window.location.href = window.location.origin;
    }
};

  return(
    <div className="register_container" style={{ width: "40%", margin:"auto", padding: "2rem", borderRadius: "10px", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", backgroundColor: "#bcbcbc" }}>
        <div className="header" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
            <h2 className="text" style={{ margin: 0, fontSize: "2rem", color: "#333" }}>Sign Up</h2>
            <a href="/" onClick={(e) => { e.preventDefault(); gohome(); }} style={{ textDecoration: "none" }}>
                <img style={{ width: "2rem", cursor: "pointer" }} src={close_icon} alt="Close" />
            </a>
        </div>
        <hr style={{ border: "none", borderTop: "1px solid #ddd", marginBottom: "1.5rem" }} />

        <form onSubmit={register}>
            <div className="inputs" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={user_icon} className="img_icon" alt="Username" style={{ width: "3rem" }} />
                    <input type="text" name="username" placeholder="Username" className="input_field" style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setUserName(e.target.value)} />
                </div>
                <div className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={user_icon} className="img_icon" alt="First Name" style={{ width: "3rem" }} />
                    <input type="text" name="first_name" placeholder="First Name" className="input_field" style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setFirstName(e.target.value)} />
                </div>
                <div className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={user_icon} className="img_icon" alt="Last Name" style={{ width: "3rem" }} />
                    <input type="text" name="last_name" placeholder="Last Name" className="input_field" style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setlastName(e.target.value)} />
                </div>
                <div className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={email_icon} className="img_icon" alt="Email" style={{ width: "3rem" }} />
                    <input type="email" name="email" placeholder="Email" className="input_field" style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div className="input" style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <img src={password_icon} className="img_icon" alt="Password" style={{ width: "3rem" }} />
                    <input name="psw" type="password" placeholder="Password" className="input_field" style={{ flex: 1, padding: "0.5rem", borderRadius: "5px", border: "1px solid #ccc" }} onChange={(e) => setPassword(e.target.value)} />
                </div>
            </div>
            <div className="submit_panel" style={{ marginTop: "1.5rem", textAlign: "center" }}>
                <input className="submit" type="submit" value="Register" style={{ padding: "0.75rem 1.5rem", borderRadius: "5px", border: "none", backgroundColor: "#007BFF", color: "#fff", fontSize: "1rem", cursor: "pointer" }} />
            </div>
        </form>
    </div>
  )
}

export default Register;