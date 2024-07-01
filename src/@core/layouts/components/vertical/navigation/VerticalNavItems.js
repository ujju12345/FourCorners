// verticle nav items

// ** Custom Menu Components
import VerticalNavDropdown from './SidebarDropdown';
import VerticalNavLink from './VerticalNavLink';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';

// Function to determine the component based on item type
const resolveNavItemComponent = (item) => {
  if (item.sectionTitle) return VerticalNavSectionTitle;
  if (item.children) return VerticalNavDropdown; // Handle dropdown items
  return VerticalNavLink;
};

const VerticalNavItems = (props) => {
  const { verticalNavItems } = props;

  const RenderMenuItems = (verticalNavItems || []).map((item, index) => {
    const TagName = resolveNavItemComponent(item);
    return <TagName {...props} key={index} item={item} />;
  });

  return <>{RenderMenuItems}</>;
};

export default VerticalNavItems;
