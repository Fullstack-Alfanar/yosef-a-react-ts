import { useState } from "react";
import { Validate } from "../util/Validate";

export const EmailPage = () => {
  const [emailValid, setEmailValid] = useState(true);
  const [typedEmail, setEmailTyped] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [typedPass, setPassTyped] = useState(false);

  const emailLabel = () => {
    if (!typedEmail) return <></>;
    if (emailValid)
      return <label style={{ color: "green" }}>Valid Email</label>;
    else return <label style={{ color: "red" }}>Invalid Email</label>;
  };

  const passLabel = () => {
    if (!typedPass) return <></>;
    if (passValid)
      return <label style={{ color: "green" }}>Valid Password</label>;
    else return <label style={{ color: "red" }}>Invalid Password</label>;
  };

  return (
    <div>
      <h1>Email Validation</h1>
      <div>
        <input
          type="email"
          onChange={(e) => {
            setEmailTyped(true);
            setEmailValid(Validate.email(e.target.value));
          }}
        />
      </div>
      <div>
        <input
          type="password"
          onChange={(e) => {
            setPassTyped(true);
            setPassValid(Validate.matchPassword(e.target.value));
          }}
        />
      </div>

      <div>{emailLabel()}</div>
      <div>{passLabel()}</div>
    </div>
  );
};
