import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import InputBase from "@material-ui/core/InputBase";
import { fetchContacts } from "../../redux/action";
import SearchIcon from "@material-ui/icons/Search";
import Form from "../CreateContact/CreateContact";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { withStyles } from "@material-ui/core/styles";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";
import Button from "@material-ui/core/Button";
import Card from "../ContactCrad/MainCard";
import { useDispatch, useSelector } from "react-redux";

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
const StyledMenuItem = withStyles((theme) => ({
  root: {
    "&:focus": {
      backgroundColor: theme.palette.primary.main,
      "& .MuiListItemIcon-root, & .MuiListItemText-primary": {
        color: theme.palette.common.white,
      },
    },
  },
}))(MenuItem);
const useStyles = makeStyles((theme) => ({
  title: {
    display: "none",
    [theme.breakpoints.up("xl")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: "#f0ffff",
    "&:hover": {
      backgroundColor: "#f0ffff",
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#3f51b5",
  },
  inputRoot: {
    border: "0.5px solid #3f51b5",
    width: "1100px !important",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    backgroundColor: "#f0ffff",
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

function SubNavbar() {
  const dispatch = useDispatch();
  const state = useSelector((state) => state);
  function ascendSorting() {
    state.contacts.sort(function (a, b) {
      if (
        a.userName.firstName.toLowerCase() < b.userName.firstName.toLowerCase()
      ) {
        return -1;
      }
      if (
        a.userName.firstName.toLowerCase() > b.userName.firstName.toLowerCase()
      ) {
        return 1;
      }
      if (
        a.userName.lastName.toLowerCase() < b.userName.lastName.toLowerCase()
      ) {
        return -1;
      }
      if (
        a.userName.lastName.toLowerCase() > b.userName.lastName.toLowerCase()
      ) {
        return 1;
      }
      return 0;
    });
    dispatch(fetchContacts(state.contacts));
    handleClose();
  }
  function descendSorting() {
    state.contacts.sort(function (a, b) {
      if (
        a.userName.firstName.toLowerCase() > b.userName.firstName.toLowerCase()
      ) {
        return -1;
      }
      if (
        a.userName.firstName.toLowerCase() < b.userName.firstName.toLowerCase()
      ) {
        return 1;
      }
      if (
        a.userName.lastName.toLowerCase() > b.userName.lastName.toLowerCase()
      ) {
        return -1;
      }
      if (
        a.userName.lastName.toLowerCase() < b.userName.lastName.toLowerCase()
      ) {
        return 1;
      }
      return 0;
    });
    handleClose();
    dispatch(fetchContacts(state.contacts));
  }

  const [searchTearm, setSearchTearm] = useState("");
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <div className={classes.grow}>
        <AppBar position="static" color="transparent">
          <Toolbar>
            <Form />
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase
                placeholder="Search…"
                classes={{
                  root: classes.inputRoot,
                  input: classes.inputInput,
                }}
                inputProps={{ "aria-label": "search" }}
                onChange={(event) => setSearchTearm(event.target.value)}
              />
            </div>
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              color="primary"
              onClick={handleClick}
            >
              Sort
              <ArrowDropDownIcon />
            </Button>

            <StyledMenu
              id="customized-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <StyledMenuItem onClick={ascendSorting}>
                <ListItemIcon>
                  <>Ascend</>
                </ListItemIcon>
              </StyledMenuItem>
              <StyledMenuItem onClick={descendSorting}>
                <ListItemIcon>
                  <>Descend</>
                </ListItemIcon>
              </StyledMenuItem>
            </StyledMenu>
          </Toolbar>
        </AppBar>
      </div>
      <Card searchTearm={searchTearm} />
    </>
  );
}
export default SubNavbar;
