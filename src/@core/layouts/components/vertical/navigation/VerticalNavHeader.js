import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import logo from 'public/images/logos/logo.png';
import Box from '@mui/material/Box';
import { styled, useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import themeConfig from 'src/configs/themeConfig';
import { useCookies } from 'react-cookie';

// ** Styled Components
const MenuHeaderWrapper = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  paddingRight: theme.spacing(4.5),
  transition: 'padding .25s ease-in-out',
  minHeight: theme.mixins.toolbar.minHeight
}));

const HeaderTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 600,
  lineHeight: 'normal',
  textTransform: 'uppercase',
  color: theme.palette.text.primary,
  transition: 'opacity .25s ease-in-out, margin .25s ease-in-out'
}));

const StyledLink = styled('a')({
  display: 'flex',
  alignItems: 'center',
  textDecoration: 'none'
});

const VerticalNavHeader = props => {
  // ** Props
  const { verticalNavMenuBranding: userVerticalNavMenuBranding } = props;

  // ** Hooks
  const theme = useTheme();
  const [cookies] = useCookies(['amr']);
  const [rolePath, setRolePath] = useState('/');

  useEffect(() => {
    try {
      if (cookies.amr) {
        const user = typeof cookies.amr === 'string' ? JSON.parse(cookies.amr) : cookies.amr;
        if (user.RoleID === 1) {
          setRolePath('/');
        } else if (user.RoleID === 3) {
          setRolePath('/SaleDashboard');
        } else {
          setRolePath('/Telecalling');
        }
      }
    } catch (error) {
      console.error('Failed to parse cookie:', error);
    }
  }, [cookies]);

  return (
    <MenuHeaderWrapper className='nav-header' sx={{ pl: 6 }}>
      {userVerticalNavMenuBranding ? (
        userVerticalNavMenuBranding(props)
      ) : (
        <Link href={rolePath} passHref>
          <StyledLink>
            <img src={'https://raw.githubusercontent.com/alokkaintura/forcorners/main/logo.png'} alt="logo" style={{ maxWidth: "200px" }} />
            {/* <HeaderTitle variant='h6' sx={{ ml: 3 }}>
              {themeConfig.templateName}
            </HeaderTitle> */}
          </StyledLink>
        </Link>
      )}
    </MenuHeaderWrapper>
  );
};

export default VerticalNavHeader;
