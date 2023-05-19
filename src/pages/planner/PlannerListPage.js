import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import MyPlannerListContainer from '../../containers/planner/list/MyPlannerListContainer';
import ShareListContainer from '../../containers/planner/list/ShareListContainer';
import PlannerListPaginationContainer from '../../containers/planner/list/PlannerListPaginationContainer';

const PlannerListPage = () => {
    return (
        <>
            <Header />
            <MyPlannerListContainer />
            <ShareListContainer />
            <PlannerListPaginationContainer />
            <Footer />
        </>
    );
};
export default PlannerListPage;
