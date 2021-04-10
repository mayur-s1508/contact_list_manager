import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import IconButton from "@material-ui/core/IconButton";
import { red } from "@material-ui/core/colors";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Delete from "../DeleteContact/DeleteContact";
import Edit from "../EditContact/EditContact";

const ITEM_HEIGHT = 26;

const useStyles = makeStyles((theme) => ({
  root: {
    Width: 240,
    maxHeight: 80,
  },
  media: {
    height: 0,
    paddingTop: "50%",
  },
  avatar: {
    backgroundColor: "none",
  },
}));
function ContactCard(props) {
  const options = [
    <Edit
      firstName={props.firstName}
      lastName={props.lastName}
      phoneNumber={props.phoneNumber}
      imageUrl={props.imageUrl}
    />,
    <Delete phoneNumber={props.phoneNumber} />,
  ];
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div style={{ marginLeft: "18px" }}>
      <div style={{ padding: "14px", float: "left" }}>
        <Card
          className={classes.root}
          style={{
            paddingTop: "0px",
            paddingBottom: "10px",
            width: "415px",
            boxShadow: "3px 3px 3px 3px lightgrey",
            backgroundColor: "#99b3ff",
          }}
        >
          <CardHeader
            avatar={
              <Avatar
                style={{ width: "60px", height: "60px" }}
                aria-label="recipe"
                className={classes.avatar}
                src={props.imageUrl}
              />
            }
            action={
              <div>
                <IconButton
                  aria-label="more"
                  aria-controls="long-menu"
                  aria-haspopup="true"
                  onClick={handleClick}
                >
                  <MoreVertIcon />
                </IconButton>
                <Menu
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={open}
                  onClose={handleClose}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                      width: "13ch",
                      backgroundColor: "#99b3ff",
                    },
                  }}
                >
                  {options.map((option) => (
                    <MenuItem onClick={handleClose}>{option}</MenuItem>
                  ))}
                </Menu>
              </div>
            }
            title={props.firstName + " " + props.lastName}
            subheader={props.phoneNumber}
          />
        </Card>
      </div>
    </div>
  );
}
export default ContactCard;
