import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';

const App = () => {
    return (
        <>
            <Route path="/" component={HomePage} exact />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Register" component={RegisterPage} />
            <Route path="/Profile" component={ProfilePage} />
        </>
    );
};

export default App;
