import './App.css';
import { Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import PlannerInfoPage from './pages/planner/PlannerInfoPage';
import PlannerEditPage from './pages/planner/PlannerEditPage';
import PlannerListPage from './pages/planner/PlannerListPage';
import PrivateRoute from './components/common/PrivateRoute';

const App = () => {
    return (
        <>
            <Route path="/" component={HomePage} exact />
            <Route path="/Login" component={LoginPage} />
            <Route path="/Register" component={RegisterPage} />
            <Route path="/Profile" component={ProfilePage} />
            <Route path="/PlannerInfo" component={PlannerInfoPage} />
            <Route path="/PlannerList" component={PlannerListPage} />
            <PrivateRoute path="/PlannerEdit" component={PlannerEditPage} />
        </>
    );
};

export default App;
