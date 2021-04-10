import { Button } from "@material-ui/core";
import { useDispatch } from "react-redux";
import { deleteContacts } from "../../redux/action";
import { deleteContact } from "../../services/user";
import React from "react";

const DeleteContact = ({ phoneNumber }) => {
  const dispatch = useDispatch();

  function delete1() {
    deleteContact({ phoneNumber });
    dispatch(deleteContacts({ phoneNumber }));
  }

  return (
    <>
      <Button onClick={delete1}>Delete</Button>
    </>
  );
};

export default DeleteContact;
