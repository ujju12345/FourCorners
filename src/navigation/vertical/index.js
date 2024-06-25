// ** Icon imports
import Login from 'mdi-material-ui/Login'
import Table from 'mdi-material-ui/Table'
import CubeOutline from 'mdi-material-ui/CubeOutline'
import HomeOutline from 'mdi-material-ui/HomeOutline'
import FormatLetterCase from 'mdi-material-ui/FormatLetterCase'
import AccountCogOutline from 'mdi-material-ui/AccountCogOutline'
import CreditCardOutline from 'mdi-material-ui/CreditCardOutline'
import AccountPlusOutline from 'mdi-material-ui/AccountPlusOutline'
import AlertCircleOutline from 'mdi-material-ui/AlertCircleOutline'
import GoogleCirclesExtended from 'mdi-material-ui/GoogleCirclesExtended'

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
      icon: AccountCogOutline,
      path: '/account-settings'
    },

    {
      sectionTitle: 'Projects'
    }, 
    // {
    //   title: 'Project Detail',
    //   icon: Table,
    //   path: '/project-details'
    // },
    {
      title: 'Project Manager',
      icon: FormatLetterCase,
      path: '/typography'
    },
    // {
    //   title: 'Sub Project Master',
    //   icon: CreditCardOutline,
    //   path: '/sub-projectmaster'
    // },

    {
      title: 'Sub Project Details',
      icon: CreditCardOutline,
      path: '/subproject-details'
    },
       {
      sectionTitle: 'Enquiries'
    },
    {
      title: 'Enquiry Source',
      icon: CreditCardOutline,
      path: '/enquiry-source'
    },
    {
      sectionTitle: 'Sales'

      
    },

    // {
    //   title: 'Car Parking ',
    //   icon: CreditCardOutline,
    //   path: '/car-parking'
    // },
    // {
    //   sectionTitle: 'Pages' 
    // },
    // {
    //   title: 'Login',
    //   icon: Login,
    //   path: '/pages/login',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Register',
    //   icon: AccountPlusOutline,
    //   path: '/pages/register',
    //   openInNewTab: true
    // },
    // {
    //   title: 'Error',
    //   icon: AlertCircleOutline,
    //   path: '/pages/error',
    //   openInNewTab: true
    // },
    {
      sectionTitle: 'User Interface'
    },
    // {
    //   title: 'Project Manager',
    //   icon: FormatLetterCase,
    //   path: '/typography'
    // },
    // {
    //   title: 'Project Detail',
    //   icon: Table,
    //   path: '/project-details'
    // },
    {
      title: 'Customer Details',
      path: '/customer-details',
      icon: CubeOutline
    },
    {
      title: 'User Management',
      path: '/user-management',
      icon: CubeOutline
    },

    // {
    //   title: 'Sub Project Details',
    //   icon: CreditCardOutline,
    //   path: '/subproject-details'
    // },


    {
      title: 'Lead',
      icon: CreditCardOutline,
      path: '/tellcalling-details'
    },


    {
      title: 'Contacts',
      icon: CreditCardOutline,
      path: '/contact'
    },



    {
      title: 'Opportunity',
      icon: CreditCardOutline,
      path: '/opportunity'
    },


    {
      icon: CubeOutline,
      title: 'Installment',
      path: '/installment'
    },
    {
      icon: CubeOutline,
      title: 'Project Finance Approval',
      path: '/project-finance'
    },
    {
      icon: CubeOutline,
      title: 'Stamp Duty Master',
      path: '/stamp-duty'
    },
    {
      icon: CubeOutline,
      title: 'Additional Charges',
      path: '/additonal-charges'
    },
    {
      icon: CubeOutline,
      title: 'Channel Partner',
      path: '/channel-partner'
    },
    {
      icon: CubeOutline,
      title: 'Car Parking',
      path: '/car-parking'
    },
    {
      icon: CubeOutline,
      title: 'Unit Allocation',
      path: '/unitallocation'
    },
    {
      icon: CubeOutline,
      title: 'Receipt',
      path: '/receipt'
    }
 
  ]
}

export default navigation
