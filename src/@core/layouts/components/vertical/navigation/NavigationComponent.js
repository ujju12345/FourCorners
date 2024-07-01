import React, { useState } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { styled, useTheme } from '@mui/material/styles';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import navigation from 'src/navigation/vertical'; // Ensure you update the path

const StyledList = styled(List)({
  width: '100%',
  maxWidth: 360,
  backgroundColor: theme => theme.palette.background.paper
});

const NavigationComponent = () => {
  const [isLeadDropdownOpen, setIsLeadDropdownOpen] = useState(false);
  const theme = useTheme();

  const toggleLeadDropdown = () => {
    setIsLeadDropdownOpen(!isLeadDropdownOpen);
  };

  const navItems = navigation(isLeadDropdownOpen, toggleLeadDropdown);

  return (
    <StyledList component="nav">
      {navItems.map((item, index) => (
        <React.Fragment key={index}>
          {item.sectionTitle ? (
            <ListItem button disabled>
              <ListItemText primary={item.sectionTitle} />
            </ListItem>
          ) : (
            <>
              <ListItem
                button
                onClick={item.action ? item.action : null}
                component="div" // Use div instead of 'a' for non-navigable items
              >
                <ListItemIcon>
                  <item.icon />
                </ListItemIcon>
                <ListItemText primary={item.title} />
                {item.dropdownItems && (isLeadDropdownOpen ? <ExpandLess /> : <ExpandMore />)}
              </ListItem>
              {item.dropdownItems && (
                <Collapse in={isLeadDropdownOpen} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    {item.dropdownItems.map((subItem, subIndex) => (
                      <ListItem
                        button
                        key={subIndex}
                        component="a" // Ensure to use 'a' for clickable dropdown items
                        href={subItem.path}
                        sx={{ pl: 4 }}
                      >
                        <ListItemIcon>
                          <subItem.icon />
                        </ListItemIcon>
                        <ListItemText primary={subItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              )}
            </>
          )}
        </React.Fragment>
      ))}
    </StyledList>
  );
};

export default NavigationComponent;
