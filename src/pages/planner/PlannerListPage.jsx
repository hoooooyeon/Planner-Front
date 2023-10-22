import Footer from '../../components/common/Footer';
import MyPlannerListContainer from '../../containers/planner/list/MyPlannerListContainer';
import ShareListContainer from '../../containers/planner/list/ShareListContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const PlannerListPage = () => {
    return (
        <>
            <HeaderContainer />
            <MyPlannerListContainer />
            <ShareListContainer />
            <Footer />
        </>
    );
};
export default PlannerListPage;
