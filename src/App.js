import './App.css';
import { Route } from 'react-router-dom';
import MainPage from './pages/MainPage';
import PlannerListPage from './pages/planner/PlannerListPage';
import PlannerInfoPage from './pages/planner/PlannerInfoPage';
import PlannerEditPage from './pages/planner/PlannerEditPage';
import ReviewInfoPage from './pages/review/ReviewInfoPage';
import ReviewListPage from './pages/review/ReviewListPage';
import ReviewWritePage from './pages/review/ReviewWritePage';
import ShareInfoPage from './pages/share/ShareInfoPage';
import ShareListPage from './pages/share/ShareListPage';
import SpotPage from './pages/SpotPage';
import LoginPage from './pages/account/LoginPage';
import RegisterPage from './pages/account/RegisterPage';
import MyPage from './pages/account/MyPage';
import MyLikePage from './pages/account/MyLikePage';

<<<<<<< HEAD
const App = () => {
  return (
    <>
      <MainPage />
      <Route path="/" component={MainPage} exact />
      <Route path="/PlannerList" component={PlannerListPage} />
      <Route path="/PlannerInfo" component={PlannerInfoPage} />
      <Route path="/PlannerEdit" component={PlannerEditPage} />
      <Route path="/ReviewInfo" component={ReviewInfoPage} />
      <Route path="/ReviewList" component={ReviewListPage} />
      <Route path="/ReviewWrite" component={ReviewWritePage} />
      <Route path="/ShareInfo" component={ShareInfoPage} />
      <Route path="/ShareList" component={ShareListPage} />
      <Route path="/Spot" component={SpotPage} />
      <Route path="/Login" component={LoginPage} />
      <Route path="/Register" component={RegisterPage} />
      <Route path="/My" component={MyPage} />
      <Route path="/MyLike" component={MyLikePage} />
    </>
=======
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [result, setResult] = useState();

  useEffect(() => {
    axios.get("planner/").then((response) => {
      setResult(response.data);
    })
      .catch((error) => {
        setResult(error);
      })
  });

  return (
    <div>
      {result}
    </div>
>>>>>>> 06cacd6bc3f92272e5ddf30b573f4ccb265c4f15
  );
};

export default App;
