import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import Review from '../../components/review/ReviewList';
import { initializeReviewAction, loadReviewListAction } from '../../modules/reviewModule';

const ReviewContainer = ({ history, location, match }) => {
    const dispatch = useDispatch();
    const { reviewList, page, status } = useSelector(({ reviewReducer }) => ({
        reviewList: reviewReducer.reviewList,
        page: reviewReducer.page,
        //review: reviewReducer.review,
        //status: reviewReducer.status,
    }));

    const areaCodes = [
        { id: '0', value: '전체' },
        { id: '1', value: '서울' },
        { id: '2', value: '인천' },
        { id: '3', value: '대전' },
        { id: '4', value: '대구' },
        { id: '5', value: '광주' },
        { id: '6', value: '부산' },
        { id: '7', value: '울산' },
        { id: '8', value: '세종특별자치시' },
        { id: '31', value: '경기도' },
        { id: '32', value: '강원도' },
        { id: '33', value: '충청북도' },
        { id: '34', value: '충청남도' },
        { id: '35', value: '경상북도' },
        { id: '36', value: '경상남도' },
        { id: '37', value: '전라북도' },
        { id: '38', value: '전라남도' },
        { id: '39', value: '제주도' },
    ];
    const [selectAreaCode, setSelectAreaCode] = useState({});
    const onSelectChange = (value) => {
        setSelectAreaCode({ ...value });
    };

    const onReviewWriteClick = () => {
        history.push(`/reviews/write`);
    };

    const onItemClick = (reviewId) => {
        history.push(`/reviews/${reviewId}`);
    };

    useEffect(() => {
        dispatch(initializeReviewAction({ property: 'review' }));
    }, []);

    // 리스트 가져오기
    useEffect(() => {
        dispatch(loadReviewListAction(page));
    }, [dispatch, page]);

    return (
        <Review
            reviewList={reviewList}
            areaCodes={areaCodes}
            selectAreaCode={selectAreaCode}
            onSelectChange={onSelectChange}
            onReviewWriteClick={onReviewWriteClick}
            onItemClick={onItemClick}
        />
    );
};

export default withRouter(ReviewContainer);
