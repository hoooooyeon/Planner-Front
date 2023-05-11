const Drag = () => {
    const plansArr = useRef();
    const item = useRef();
    const overItem = useRef();
    const itemIndex = useRef();
    const overItemIndex = useRef();

    const dragTarget = useRef();
    const overTarget = useRef();

    let index = 0;

    let posY = useRef(0);
    // let originalY = useRef(0);

    const [overTargetArr, setOverTargetArr] = useState([]);
    const [isDrag, setIsDrag] = useState(false);

    // 바꿀 일정의 index 구하기
    const getElementIndex = (p) => {
        plansArr.current = plans;
        return plansArr.current.findIndex((plan) => plan === p);
    };

    // 선택 일정과 바꿀 일정을 바꿈
    const switchItem = () => {
        plansArr.current.splice(itemIndex.current, 1);
        plansArr.current.splice(overItemIndex.current, 0, item.current);
        return plansArr.current;
    };

    // db에서 순서를 세팅할 index를 구함.
    const getIndex = () => {
        let prevIndex;
        let nextIndex;
        let curItemIndex = getElementIndex(item.current);

        if (overItemIndex.current === 0) {
            index = 500;
        } else if (overItemIndex.current === plansArr.current.length - 1) {
            index = 2000;
        } else if (itemIndex) {
            prevIndex = plansArr.current[curItemIndex - 1];
            nextIndex = plansArr.current[curItemIndex + 1];
            index = 1000;
        }
    };

    const onDragStart = (e, plan) => {
        setIsDrag(true);
        // 순서 이동 모션

        // 드래그시 반투명 이미지 제거
        let img = new Image();
        e.dataTransfer.setDragImage(img, 10, 10);

        // 드래그되는 요소
        dragTarget.current = e.currentTarget;
        dragTarget.current.style.zIndex = '100';

        // 마우스 포인터 좌표
        posY.current = e.clientY;

        // 드래그될 요소의 최초 좌표
        // originalY.current = e.currentTarget.offsetTop;

        // 순서 이동 기능
        item.current = plan;
        itemIndex.current = getElementIndex(plan);
    };

    const onDragMove = (e) => {
        if (isDrag) {
            // 마우스 포인터가 이동한 거리
            const diffY = e.clientY - posY.current;

            // 드래그가 가능한 컨테이너 크기
            const containerHeight = containerRef.current.getBoundingClientRect().height;
            const itemHeight = itemRef.current.getBoundingClientRect().height;

            // 드래그되는 모션
            e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * itemIndex.current, diffY), containerHeight - itemHeight * (itemIndex.current + 2))}px`;

            dragTarget.current.style.pointerEvents = 'none';

            // 마우스 포인터가 컨테이너를 벗어날 시 초기화
            if (e.clientY < 0 || e.clientY > containerRef.current.getBoundingClientRect().top + containerHeight) {
                onDragEnd();
            }
        }
    };

    const onDragEnter = (e, plan) => {
        if (isDrag) {
            // 순서 이동 기능
            overItem.current = plan;
            overItemIndex.current = getElementIndex(plan);

            // 순서 이동 모션
            // 타겟 요소
            overTarget.current = e.currentTarget;

            // 타겟 요소의 벌어지는 모션
            // 드래그 요소와 타겟 요소가 다른지 확인
            if (dragTarget.current !== overTarget.current) {
                // 타겟 요소 배열에 중복값 제거
                if (!overTargetArr.find((item) => item === e.currentTarget)) {
                    setOverTargetArr([...overTargetArr, e.currentTarget]);
                }

                // 드래그 요소와 타겟 요소의 위치에 따른 위/아래 모션 결정
                if (itemIndex.current < overItemIndex.current) {
                    e.currentTarget.style.transform = `translateY(-${itemRef.current.getBoundingClientRect().height}px)`;
                } else {
                    e.currentTarget.style.transform = `translateY(${itemRef.current.getBoundingClientRect().height}px)`;
                }

                // 벌어진 요소가 다시 제자리로 이동
                if (overTargetArr.find((item) => item === e.currentTarget)) {
                    e.currentTarget.style.transform = `translateY(${0}px)`;

                    setOverTargetArr(overTargetArr.filter((item) => item !== e.currentTarget));
                }
            }
        }
    };

    const onDragEnd = () => {
        setIsDrag(false);

        // 이동 모션
        // 드롭시 벌어진 요소 다시 제자리로 이동
        overTargetArr.forEach((item) => (item.style.transform = `translateY(${0}px)`));

        dragTarget.current.style.zIndex = '0';
        dragTarget.current.style.pointerEvents = 'auto';

        // 드래그된 요소 다시 제자리로 이동
        dragTarget.current.style.top = `${0}px`;

        // 사용 변수 초기화
        plansArr.current = null;
        item.current = null;
        itemIndex.current = null;
        overItem.current = null;
        overItemIndex.current = null;
        setOverTargetArr([]);
    };

    const onDrop = (e) => {
        e.preventDefault();

        if (isDrag) {
            // 이동 기능
            onChangePlans(switchItem());
            getIndex();
        }
    };

    const onDragOver = (e) => {
        e.preventDefault();
    };

    return;
};

export default Drag;
