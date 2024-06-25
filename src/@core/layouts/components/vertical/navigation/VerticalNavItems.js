// ** Custom Menu Components
import VerticalNavLink from './VerticalNavLink';
import VerticalNavSectionTitle from './VerticalNavSectionTitle';

// Function to determine the component based on item type
const resolveNavItemComponent = (item) => {
  if (item.sectionTitle) return VerticalNavSectionTitle;
  return VerticalNavLink;
};

const VerticalNavItems = (props) => {
  // Destructure props to get verticalNavItems
  const { verticalNavItems } = props;

  // Check if verticalNavItems is an array and map over it
  const RenderMenuItems = (verticalNavItems || []).map((item, index) => {
    const TagName = resolveNavItemComponent(item); // Determine the component to render

    // Render the component with props and key
    return <TagName {...props} key={index} item={item} />;
  });

  return <>{RenderMenuItems}</>;
};

export default VerticalNavItems;
