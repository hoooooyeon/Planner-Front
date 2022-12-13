import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SpotPage from './pages/SpotPage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import MyLikePage from './pages/account/MyLikePage';

const App = () => {
  return (
    <>
      <Route path="/" component={HomePage} exact />
      <Route path="/Spot" component={SpotPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/Register" component={RegisterPage} />
      <Route path="/Profile" component={ProfilePage} />
      <Route path="/MyLike" component={MyLikePage} />
    </>
  );
};

export default App;
