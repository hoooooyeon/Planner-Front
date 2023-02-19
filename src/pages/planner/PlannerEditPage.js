import Footer from '../../components/common/Footer';
import Header from '../../components/common/Header';
import EditMap from '../../components/planner/edit/EditMap';
import EditRoute from '../../components/planner/edit/EditRoute';
import EditList from '../../components/planner/edit/EditList';

const PlannerEditPage = () => {
    return (
        <>
            <Header />
            <EditRoute />
            <EditMap />
            <EditList />
            <Footer />
        </>
    );
};
export default PlannerEditPage;
