import { useEffect } from 'react';
import { connect } from 'react-redux';
import SpotList from '../../components/spot/SpotList';
import { detailSpot, getAreas, listSpots, unloadDetailSpot } from '../../modules/spotModule';

const SpotListContainer = ({ areas, spots, detail, spotError, getAreas, listSpots, detailSpot, unloadDetailSpot }) => {
  useEffect(() => {
    getAreas();
  }, [getAreas]);

  return (
    <SpotList
      areas={areas}
      spots={spots}
      detail={detail}
      spotError={spotError}
      listSpots={listSpots}
      detailSpot={detailSpot}
      unloadDetailSpot={unloadDetailSpot}
    />
  );
};

const mapStateToProps = (state) => ({
  areas: state.spotReducer.areas,
  spots: state.spotReducer.spots,
  detail: state.spotReducer.detail,
  spotError: state.spotReducer.spotError,
});
const mapDispatchToProps = (dispatch) => ({
  getAreas: () => {
    dispatch(getAreas());
  },
  listSpots: (areacode) => {
    dispatch(listSpots(areacode));
  },
  detailSpot: (id) => {
    dispatch(detailSpot(id));
  },
  unloadDetailSpot: () => {
    dispatch(unloadDetailSpot());
  },
});
export default connect(mapStateToProps, mapDispatchToProps)(SpotListContainer);
