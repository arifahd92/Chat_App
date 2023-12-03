// FloatingScreen.js
import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import SideList from "./SideList";
const FloatingScreen = ({ groups, modalStaus, setModalStatus }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div style={{ marginLeft: "20px" }}>
      <IconButton
        onClick={handleOpen}
        edge="start"
        color="inherit"
        aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Drawer
        anchor="left"
        open={open}
        onClose={handleClose}
        style={{ width: "300px" }}>
        <div
          style={{
            width: "300px",
            height: "100vh", // 100% of viewport height
            backgroundColor: "red", // Set your desired background color
          }}>
          {/* Your floating screen content goes here */}
          <SideList
            closeDrawer={setOpen}
            modalStaus={modalStaus}
            setModalStatus={setModalStatus}
          />

          <div className="row">
            <div className="col-2 offset-8">
              <button
                className="btn btn-outline-light mt-3"
                onClick={handleClose}>
                close{" "}
              </button>
            </div>
          </div>
        </div>
      </Drawer>
    </div>
  );
};

export default FloatingScreen;
