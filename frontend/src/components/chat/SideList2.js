import React from "react";
import {
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  AppBar,
  CssBaseline,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import ChatApp from "./ChatApp";
import SideList from "./SideList";

const SideList2 = ({ name, id, type, avatar }) => {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <List>
      <SideList />
    </List>
  );

  return (
    <div style={{ display: "flex" }}>
      <CssBaseline />

      <MenuIcon
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ mr: 2 }}
      />
      <nav>
        <Hidden smUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true,
            }}
            sx={{
              width: 240,
              "& .MuiDrawer-paper": {
                width: 240,
              },
            }}>
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden mdDown implementation="css">
          <Drawer
            variant="permanent"
            open
            sx={{
              width: 240,
              "& .MuiDrawer-paper": {
                width: 240,
              },
            }}>
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
      <main>
        <ChatApp name={name} id={id} type="user" avatar={avatar} />
      </main>
    </div>
  );
};

export default SideList2;
