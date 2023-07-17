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
            <Route path="/" render={HomePage} exact />
            <Route path="/Login" render={LoginPage} />
            <Route path="/Register" render={RegisterPage} />
            <Route path="/Profile" render={ProfilePage} />
            <Route path="/PlannerInfo" render={PlannerInfoPage} />
            <Route path="/PlannerList" render={PlannerListPage} />
            <Route path="/PlannerEdit" render={PlannerEditPage} />
            {/* <Route path="/PlannerEdit" render={() => <PrivateRoute compo={PlannerEditPage} path="/PlannerEdit" redirect="/login" />} /> */}
        </>
    );
};

export default App;
