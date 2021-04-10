import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import Avatar from "@material-ui/core/Avatar";
import { createContact } from "../../services/user";
import { createContacts } from "../../redux/action";
import DialogContent from "@material-ui/core/DialogContent";
import firebase from "firebase";
import { useDispatch } from "react-redux";
import "./main.css";
const CreateContact = () => {
  const [shouldUpload, setShouldUpload] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [photo, setPhoto] = useState("");
  const [contact, setcontact] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  async function photoUpload() {
    await firebase.storage().ref(`image/${photo.name}`).put(photo);
    await firebase
      .storage()
      .ref(`image/${photo.name}`)
      .getDownloadURL()
      .then((res) => {
        setImageUrl(res);
      });
  }
  if (shouldUpload) {
    photoUpload();
  }
  function eventHandler(event) {
    const { name, value } = event.target;
    setcontact({ ...contact, [name]: value });
  }
  function create() {
    createContact({ contact, imageUrl });
    dispatch(createContacts({ ...contact, imageUrl }));

    handleClose();
    clearInput();
  }

  function handleClickOpen() {
    setOpen(true);
  }
  console.log(imageUrl);
  function clearInput() {
    setImageUrl("");
    setcontact({ firstName: "", lastName: "", phoneNumber: "" });
  }

  function handleClose() {
    clearInput();
    setOpen(false);
  }
  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleClickOpen}>
        NEW +
      </Button>
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
              }}
              src={imageUrl}
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
                left: "30%",
                cursor: "pointer",
                fontWeight: "bold",
              }}
            >
              Image
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
            required
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
            required
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
            required
          />
          <Button
            color="primary"
            variant="contained"
            style={{
              marginTop: "10px",
              marginRight: "20px",
              width: "48%",
            }}
            onClick={create}
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

export default CreateContact;
