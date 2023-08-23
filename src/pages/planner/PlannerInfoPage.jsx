import Footer from '../../components/common/Footer';
import PlannerInfoContainer from '../../containers/planner/info/PlannerInfoContainer';
import InfoPostContainer from '../../containers/planner/info/InfoPostContainer';
import MemberModalContainer from '../../containers/planner/MemberModalContainer';
import PlannerInfoModalContainer from '../../containers/planner/PlannerInfoModalContainer';
import HeaderContainer from '../../containers/common/HeaderContainer';

const PlannerInfoPage = () => {
    return (
        <>
            <HeaderContainer />
            <PlannerInfoContainer />
            <InfoPostContainer />
            <MemberModalContainer />
            <PlannerInfoModalContainer />
            <Footer />
        </>
    );
};

export default PlannerInfoPage;
