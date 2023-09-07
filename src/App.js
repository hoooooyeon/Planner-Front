import './App.css';
import './css/theme.css';
import { Route, Switch } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import ProfilePage from './pages/account/ProfilePage';
import PlannerInfoPage from './pages/planner/PlannerInfoPage';
import PlannerEditPage from './pages/planner/PlannerEditPage';
import PlannerListPage from './pages/planner/PlannerListPage';
import ReviewPage from './pages/review/ReviewPage';
import ReviewPostPage from './pages/review/ReviewPostPage';
import ReviewPostViewerPage from './pages/review/ReviewPostViewerPage';
import SpotPage from './pages/SpotPage';
import FindAccountPage from './pages/account/FindAccountPage';

const App = () => {
    return (
        <Switch>
            <Route path="/" render={HomePage} exact />
            <Route path="/Login" render={LoginPage} />
            <Route path="/Register" render={RegisterPage} />
            <Route path="/FindAccount" render={FindAccountPage} />
            <Route path="/Spot" component={SpotPage} />
            <Route path="/Profile" render={ProfilePage} />
            <Route exact path="/reviews" component={ReviewPage} />
            <Route exact path={['/reviews/write', '/reviews/edit']} component={ReviewPostPage} />
            <Route exact path="/reviews/:reviewId" component={ReviewPostViewerPage} />
            <Route path="/Planners/edit/:plannerId" render={PlannerEditPage} />
            <Route path="/Planners/:plannerId" render={PlannerInfoPage} />
            <Route path="/Planners" render={PlannerListPage} />
        </Switch>
    );
};

export default App;
