// FloatingScreen.js
import React from "react";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
const FloatingScreen = ({ groups }) => {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <IconButton
        onClick={handleOpen}
        edge="start"
        color="inherit"
        aria-label="menu">
        <MenuIcon />
      </IconButton>

      <Drawer anchor="left" open={open} onClose={handleClose}>
        <div
          style={{
            width: "20vw", // 20% of viewport width
            height: "100vh", // 100% of viewport height
            backgroundColor: "red", // Set your desired background color
          }}>
          {/* Your floating screen content goes here */}
          <h2>your group </h2>

          <List>
            <ListItem>
              <ListItemText
                primary="groups"
                onClick={() => console.log("first")}
              />
            </ListItem>
            <ListItem>
              <ListItemText primary="create a group" />
            </ListItem>
            <ListItem>
              <ListItemText primary="group 3" />
            </ListItem>
          </List>
          <button onClick={handleClose}>Close</button>
        </div>
      </Drawer>
    </div>
  );
};

export default FloatingScreen;
