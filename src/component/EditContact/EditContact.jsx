import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import firebase from "firebase";
import Avatar from "@material-ui/core/Avatar";
import DialogContent from "@material-ui/core/DialogContent";
import { useDispatch } from "react-redux";
import { editContacts } from "../../redux/action";
import { editContact } from "../../services/user";
const EditContact = ({ firstName, lastName, phoneNumber, imageUrl }) => {
  const [photo, setPhoto] = useState("");
  const [shouldUpload, setShouldUpload] = useState(false);
  const dispatch = useDispatch();
  const [url, setUrl] = useState(imageUrl);
  const [open, setOpen] = useState(false);
  const [contact, setcontact] = useState({
    firstName: firstName,
    lastName: lastName,
    phoneNumber: phoneNumber,
    prevNo: phoneNumber,
  });

  async function photoUpload() {
    await firebase.storage().ref(`image/${photo.name}`).put(photo);
    await firebase
      .storage()
      .ref(`image/${photo.name}`)
      .getDownloadURL()
      .then((res) => {
        setUrl(res);
      });
    await firebase.storage().ref().child(imageUrl).delete();
  }
  if (shouldUpload) {
    photoUpload();
  }
  function eventHandler(event) {
    const { name, value } = event.target;
    setcontact({ ...contact, [name]: value });
  }

  function edit() {
    editContact({ contact, url });
    dispatch(editContacts({ contact, url }));
    handleClose();
  }

  function handleClickOpen() {
    setOpen(true);
  }

  function handleClose() {
    setOpen(false);
  }

  return (
    <div>
      <Button onClick={handleClickOpen}>Edit</Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        {" "}
        <div
          style={{
            width: "100%",
            height: "80px",
            backgroundColor: "#3f51b5",
          }}
        ></div>
        <DialogContent>
          <div
            style={{
              borderRadius: "50%",
              height: "100px",
              width: "100px",
              position: "absolute",
              left: "41%",
              top: "6%",
              paddingBottom: "-30px",
            }}
          >
            <Avatar
              style={{
                height: "100px",
                width: "100px",
                zIndex: 3,
              }}
              src={url}
            />
            <input
              type="file"
              id="file"
              onChange={(event) => {
                if (event.target.files[0]) {
                  setPhoto(event.target.files[0]);
                  setShouldUpload(true);
                }
              }}
              name="file"
              class="inputfile"
            />
            <label
              for="file"
              style={{
                position: "absolute",
                top: "75%",
                left: "25%",
                cursor: "pointer",
                fontWeight: "bolder",
                color: "3f51b5",
                zIndex: 5,
              }}
            >
              Change{" "}
            </label>
          </div>

          <TextField
            id="outlined-basic"
            variant="outlined"
            label="First Name"
            style={{
              marginTop: "40px",
              paddingRight: "10px",
              paddingBottom: "10px",
              width: "48.99%",
            }}
            name="firstName"
            value={contact.firstName}
            onChange={eventHandler}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label=" Last Name"
            style={{
              marginTop: "40px",
              paddingBottom: "10px",
              width: "48.99%",
            }}
            name="lastName"
            value={contact.lastName}
            onChange={eventHandler}
          />
          <TextField
            id="outlined-basic"
            variant="outlined"
            label="Phone Number"
            fullWidth
            style={{ paddingBottom: "10px" }}
            name="phoneNumber"
            value={contact.phoneNumber}
            onChange={eventHandler}
          />
          <Button
            color="primary"
            variant="contained"
            style={{
              marginTop: "10px",
              marginRight: "20px",
              width: "48%",
            }}
            onClick={edit}
          >
            Save
          </Button>
          <Button
            style={{
              marginTop: "10px",
              width: "48%",
            }}
            color="primary"
            variant="contained"
            onClick={handleClose}
          >
            Cancel
          </Button>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EditContact;
