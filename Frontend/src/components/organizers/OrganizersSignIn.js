import React from "react";
import SignInForm from "../SignIn/signinForm";
import { sendAdminAuthRequest } from "../../api-helpers/api-helpers";
import { useDispatch } from "react-redux";
import { adminActions } from "../../store";
import { useNavigate } from "react-router-dom";

const Organizers = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onResReceived = (data) => {
    console.log(data);
    dispatch(adminActions.login());
    localStorage.setItem("adminId", data.id);
    localStorage.setItem("token", data.token);
    navigate("/");
  };

  const getData = (data) => {
    console.log(data);
    sendAdminAuthRequest(data.inputs)
      .then(onResReceived)
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <SignInForm onSubmit={getData} isAdmin={true} />
    </div>
  );
};

export default Organizers;
