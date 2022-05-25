// import Container from './Container'
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { Auth } from 'aws-amplify';
import axios from 'axios';
import * as React from 'react';
import { useEffect, useState } from 'react';
import { useHistory, useLocation } from "react-router-dom";
import styled from '../../utils/styled';
import Alert from './Confirmation';


interface HeaderProps {
  // title: string
}

const breakpoints: any = {
  xs: '0px',
  sm: '576px',
  md: '768px',
  lg: '992px',
  xl: '1200px'
}
const widths: any = {
  md: '720px',
  lg: '960px',
  xl: '1140px'
}
const Container = styled('div')`
  margin: 0 auto;
  width: 100%;
  max-width: ${widths.md};

  @media (min-width: ${breakpoints.lg}) {
    max-width: ${widths.lg};
  }

  @media (min-width: ${breakpoints.xl}) {
    max-width: ${widths.xl};
  }
`

const Wrapper = styled('header')`
position:'fixed',
width:'100%',
height: 75px;
background-color: #f2f2f2;
  color:white;
  font-family:"'IBM Plex Sans', -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, Arial, sans-serif";
`
const HeaderInner = styled(Container)`
  display: flex;
  flex-direction:row;
 width:'100%',
 margin-left:0px;
  justify-content:space-between;
`

const HeaderLeft = styled('div')`


  text-align: 'center',
  width: 200px;
  height: 75px;
`

// const HeaderNav = styled('nav')`
//   flex: 1 1 auto;
//   margin: 1rem 0;

//   @media (min-width: ${props => props.theme.breakpoints.lg}) {
//     margin: 0;
//   }
// `

// const HeaderNavLink = styled(NavLink)`
//   margin: 0 1rem;

//   &.is-active {
//     text-decoration: underline;
//   }
// `

const HeaderRight = styled('div')`

width: 111px;
  height: 40px;
  font-family: Roboto;
  font-size: 14px;
  font-weight: normal;
  font-stretch: normal;
  font-style: normal;
  line-height: 2.86;
  letter-spacing: 0.15px;
  color: #4f4f4f;
  text-align:'right'

`

// const Title = styled('h2')`
//   margin: 0;
//   font-weight: 500;
// `

// const CurrentTheme = styled('span')`
//   margin-right: 1rem;
// `

// const LogoRight = styled('p')`
// width: 111px;
//   height: 40px;
//   font-family: Roboto;
//   font-size: 14px;
//   font-weight: normal;
//   font-stretch: normal;
//   font-style: normal;
//   line-height: 2.86;
//   letter-spacing: 0.15px;
//   color: #4f4f4f;
//   text-align:'center';

// `
const LogoLeft = styled('img')`
width: 150px;
  height: 50px;
  object-fit: contain;
  text-align:'center';

`

// const ThemeSwitcherButton = styled('button')`
//   display: inline-block;
//   padding: 0.25rem 0.5rem;
//   border: 1px solid ${props => props.theme.colors.white};
//   border-radius: 3px;
//   background-color: ${props => props.theme.colors.white};
//   color: ${props => props.theme.colors.brand};
//   font-size: 0.8rem;
//   text-transform: uppercase;
//   letter-spacing: 1px;
//   cursor: pointer;
//   transition: all 0.3s ease;

//   &:hover,
//   &:focus {
//     background-color: transparent;
//     color: ${props => props.theme.colors.white};
//   }
// `

export const logoutApplication = () => {
  if(sessionStorage.getItem('USER_ACTIVE_SESSION') === 'true'){
    let obj = {
      email : localStorage.getItem('userMail'),
      type : sessionStorage.getItem('TYPE'),
      activeflag : false
    }
    axios.post(process.env.REACT_APP_NEW_BASE_URL_NOTIFICATION + 'updateSession', obj)
      .then(response => {
        localStorage.clear();
        sessionStorage.clear();
        window.location.replace(window.location.href + 'login')
      }).catch(err =>{
      console.log(err);
    });

  } else {
    Auth.signOut();
    localStorage.clear();
    sessionStorage.clear();
    // window.location.reload();
    window.location.replace(window.location.href + 'login')
  }
}


