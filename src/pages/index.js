// ** MUI Imports
import Grid from '@mui/material/Grid'
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
// ** Icons Imports
import Poll from 'mdi-material-ui/Poll'
import CurrencyUsd from 'mdi-material-ui/CurrencyUsd'
import HelpCircleOutline from 'mdi-material-ui/HelpCircleOutline'
import BriefcaseVariantOutline from 'mdi-material-ui/BriefcaseVariantOutline'
import { useCookies } from "react-cookie";
// ** Custom Components Imports
import CardStatisticsVerticalComponent from 'src/@core/components/card-statistics/card-stats-vertical'

// ** Styled Component Import
import ApexChartWrapper from 'src/@core/styles/libs/react-apexcharts'

// ** Demo Components Imports
import Table from 'src/views/dashboard/Table'
import Trophy from 'src/views/dashboard/Trophy'
import TotalEarning from 'src/views/dashboard/TotalEarning'
import StatisticsCard from 'src/views/dashboard/StatisticsCard'
import WeeklyOverview from 'src/views/dashboard/WeeklyOverview'  // Ensure named import here
import DepositWithdraw from 'src/views/dashboard/DepositWithdraw'
import SalesByCountries from 'src/views/dashboard/SalesByCountries'
import { Typography } from '@mui/material'

const Dashboard = () => {
  const router = useRouter();

  useEffect(() => {
    if (!cookies || !cookies.amr || !cookies.amr.UserID) {
      router.push('/pages/login')
    }
    else {
      // SetCookieRoleID(cookies.dfc.RoleID);
      // SetCookieRolName(cookies.dfc.RoleName);
      // SetCookieUserName(cookies.dfc.FullName);
      // SetCookieUseID(cookies.dfc.UserID);
    }
  }, []);
  
  const [cookies, setCookie, removeCookie] = useCookies(["amr"]);
  
  return (
    <ApexChartWrapper>
      <Grid container spacing={6}>
        <Grid item xs={12} md={4}>
          <Trophy />
        </Grid>
        <Grid item xs={12} md={8}>
          <StatisticsCard />
        </Grid>
        <Grid item xs={12} md={12} >
          <WeeklyOverview />
        </Grid>
      </Grid>
    </ApexChartWrapper>
  )
}

export default Dashboard