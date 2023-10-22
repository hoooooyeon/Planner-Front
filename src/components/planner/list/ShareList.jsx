import { useRef } from 'react';
import styled from 'styled-components';
import Slider from '../../common/Slider';
import ShareListSearchForm from './ShareListSearchForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import errorImg from '../../../lib/images/plannerErrorImg.png';
import { handleErrorImg } from '../../../lib/utils/CommonFunction';
import Empty from '../../common/Empty';
import ErrorModal from '../../common/ErrorModal';
import Loading from '../../common/Loading';
import Pagination from '../../common/Pagination.js';

const ShareListBlock = styled.div`
    width: 100%;
    height: 100%;
    padding: 1rem 0;
    background-color: ${(props) => props.theme.primaryBackgroundColor};
`;

const Container = styled.div`
    margin: 0 auto;
    padding: 1rem;
    min-height: 40rem;
    @media all and (min-width: 768px) {
        padding: 1rem 9rem;
    }
`;

const HeaderTitle = styled.div`
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 1rem;
`;

const Shares = styled.ul`
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    width: 100%;
    height: 100%;
    margin: 0 auto;
`;

const ShareItem = styled.li`
    flex-shrink: 0;
    width: 200px;
    height: 200px;
    float: left;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    border-radius: 0.5rem;
    margin: 0.5%;
    position: relative;
    cursor: pointer;
    @media all and (min-width: 768px) {
        width: 24%;
        height: auto;
    }
    &:hover {
        box-shadow: 0px 1px 6px ${(props) => props.theme.shadowColor};
    }
    a {
        color: ${(props) => props.theme.secondaryColor};
    }
`;

const InfoBox = styled.div`
    height: 2.5rem;
    margin: 0;
    padding: 0.5rem;
    box-shadow: 0px 1px 3px ${(props) => props.theme.shadowColor};
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
`;

const Title = styled.div`
    font-size: 0.8rem;
    font-weight: bold;
    overflow: hidden;
`;
const Date = styled.div`
    font-size: 0.4rem;
    color: ${(props) => props.theme.tertiaryColor};
    margin-top: 0.6rem;
    overflow: hidden;
`;

const ImgBox = styled.div`
    margin: 0;
    overflow: hidden;
    position: relative;
    padding-top: 90%;
    width: 100%;
    border-radius: 0.5rem 0.5rem 0 0;
    @media all and (max-width: 767px) {
        padding-top: 75%;
    }
`;
const Img = styled.img`
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
    border: none;
    border-radius: 0.5rem 0.5rem 0 0;
    margin: 0;
    display: block;
    -webkit-user-drag: none;
    object-fit: cover;
`;

const IconBox = styled.div`
    position: absolute;
    right: 0;
    bottom: 0;
    padding: 5px;
`;
const StyledFontAwesomeIcon = styled(FontAwesomeIcon)`
    color: ${(props) => (props.like ? ` ${props.theme.likeButtonColor}` : 'rgba(0,0,0,0)')};
`;

const ErrorDiv = styled.div`
    color: ${(props) => props.theme.tertiaryColor};
    font-weight: bold;
    text-align: center;
    margin-top: 2rem;
`;

const ShareList = ({
    sharePlanners,
    loading,
    keyword,
    plannerError,
    page,
    sortCriteria,
    onCloseError,
    onClickPlanner,
    onChangeKeyword,
    onChangeResultKeyword,
    onChangeSort,
    drag,
    onIndexPage,
    onNextPage,
    onPreviousPage,
    onFirstPage,
    onLastPage,
}) => {
    const itemRef = useRef();
    return (
        <ShareListBlock>
            <Container>
                <HeaderTitle>다른 이용자들의 플래너</HeaderTitle>
                <ShareListSearchForm
                    keyword={keyword}
                    sortCriteria={sortCriteria}
                    onChangeKeyword={onChangeKeyword}
                    onChangeResultKeyword={onChangeResultKeyword}
                    onChangeSort={onChangeSort}
                />
                {loading && Object.keys(sharePlanners).length <= 0 ? (
                    <Loading />
                ) : Object.keys(sharePlanners).length > 0 && sharePlanners.list.length > 0 ? (
                    <Slider list={sharePlanners.list} itemRef={itemRef} scroll={true} drag={drag}>
                        <Shares>
                            {sharePlanners.list.map((p) => (
                                <ShareItem
                                    key={p.plannerId}
                                    ref={itemRef}
                                    id={p.plannerId}
                                    onClick={() => {
                                        onClickPlanner(p.plannerId);
                                    }}
                                >
                                    <ImgBox>
                                        <Img
                                            src={p.thumbnail}
                                            alt={p.title}
                                            onError={(e) => {
                                                handleErrorImg({ e, errorImg });
                                            }}
                                        />
                                        <IconBox>
                                            <StyledFontAwesomeIcon
                                                icon={faStar}
                                                like={p.likeState ? p.likeState.toString() : undefined}
                                            />
                                        </IconBox>
                                    </ImgBox>
                                    <InfoBox>
                                        <Title>{p.title}</Title>
                                        <Date>
                                            {p.planDateStart} ~ {p.planDateEnd}
                                        </Date>
                                    </InfoBox>
                                </ShareItem>
                            ))}
                        </Shares>
                    </Slider>
                ) : (
                    <Empty text="플래너" />
                )}
                <Pagination
                    totalCount={sharePlanners.totalCount}
                    page={page}
                    itemIndex={12}
                    onIndexPage={onIndexPage}
                    onNextPage={onNextPage}
                    onPreviousPage={onPreviousPage}
                    onFirstPage={onFirstPage}
                    onLastPage={onLastPage}
                />
            </Container>
            {plannerError && (
                <ErrorModal errorState={plannerError} errorMessage={plannerError} onCloseError={onCloseError} />
            )}
        </ShareListBlock>
    );
};

export default ShareList;