const Header: React.SFC<any> = (props) => {

  const [showBackBtn, toggleBackBtn] = useState(false);
  const [showLogoutConfirm, toggleLogoutConfirm] = useState(false);
  let history = useHistory();
  let location = useLocation();
  useEffect(() => {
    // console.log('poprs::', location)
    if (location.pathname == '/') {
      toggleBackBtn(false)
    } else {
      toggleBackBtn(true)
    }
  });

  const onGoBack = () => {
    console.log('location.pathname::', location.pathname)
    if (location.pathname == '/healthqns') {
      if (props.healthqnInEditMode) {
        props.toggleExitHealthqnAlert(true);
      } else {
        openPage('');
      }
    } else {
      openPage('');
    }
  }
  const openPage = (page: string) => {
    console.log(location)
    history.push("/" + page + location.hash + location.search);
  }
  const onLogoutClick = () => {
    if (location.pathname == '/healthqns') {
      if (props.healthqnInEditMode) {

        props.toggleExitHealthqnAlert(true, 'Logout');
      } else {
        toggleLogoutConfirm(true);
      }
    } else {
      toggleLogoutConfirm(true);
    }
  }

  const closeConfirmation = () => {
    toggleLogoutConfirm(false);
  }
  const logoutApp = () => {
    closeConfirmation();
    logoutApplication();
  }

  const onHeaderImgClick = () => {
    if (location.pathname == '/healthqns') {
      if (props.healthqnInEditMode) {
        props.toggleExitHealthqnAlert(true);
      } else {
        openPage('');
      }
    } else {
      openPage('');
    }
  }

  return (
    <Wrapper>
      <AppBar position="fixed" style={{ backgroundColor: 'white', height: '75px' }}>
        <HeaderInner style={{ margin: 0, marginTop: '10px' }}>
          {/* <Link to="/" >

          </Link> */}
          <HeaderLeft onClick={onHeaderImgClick} style={{ cursor: 'pointer',height: 'auto' }} >
            <LogoLeft src={require("../../assets/media/UHS Logo.png")} />
          </HeaderLeft>
          <HeaderRight>
            {/*  <LayoutContainer>
          {({ theme, setTheme }) => (
            <>
              <CurrentTheme>Current theme: {theme}</CurrentTheme>
              <ThemeSwitcherButton onClick={() => setTheme(theme === 'light' ? 'dark' : 'light')}>Switch theme</ThemeSwitcherButton>
            </>
          )}
        </LayoutContainer>*/}
            {/* <LogoRight> add right logo if you wish</LogoRight> */}

          </HeaderRight>
        </HeaderInner>
      </AppBar>
      <AppBar position="static" style={{
        height: '47.3px',
        boxShadow: '0 4px 4px 0 rgba(0, 0, 0, 0.24),0 0 4px 0 rgba(0, 0, 0, 0.12)',
        backgroundColor: '#33afb0',
        marginTop: '75px'
      }}>
        <HeaderInner style={{ margin: 0, width: '100%', maxWidth: '100%' }}>

          <HeaderLeft style={{
            // width: '128px',
            height: '24px',
            fontFamily: 'Candara',
            fontSize: '16px',
            fontWeight: 'bold',
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.5',
            letterSpacing: '0.15px',
            color: '#ffffff',
            textAlign: 'center',
            margin: showBackBtn ? '' : '10px',
            marginLeft: showBackBtn ? '' : '15px'
          }}>
            <IconButton hidden={!showBackBtn} style={{ color: 'white' }} aria-label="delete" onClick={onGoBack}>
              <ArrowBackIcon />
            </IconButton>

            Member Services
          </HeaderLeft>

          <HeaderRight style={{
            margin: '10px',
            width: '56px',
            height: '24px',
            fontFamily: 'Roboto',
            fontSize: '14px',
            fontWeight: 500,
            fontStretch: 'normal',
            fontStyle: 'normal',
            lineHeight: '1.5',
            letterSpacing: '0.25px',
            color: '#ffffff',
            textAlign: 'center',
            marginRight: '15px',


          }}  >
            {/* href={process.env.REACT_APP_LOGOUT_URL} */}
            <a>
              <label style={{
                color: 'white', cursor: 'pointer', fontFamily: 'Candara', fontSize: '14px',
                fontWeight: 'bold',
                fontStretch: 'normal',
                fontStyle: 'normal',
                lineHeight: '0.79',
                letterSpacing: '0.25px'
              }} onClick={() => onLogoutClick()} > LOGOUT</label>  </a>
          </HeaderRight>
        </HeaderInner>
      </AppBar>
      {/* <LogoutConfirmation handleOpen={showLogoutConfirm} handleClose={closeConfirmation} handleYes={logoutApp} /> */}

      <Alert open={showLogoutConfirm} handleCancel={closeConfirmation} handleContinue={logoutApp} />
    </Wrapper>
  )
}

export default Header
