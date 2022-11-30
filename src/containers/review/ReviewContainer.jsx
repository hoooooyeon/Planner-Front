import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Review from '../../components/review/Review';
import { loadReviewListAction } from '../../modules/reviewModule';

const ReviewContainer = () => {
    const dispatch = useDispatch();
    const { reviewList, status } = useSelector(({ reviewReducer }) => ({
        reviewList: reviewReducer.reviewList,
        //review: reviewReducer.review,
        //status: reviewReducer.status,
    }));

    const areaCodes = {
        12: '관광지',
        15: '행사/공연/축제',
        14: '문화시설',
        25: '여행코스',
        28: '레포츠',
        32: '숙박',
        38: '쇼핑',
        39: '음식점',
    };
    const [selectAreaCode, setSelectAreaCode] = useState('');
    const onSelectChange = (value) => {
        setSelectAreaCode(value);
    };

    // 리스트 가져오기
    useEffect(() => {
        dispatch(loadReviewListAction());
    }, []);

    return <Review reviewList={reviewList} areaCodes={areaCodes} selectAreaCode={selectAreaCode} onSelectChange={onSelectChange} />;
};

export default ReviewContainer;
