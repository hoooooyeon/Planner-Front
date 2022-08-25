import styled from 'styled-components';
import RouteSpot from './RouteSpot';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { faBed } from '@fortawesome/free-solid-svg-icons';
import { faUtensils } from '@fortawesome/free-solid-svg-icons';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const EditListBlock = styled.div`
  border: 1px solid red;
  width: 320px;
`;

const MenuList = styled.div`
  width: 320px;
  display: flex;
`;

const MenuItem = styled.div`
  border: 1px solid lightblue;
  border-radius: 10%;
  width: 80px;
  height: 80px;
  font-size: 1rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  & + & {
    margin-left: 1px;
  }
  p {
    line-height: 1px;
    color: lightblue;
    font-size: bolder;
  }
`;

const SpotList = styled.div`
  padding: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
  width: 2rem;
  height: 2rem;
`;
const EditList = () => {
  return (
    <EditListBlock>
      <MenuList>
        <MenuItem>
          <StyledFontAwesomeIcon icon={faLocationDot} />
          <p>관광지</p>
        </MenuItem>
        <MenuItem>
          <StyledFontAwesomeIcon icon={faBed} />
          <p>숙소</p>
        </MenuItem>
        <MenuItem>
          <StyledFontAwesomeIcon icon={faUtensils} />
          <p>식당</p>
        </MenuItem>
        <MenuItem>
          <StyledFontAwesomeIcon icon={faHeart} />
          <p>좋아요</p>
        </MenuItem>
      </MenuList>
      <SpotList>
        <RouteSpot type="add" />
      </SpotList>
    </EditListBlock>
  );
};

export default EditList;
