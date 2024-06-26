import CubeOutlineIcon from 'mdi-material-ui/CubeOutline';
// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import PhoneIcon from '@mui/icons-material/Phone';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import PaymentsIcon from '@mui/icons-material/Payments';
import LanguageIcon from '@mui/icons-material/Language';
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

import AssignmentIcon from '@mui/icons-material/Assignment';
import BusinessIcon from '@mui/icons-material/Business';

const navigation = () => {
  return [
    {
      title: 'Dashboard',
      icon: HomeOutline,
      path: '/'
    },
    {
      sectionTitle: 'Companies'
    },
    {
      title: 'Manage Company',
      icon: BusinessIcon,
      path: '/account-settings'
    },

    {
      sectionTitle: 'Projects'
    },
    {
      title: 'Project Manager',
      icon: AssignmentIcon,
      path: '/typography'
    },
    {
      sectionTitle: 'User Interface'
    },
    {
      title: 'User Management',
      path: '/user-management',
      icon: SupervisorAccountIcon
    },
    {
      title: 'Contacts',
      icon: ContactPhoneIcon,
      path: '/contact'
    },

    {
      sectionTitle: 'Leads'
    },
    {
      title: 'Lead',
      icon: PhoneIcon,
      path: '/tellcalling-details'
    },

     {
      title: 'My Lead',
      icon: CubeOutlineIcon,
      path: '/tellcalling-details/Mylead',
    },
    {
      title: 'Backlog Lead',
      icon: CubeOutlineIcon,
      path: '/tellcalling-details/Backlog',
    },    {
      title: 'Open Lead',
      icon: CubeOutlineIcon,
      path: '/tellcalling-details/OpenLead',
    },
    {
      title: 'Calendar',
      icon: CubeOutlineIcon,
      path: '/tellcalling-details/Leadcalender',
    },
    {
      sectionTitle: 'Opportunity'
    },
    {
      title: 'Opportunity',
      icon: TrendingUpIcon,
      path: '/opportunity',
    },
    {
      title: 'My Opportunity',
      icon: CubeOutlineIcon,
      path: '/opportunity/MyOpportunity',
    },
    {
      title: 'Backlog',
      icon: CubeOutlineIcon,
      path: '',
    },  
    {
      sectionTitle: 'Enquiries'
    },
    {
      title: 'Enquiry Source',
      icon: LanguageIcon,
      path: '/enquiry-source'
    },
    {
      sectionTitle: 'Sales'
    },
    {
      icon: PaymentsIcon,
      title: 'Installment',
      path: '/installment'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Project Finance Approval',
      path: '/project-finance'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Stamp Duty Master',
      path: '/stamp-duty'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Additional Charges',
      path: '/additonal-charges'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Channel Partner',
      path: '/channel-partner'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Car Parking',
      path: '/car-parking'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Unit Allocation',
      path: '/unitallocation'
    },
    {
      icon: CubeOutlineIcon,
      title: 'Receipt',
      path: '/receipt'
    },
  
    
  ];
};

export default navigation;