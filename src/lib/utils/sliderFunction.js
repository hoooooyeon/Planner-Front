
  let currentPosition = 0; // 이전에 이동한 좌표
    // let sliderStatus = false; // mouseMove 실행 조건
    let sliderStartX = 0; // mousedown: 마우스 다운된 좌표
    let sliderMoving = 0; // mousemove: 이전 좌표 + 현재 마우스가 이동한 좌표
    let valueStatus = false;

    // 슬라이드 마우스 다운
    export const sliderStart = (e, sliderStatus) => {
        sliderStartX = e.clientX;
        sliderStatus = true;
        valueStatus = sliderStatus;
    };

    // 슬라이드 마우스 이동
    export const sliderMove = (e, valueRef, sliderStatus) => {
      
        if (valueStatus) {
            sliderMoving = currentPosition + e.clientX - sliderStartX;

            valueRef.current.style = 'transform: translateX(' + sliderMoving + 'px)';
            valueRef.current.style.transitionDuration = '0s';
        }
    };

    // 슬라이드 마우스 업
    export const sliderEnd = (valueRef, valueBoxRef, sliderStatus) => {
        let itemBoxSize = valueBoxRef.current.getBoundingClientRect();
        let sliderEndX = sliderMoving;

        if (sliderEndX > 0) {
            sliderEndX = 0;
        } else if (sliderEndX < itemBoxSize.width - valueRef.current.scrollWidth) {
            sliderEndX = itemBoxSize.width - valueRef.current.scrollWidth;
        }

        valueRef.current.style = 'transform: translateX(' + sliderEndX + 'px)';
        valueRef.current.style.transitionDuration = ' 1s';
        currentPosition = sliderEndX;
        valueStatus = false;
    };
