
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Login from '../Auth/Login/LoginNav/LoginNav';
import Register from '../Auth/Register/RegisterNav/RegisterNav.js';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import AddPost from '../Posts/AddPost/AddPost';
import { signOut } from '../../store/actions/authActions';
import { changeMode } from '../../store/actions/modalsActions';
import Button from '@material-ui/core/Button';
const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  navLinks: {
    color: 'white',
    textDecoration: 'none',
  },
}));

const Navbar = ({ user, admin, logOut, getPosts, changeMode, mode }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  
    
  

  const resize = () => {
    if (window.innerWidth <= 500) {
      changeMode('mobile');
    } else if (window.innerWidth > 500) {
      changeMode('desktop');
    } 
  };
  
  resize();
  window.addEventListener('resize', resize);

  const handleMenu = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
 
  if(mode === 'desktop') return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.navLinks} to='/'>
              Stickerzzz
            </Link>
          </Typography>
            <Link className={classes.navLinks} to='/postList'>
              <Button color='inherit' >
                Posty
              </Button>
            </Link>

          {!user && (
          <>
            <Login />
            <Register />
          </>
          )}

          
          
          {user && (
            <>
              <AddPost />
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
          
          {user && (
            <Link className={classes.navLinks} to='/myProfile'>
              <Button color='inherit' >
                Profile
              </Button>
            </Link>
          )}
           {admin && ( 

            <Link className={classes.navLinks} to='/adminDashboard'>
              <Button color='inherit' >
                Admin Dashboard
              </Button>
            </Link>

            
           )}
           
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                {/* <Link to={`/user/${user.username}`} >
                  Mój profil
                </Link> */}
              </MenuItem>
              <MenuItem onClick={()=>{
                logOut();
                handleClose();
              }}>Log out</MenuItem>
            </Menu>
          

        </Toolbar>
      </AppBar>
    </div>
  ); else return (
    <div className={classes.root}>
      <AppBar position='fixed'>
        <Toolbar>
          <Typography variant='h6' className={classes.title}>
            <Link className={classes.navLinks} to='/'>
              Stickerzzz
            </Link>
          </Typography>


          {!user && (
          <>
            <Login />
            <Register />
          </>
          )}

          
          
          {user && (
            <>
              <AddPost />
              <IconButton
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleMenu}
                color='inherit'
              >
                <AccountCircle />
              </IconButton>
            </>
          )}
          
         
          
           
            <Menu
              id='menu-appbar'
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>
                <Link to={`/postList`} >
                  Posty
                </Link>
              </MenuItem>
              {user && (
              <MenuItem onClick={handleClose}>
                <Link to={`/myProfile`} >
                  Mój profil
                </Link>
              </MenuItem>
              )}
              {admin && ( 
              <MenuItem onClick={handleClose}>
                <Link to={`/adminDashboard`} >
                  Admin dashboard
                </Link>
              </MenuItem>
              )}
              <MenuItem onClick={()=>{
                logOut();
                handleClose();
              }}>Log out</MenuItem>
            </Menu>
          

        </Toolbar>
      </AppBar>
    </div>
  )
};


const mapStateToProps = state => {
  return {
    user: state.auth.user,
    admin: state.auth.admin,
    mode: state.modals.mode
  }
}

const mapDispatchToProps = dispatch => {
  return {
    logOut: () => dispatch(signOut()),
    changeMode: mode => dispatch(changeMode(mode))
  }
  
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar);
