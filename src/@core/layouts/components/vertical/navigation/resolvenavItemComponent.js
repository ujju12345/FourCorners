// resolveNavItemComponent.js

import VerticalNavDropdown from "./SidebarDropdown";
import VerticalNavLink from "./VerticalNavLink";
import VerticalNavSectionTitle from "./VerticalNavSectionTitle";

const resolveNavItemComponent = (item) => {
  if (item.sectionTitle) return VerticalNavSectionTitle;
  if (item.children) return VerticalNavDropdown; // Handle dropdown items
  return VerticalNavLink;
};

export default resolveNavItemComponent;
