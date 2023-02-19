import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import PlannerList from '../../components/planner/list/PlannerList';
import ListPagination from '../../components/planner/list/ListPagination';
import ShareList from '../../components/planner/list/ShareList';

const PlannerListPage = () => {
    return (
        <>
            <Header />
            <PlannerList />
            <ShareList />
            <ListPagination />
            <Footer />
        </>
    );
};
export default PlannerListPage;
