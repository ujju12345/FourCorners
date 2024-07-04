import React, { useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import resolveNavItemComponent from "./resolvenavItemComponent";
import { ListItemIcon } from "@mui/material";
import UserIcon from "src/layouts/components/UserIcon";

const VerticalNavDropdown = ({ item, ...props }) => {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItem
        style={{ marginLeft: 20, fontSize: 12 }}
        button
        onClick={handleClick}
      >
        <ListItemIcon
          sx={{
            mr: 2.5,
            color: "text.primary",
            transition: "margin .25s ease-in-out",
          }}
        >
          <UserIcon icon={item.icon} />
        </ListItemIcon>
        <ListItemText primary={item.title} />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {item.children.map((child, index) => {
            const TagName = resolveNavItemComponent(child);
            return <TagName key={index} item={child} {...props} />;
          })}
        </List>
      </Collapse>
    </>
  );
};

export default VerticalNavDropdown;
