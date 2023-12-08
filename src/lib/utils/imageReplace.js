// 에러 이미지 대체
import spotErrorImg from '../../lib/images/spotErrorImg.jpg';
import plannerErrorImg from '../../lib/images/plannerErrorImg.png';

export const replaceImageOnError = (e, name) => {
    if (name == 'planner') {
        e.target.src = plannerErrorImg;
    } else if (name == 'spot') {
        e.target.src = spotErrorImg;
    }
};
