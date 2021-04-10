import React from "react";
import firebase from "firebase";
import MainComponent from "../MainComponent/MainComponent";
import { CircularProgress } from "@material-ui/core";
import { Redirect } from "react-router-dom";
const progressStyle = {
  position: "absolute",
  top: "0",
  right: "0",
  left: "0",
  width: "100vw",
  height: "100vh",
  justifyContent: "center",
  display: "flex",
  alignItems: "center",
};

const PrivateRoute = () => {
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [progress, setProgress] = React.useState(true);
  React.useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setLoginStatus(true);
      }
      setProgress(false);
    });
  }, []);
  return progress ? (
    <div style={progressStyle}>
      <CircularProgress thickness={6} />
    </div>
  ) : loginStatus ? (
    <MainComponent />
  ) : (
    <Redirect to="/Login" />
  );
};

export default PrivateRoute;
