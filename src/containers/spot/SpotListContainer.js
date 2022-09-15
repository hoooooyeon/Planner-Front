import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { getAreas, listSpots } from '../../modules/spotModule';

const SpotListContainer = ({ areas, spots, spotError, getAreas, listSpots }) => {
  useEffect(() => {
    getAreas();
  }, [getAreas]);

  return <SpotList areas={areas} spots={spots} spotError={spotError} listSpots={listSpots} />;
};

const mapStateToProps = (state) => ({
  areas: state.spotReducer.areas,
  spots: state.spotReducer.spots,
  spotError: state.spotReducer.spotError,
});
const mapDispatchToProps = (dispatch) => ({
  getAreas: () => {
    dispatch(getAreas());
  },
  listSpots: () => {
    dispatch(listSpots());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
