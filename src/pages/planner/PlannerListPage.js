import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import MyPlannerListContainer from '../../containers/planner/list/MyPlannerListContainer';
import ShareListContainer from '../../containers/planner/list/ShareListContainer';
import ShareListPaginationContainer from '../../containers/planner/list/ShareListPaginationContainer';

const PlannerListPage = () => {
    return (
        <>
            <Header />
            <MyPlannerListContainer />
            <ShareListContainer />
            <ShareListPaginationContainer />
            <Footer />
        </>
    );
};
export default PlannerListPage;
