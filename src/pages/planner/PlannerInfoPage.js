import Header from '../../components/common/Header';
import Footer from '../../components/common/Footer';
import PlannerInfoContainer from '../../containers/planner/info/PlannerInfoContainer';
import InfoPostContainer from '../../containers/planner/info/InfoPostContainer';
import MemberModalContainer from '../../containers/planner/MemberModalContainer';
import PlannerInfoModalContainer from '../../containers/planner/PlannerInfoModalContainer';

const PlannerInfoPage = () => {
    return (
        <>
            <Header />
            <PlannerInfoContainer />
            <InfoPostContainer />
            <MemberModalContainer />
            <PlannerInfoModalContainer />
            <Footer />
        </>
    );
};

export default PlannerInfoPage;
