import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import SpotSlider from '../../components/spot/SpotSlider';
import { loadSliderSpotsAction } from '../../modules/spotModule';

const SpotSliderContainer = () => {
    const dispatch = useDispatch();
    const { sliderSpots } = useSelector(({ spotReducer }) => ({
        sliderSpots: spotReducer.sliderSpots,
    }));

    const sliderList = [
        { title: '강남', image: 'http://tong.visitkorea.or.kr/cms/resource/08/1984608_image2_1.jpg' },
        { title: '한라산 (제주도 국가지질공원)', image: 'http://tong.visitkorea.or.kr/cms/resource/99/2870099_image2_1.jpg' },
        { title: '광안리해수욕장', image: 'http://tong.visitkorea.or.kr/cms/resource/75/2648975_image2_1.jpg' },
    ];

    useEffect(() => {
        sliderList.map((s) => {
            return;
        });
    });

    return <SpotSlider />;
};

export default SpotSliderContainer;
