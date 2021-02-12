import React, { useState } from "react";
import {connect} from 'react-redux';
import "../App.css";
import { Input, Button } from "antd";
import Icon from "@ant-design/icons";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Link } from "react-router-dom";

function ScreenHome(props) {
  const [isLogin, setIsLogin] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [pseudo, setPseudo] = useState("");
  const [pseudoSI, setPseudoSI] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordSI, setPasswordSI] = useState("");

  var handleSubmitSignUp = async () => {
    console.log(firstName, lastName, pseudo, email, password);
    let rawresponsesbmt = await fetch("/sign-up", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `firstName=${firstName}&lastName=${lastName}&pseudo=${pseudo}&email=${email}&password=${password}`,
    });
    let responsesbmt = await rawresponsesbmt.json()
    if(responsesbmt.login == true){
      console.log(responsesbmt.token)
      props.addToken(responsesbmt.token)
      setIsLogin(true)
    }else{
      alert('Cet utilisateur existe déjà! veuillez utiliser une autre adresse ou un pseudo différent.')
    }
    

  };
  var handleSubmitSignIn = async () => {
    console.log(pseudoSI, passwordSI)
    let rawresponse = await fetch("/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `pseudo=${pseudoSI}&password=${passwordSI}`,
    });
    let response = await rawresponse.json()
    
    if(response.login==true){
      console.log(response.token)
      props.addToken(response.token)
      setIsLogin(true)
    }else{
      alert("Cet utilisateur n'existe pas! Adresse ou mot de passe incorrect. Si vous n'avez pas de compte veuillez en créer un.")
    }
  };

  if (isLogin!== true) {
    return (
      <div className="Login-page">
        {/* SIGN-UP */}

        <div className="Sign">
          <Input
            className="Login-input"
            placeholder="John"
            onChange={(e) => setFirstName(e.target.value)}
            value={firstName}
          />
          <Input
            className="Login-input"
            placeholder="Doe"
            onChange={(f) => setLastName(f.target.value)}
            value={lastName}
          />
          <Input
            className="Login-input"
            placeholder="johndoe92"
            onChange={(g) => setPseudo(g.target.value)}
            value={pseudo}
          />
          <Input
            className="Login-input"
            placeholder="johndoe@lacapsule.academy"
            onChange={(h) => setEmail(h.target.value)}
            value={email}
          />

          <Input.Password
            className="Login-input"
            placeholder="password"
            onChange={(j) => setPassword(j.target.value)}
            value={password}
          />

          {/* <Link to="/source"> */}
          <Button
            style={{ width: "80px" }}
            type="primary"
            onClick={() => handleSubmitSignUp()}
          >
            Sign-up
          </Button>
          {/* </Link> */}
        </div>

        {/* SIGN-IN */}

        <div className="Sign">
          <Input className="Login-input" placeholder="Pseudo"  onChange={(g) => setPseudoSI(g.target.value)}
            value={pseudoSI}/>

          <Input.Password className="Login-input" placeholder="password" onChange={(e) => setPasswordSI(e.target.value)}
            value={passwordSI}/>

          <Button
            style={{ width: "80px" }}
            type="primary"
            onClick={() => handleSubmitSignIn()}
          >
            Sign-in
          </Button>
        </div>
      </div>
    );
  } else {
    return(
    <Redirect to='/source' />
  )}
}

function mapDispatchToProps(dispatch) {
  return {
    addToken: function(token) { 
        dispatch( {type: 'addToken',
        token: token
                          }) 
                          
    }
  }
}





export default connect(
  null,
  mapDispatchToProps
)(ScreenHome);
