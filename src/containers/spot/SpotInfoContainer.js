import { connect } from 'react-redux';
import SpotInfo from '../../components/spot/SpotInfo';

const SpotInfoContainer = () => {
  return <SpotInfo />;
};

const mapStateToProps = () => ({});
const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(SpotInfoContainer);
