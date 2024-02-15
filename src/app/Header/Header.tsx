import { AppBar, Toolbar } from '@mui/material';
import './Header.css';

const HEADER_TEXT = 'Device Booking System';
const POSITION = "static";
const Header = () => {
  return (
    <>
      <AppBar position={POSITION}>
        <Toolbar>
          <h2>{HEADER_TEXT}</h2>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
