import React, { useState } from "react";
import { Container, Image } from "semantic-ui-react";
import RegisterForm from "../../component/Auth/RegisterForm";
import LoginForm from "../../component/Auth/LoginForm";
import instaclone from "../../assets/png/instaclone.png";
import "./Auth.scss";

export default function Auth() {
  const [showLogin, setShowLogin] = useState(true);

  return (
    <Container fluid className="auth">
      {/* <Image src={instaclone} /> */}
      <h1>BUILDER ON HOME</h1>

      <div className="container-form">
        {showLogin ? (
          <LoginForm />
        ) : (
          <RegisterForm setShowLogin={setShowLogin} />
        )}
      </div>

      <div className="change-form">
        <p>
          {showLogin ? (
            <>
              Dont have an account?
              <span onClick={() => setShowLogin(!showLogin)}>sign up</span>
            </>
          ) : (
            <>
              ¡log in!
              <span onClick={() => setShowLogin(!showLogin)}>
                Log in
              </span>
            </>
          )}
        </p>
      </div>
    </Container>
  );
}
