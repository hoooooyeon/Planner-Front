import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import palette from '../../lib/styles/palette';
import { useEffect, useState } from 'react';

const SpotItemBlock = styled.div`
    width: 280px;
    height: 320px;
    margin: 10px;
    border: 1px solid ${palette.ivory[0]};
    border-radius: 5%;
    box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
    p {
        position: relative;
        bottom: 30px;
        font-size: 1.2rem;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding: 0 10px;
        font-weight: bold;
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
    color: ${(props) => (props.like ? 'yellow' : 'lightgray')};
`;

const SpotItem = ({ spot, onChangeErrorImg, onLoadDetailSpot }) => {
    const { title, firstimage, contentid } = spot.info;
    const { like } = spot;

    return (
        <SpotItemBlock onClick={() => onLoadDetailSpot(contentid)}>
            <SimpleImg src={firstimage} alt={title} onError={onChangeErrorImg} />
            <StyledFontAwesomeIcon icon={faStar} like={like} />
            <p>{title}</p>
        </SpotItemBlock>
    );
};

export default SpotItem;
