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
import FindIdPage from './pages/account/find/FindIdPage';
import ResultFindIdPage from './pages/account/find/ResultFindIdPage';
import UpdatePasswordPage from './pages/account/find/UpdatePasswordPage';
import FindPasswordPage from './pages/account/find/FindPasswordPage';

const App = () => {
    return (
        <Switch>
            <Route path="/" render={HomePage} exact />
            <Route path="/login" render={LoginPage} />
            <Route path="/register" render={RegisterPage} />
            <Route path="/findId" render={FindIdPage} />
            <Route path="/resultFindId" render={ResultFindIdPage} />
            <Route path="/findPassword" render={FindPasswordPage} />
            <Route path="/updatePassword" render={UpdatePasswordPage} />
            <Route path="/spot" component={SpotPage} />
            <Route path="/Profile" render={ProfilePage} />
            <Route exact path="/reviews" component={ReviewPage} />
            <Route exact path={['/reviews/write', '/reviews/edit']} component={ReviewPostPage} />
            <Route exact path="/reviews/:reviewId" component={ReviewPostViewerPage} />
            <Route path="/planners/edit/:plannerId" render={PlannerEditPage} />
            <Route path="/planners/:plannerId" render={PlannerInfoPage} />
            <Route path="/planners" render={PlannerListPage} />
        </Switch>
    );
};

export default App;
