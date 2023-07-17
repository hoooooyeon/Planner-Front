import './App.css';
import { Route, Switch } from 'react-router-dom';
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
        <Switch>
            <Route path="/" render={HomePage} exact />
            <Route path="/Login" render={LoginPage} />
            <Route path="/Register" render={RegisterPage} />
            <Route path="/Profile" render={ProfilePage} />
            <Route path="/PlannerInfo" render={PlannerInfoPage} />
            <Route path="/PlannerList" render={PlannerListPage} />
            <PrivateRoute path="/PlannerEdit" render={PlannerEditPage} redirect="/login" />
        </Switch>
    );
};

export default App;
