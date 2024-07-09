//verticle side bar
import CubeOutlineIcon from "mdi-material-ui/CubeOutline";
// ** Icon imports
import ContactPhoneIcon from "@mui/icons-material/ContactPhone";
import HomeOutline from "mdi-material-ui/HomeOutline";
import PhoneIcon from "@mui/icons-material/Phone";
import AssignmentIcon from "@mui/icons-material/Assignment";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
const SalesManagerNavigation = () => {
  return [
    {
      title: "Dashboard",
      icon: HomeOutline,
      path: "/",
    },

    {
      title: "Project Manager",
      icon: AssignmentIcon,
      path: "/typography",
    },

    {
      title: "Opportunity",
      icon: TrendingUpIcon,
      path: "/opportunity",
      children: [
        {
          title: "All Opportunity",
          icon: CubeOutlineIcon,
          path: "/opportunity",
        },
        {
          title: "Todays Followup",
          icon: CubeOutlineIcon,
          path: "/opportunity/MyOpportunity",
        },
        {
          title: "Backlog Pending",
          icon: CubeOutlineIcon,
          path: "/opportunity/BacklogOpportunity",
        },
        {
          title: "Open Opportunity",
          icon: CubeOutlineIcon,
          path: "/opportunity/OpenOpportunity",
        },
        {
          title: "Calendar",
          icon: CubeOutlineIcon,
          path: "/opportunity/OpportunityCalender",
        },
        {
          title: "Not Interested",
          icon: CubeOutlineIcon,
          path: "/opportunity/NotInterested",
        },
      ],
    },
  ];
};

export default SalesManagerNavigation;
