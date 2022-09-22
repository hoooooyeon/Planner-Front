import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import palette from '../../lib/styles/palette';

const SpotItemBlock = styled.div`
    width: 280px;
    height: 320px;
    margin: 10px;
    /* text-align: center; */
    border: 1px solid ${palette.ivory[0]};
    border-radius: 5%;
    box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
    p {
        position: relative;
        bottom: 30px;
        /* left: 10px; */
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 10px;
    }
    &:hover {
        cursor: pointer;
    }
`;

const SimpleImg = styled.img`
    width: 280px;
    height: 270px;
    border-radius: 5% 5% 0 0;
`;

const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    position: relative;
    bottom: 30px;
    left: 255px;
    color: white;
`;

const SpotItem = ({ spot, onErrorImg, detailSpot }) => {
    const { title, firstimage, contentid } = spot;
    return (
        <SpotItemBlock onClick={() => detailSpot(contentid)}>
            <SimpleImg src={firstimage} alt={title} onError={onErrorImg} />
            <StyledFontAwesomeIcon icon={faStar} />
            <p>{title}</p>
        </SpotItemBlock>
    );
};

export default SpotItem;
