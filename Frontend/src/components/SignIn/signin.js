import React from "react";
import { sendUserAuthRequest } from "../../api-helpers/api-helpers";
import SignInForm from "./signinForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userActions } from "../../store";

const SignIn = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(userActions.login());
    localStorage.setItem("userId", data.id);
    navigate("/");
  };

  const getData = (data) => {
    console.log(data);
    sendUserAuthRequest(data.inputs, data.signup)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <SignInForm onSubmit={getData} isAdmin={false} />
    </div>
  );
};
export default SignIn;
