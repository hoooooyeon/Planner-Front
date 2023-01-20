import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import palette from '../../lib/styles/palette';

const SpotItemBlock = styled.li`
    flex-shrink: 0;
    width: 200px;
    float: left;
    border-radius: 2px;
    box-shadow: 3px 3px 7px 1px ${palette.gray[1]};
    /* padding: 0 6px 12px; */
    margin: 0.5%;
    position: relative;
    @media all and (min-width: 768px) {
        width: 24%;
    }
    &:hover {
        cursor: pointer;
    }
`;

const ImgBox = styled.div`
    background-color: lightgray;
    padding: 0;
    margin: 0;
    overflow: hidden;
    position: relative;
    height: 150px;

    @media all and (min-width: 960px) {
        height: 200px;
    }
    @media all and (min-width: 1280px) {
        height: 250px;
    }
`;

const Img = styled.img`
    width: 100%;
    height: 150px;
    border: none;
    margin: 0;
    padding: 0;

    -webkit-user-drag: none;
    @media all and (min-width: 960px) {
        height: 200px;
    }
    @media all and (min-width: 1280px) {
        height: 250px;
    }
`;

const Name = styled.div`
    position: relative;
    bottom: 0;
    height: 35px;
    line-height: 35px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding: 0 10px;
    font-weight: bold;
    background-color: white;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? 'yellow' : 'lightgray')};
`;

const SpotItem = ({ spot, onChangeErrorImg, onOpenDetail }) => {
    const { title, firstimage, like } = spot.info;

    return (
        <SpotItemBlock
            onClick={() => {
                onOpenDetail(spot);
            }}
        >
            <ImgBox>
                <Img src={firstimage} alt={title} onError={onChangeErrorImg} />
                <IconBox>
                    <StyledFontAwesomeIcon icon={faStar} like={like} />
                </IconBox>
            </ImgBox>
            <Name>{title}</Name>
        </SpotItemBlock>
    );
};

export default SpotItem;
