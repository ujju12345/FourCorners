// ** MUI Imports
import Grid from '@mui/material/Grid'
import Link from '@mui/material/Link'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import CardHeader from '@mui/material/CardHeader'
import { useRouter } from 'next/router';
// ** Demo Components Imports
import CustomertDetails from 'src/views/customer-details/CustomertDetails'
import TableDense from 'src/views/customer-details/TableDense'
import TableSpanning from 'src/views/customer-details/TableSpanning'
import TableCustomized from 'src/views/customer-details/TableCustomized'
import TableCollapsible from 'src/views/customer-details/TableCollapsible'
import TableStickyHeader from 'src/views/customer-details/TableStickyHeader'
import { Button } from '@mui/material'

const MUITable = () => {
  const router = useRouter();


  const handleClick = () => {
    // Navigate to ProjectManage.js page
    router.push('/typography'); // Assuming '/ProjectManage' is the path to ProjectManage.js
  };

  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        {/* <Typography variant='h5'>
          <Link href='https://mui.com/components/tables/' target='_blank'>
            MUI Tables
          </Link>
        </Typography> */}
           <Grid item xs={12}>
            <Button variant='contained' sx={{ marginRight: 3.5 }} onClick={handleClick}>
              Add
            </Button>
        
          </Grid>
       
      </Grid>
      <Grid item xs={12}>
        <Card>
          <CardHeader title='Customer Details' titleTypographyProps={{ variant: 'h6' }} />
          <CustomertDetails />
        </Card>
        </Grid>
 
    </Grid>
  )
}

export default MUITable
