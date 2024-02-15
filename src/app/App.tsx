import './App.css';

import Header from './Header/Header';
import LandingPage from './LandingPage/LandingPage';
import { ServiceProvider } from './LandingPage/ServiceContext';

const App = () => {
  return (
    <>
      <ServiceProvider>
        <Header />
        <LandingPage />
      </ServiceProvider>
    </>
  );
};

export default App;
