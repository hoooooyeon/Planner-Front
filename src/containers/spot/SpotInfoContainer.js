import { connect } from 'react-redux';
import SpotInfo from '../../components/spot/SpotInfo';
import { readSpot } from '../../modules/spot';
import { useEffect } from 'react';

const SpotInfoContainer = ({ spot, error, loading, readSpot }) => {
  useEffect(() => {
    readSpot();
  }, [readSpot]);

  return <SpotInfo spot={spot} loading={loading} error={error} />;
};

const mapStateToProps = ({ spot }) => ({
  spot: spot.spot,
  error: spot.spotError,
  //loading: spot.loading['spot/READ_SPOT'],
});
const mapDispatchToProps = (dispatch) => ({
  readSpot: () => {
    dispatch(readSpot());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotInfoContainer);
