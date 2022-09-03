import { connect } from 'react-redux';
import SpotMenu from '../../components/spot/SpotMenu';
import { listSpots } from '../../modules/spots';
import { useEffect } from 'react';

const SpotInfoContainer = ({ spots, error, loading, listSpots }) => {
  useEffect(() => {
    listSpots();
  }, [listSpots]);

  return <SpotMenu spots={spots} loading={loading} error={error} />;
};

const mapStateToProps = ({ spots, loading }) => ({
  spots: spots.spots,
  error: spots.spotsError,
  loading: loading['spots/LIST_SPOTS'],
});
const mapDispatchToProps = (dispatch) => ({
  listSpots: () => {
    dispatch(listSpots());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SpotInfoContainer);
