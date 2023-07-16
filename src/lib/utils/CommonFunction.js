/** 드래그 앤 드롭 */
let itemsArr,
    dragItem,
    overItem,
    dragItemIndex,
    overItemIndex,
    dragTarget,
    overTarget,
    sortIndex = null;
let posY,
    initialScrollTop,
    itemHeight = 0;
let overTargetArr = [];
let isDrag = false;

// 바꿀 일정의 index 구하기
function getElementIndex(item, items) {
    itemsArr = items;
    return itemsArr.findIndex((e) => e === item);
}

// 드래그 일정과 타겟 일정 순서 바꿈
function switchItem() {
    itemsArr.splice(dragItemIndex, 1);
    itemsArr.splice(overItemIndex, 0, dragItem);
}

// db에서 순서를 정렬할 index를 구함.
function getIndex({ items }) {
    let prevIndex;
    let nextIndex;
    let curItemIndex = getElementIndex(dragItem, items);

    if (curItemIndex === 0) {
        sortIndex = itemsArr[curItemIndex + 1].index / 2;
    } else if (curItemIndex === itemsArr.length - 1) {
        sortIndex = itemsArr[itemsArr.length - 1].index + 1024;
    } else {
        prevIndex = itemsArr[curItemIndex - 1].index;
        nextIndex = itemsArr[curItemIndex + 1].index;
        sortIndex = (prevIndex + nextIndex) / 2;
    }
}

// 드래그 시작
export function onDragStart({ e, item, items, scrollTop, onChangeCurItem, onCloneElement, onChangeStyle }) {
    isDrag = true;

    onChangeCurItem(item);

    // 순서 이동 모션
    // 드래그시 반투명 이미지 제거
    let img = new Image();
    e.dataTransfer.setDragImage(img, 10, 10);

    // 드래그되는 요소
    dragTarget = e.currentTarget;
    dragTarget.style.zIndex = '101';

    const computedStyle = getComputedStyle(dragTarget);
    const marginBottom = parseInt(computedStyle.marginBottom);
    const height = dragTarget.getBoundingClientRect().height;
    itemHeight = height + marginBottom;
    initialScrollTop = scrollTop.current ? scrollTop.current : 0;

    // 마우스 포인터 좌표
    posY = e.clientY;

    // 순서 이동 기능
    dragItem = item;
    dragItemIndex = getElementIndex(item, items);

    onCloneElement();
    onChangeStyle(itemHeight * (dragItemIndex - items.length));
}
// 드래그 이동
export function onDragMove({ e, containerRef, scrollTop }) {
    if (isDrag) {
        // 마우스 포인터가 이동한 거리
        const diffY = e.clientY - posY;

        // 드래그가 가능한 컨테이너 크기
        const containerHeight = containerRef.current.scrollHeight;

        const itemPos = diffY - initialScrollTop + scrollTop.current;

        // 드래그되는 모션
        e.currentTarget.style.top = `${Math.min(Math.max(-itemHeight * dragItemIndex, itemPos), containerHeight - itemHeight * (dragItemIndex + 1))}px`;

        dragTarget.style.pointerEvents = 'none';
    }
}
export function onCloneEnter() {
    overItemIndex = dragItemIndex;
}

// 드래그한 요소가 드롭될 요소와 겹침
export function onDragEnter({ e, item, items }) {
    if (isDrag) {
        // 순서 이동 기능
        overItem = item;
        overItemIndex = getElementIndex(item, items);

        // 순서 이동 모션
        // 타겟 요소
        overTarget = e.currentTarget;

        // 타겟 요소의 벌어지는 모션
        // 드래그 요소와 타겟 요소가 다른지 확인
        if (dragTarget !== overTarget) {
            // 타겟 요소 배열에 중복값 제거
            if (!overTargetArr.find((item) => item === e.currentTarget)) {
                overTargetArr = [...overTargetArr, e.currentTarget];
            }
            // 드래그 요소와 타겟 요소의 위치에 따른 위/아래 모션 결정
            if (dragItemIndex < overItemIndex) {
                // e.currentTarget.style.transform = `translateY(-${itemHeight}px)`;
                e.currentTarget.style.transform = `translateY(-${itemHeight}px)`;
            } else {
                e.currentTarget.style.transform = `translateY(${itemHeight}px)`;
            }

            // 벌어진 요소가 다시 제자리로 이동
            if (overTargetArr.find((item) => item === e.currentTarget)) {
                e.currentTarget.style.transform = `translateY(${0}px)`;

                overTargetArr = overTargetArr.filter((item) => item !== e.currentTarget);
            }
        }
    }
}

// 드래그 종료
export function onDragEnd({ onDeleteElement }) {
    isDrag = false;

    // 이동 모션
    // 드롭시 벌어진 요소 다시 제자리로 이동
    overTargetArr.forEach((item) => (item.style.transform = `translateY(${0}px)`));

    dragTarget.style.zIndex = '100';
    dragTarget.style.pointerEvents = 'auto';

    // 드래그된 요소 다시 제자리로 이동
    dragTarget.style.top = `${0}px`;

    onDeleteElement();

    // 사용 변수 초기화
    itemsArr = null;
    dragItem = null;
    overItem = null;
    dragItemIndex = null;
    overItemIndex = null;
    dragTarget = null;
    overTarget = null;
    sortIndex = null;
    posY = 0;
    initialScrollTop = 0;
    itemHeight = 0;
    overTargetArr = [];
    isDrag = false;
}
// 드래그 요소를 드롭당할 요소에 드롭
export function onDrop({ e, items, onUpdateSortIndex }) {
    e.preventDefault();

    if (isDrag && overItemIndex !== dragItemIndex) {
        // 이동 기능
        switchItem();
        getIndex({ items });
        onUpdateSortIndex(dragItem.index);
    }
}
// 드래그 요소가 드롭 요소위에 지나감(ondrop 사용시 필수)
export function onDragOver(e) {
    e.preventDefault();
}

/** 페이지네이션 */
// 페이지네이션 배열 생성 함수
export function creaetPageArr(pageLastIndex, setPageArr, count, block) {
    const arr = Array.from({ length: pageLastIndex }, (_, i) => i + 1);

    setPageArr(arr.slice(count * block, count * (block + 1)));
}
// 이전 페이지로
export function prevPage(pageIndex, onChangePageIndex, setBlock, count) {
    if (!(pageIndex === 1)) {
        onChangePageIndex(pageIndex - 1);
        if (pageIndex % count === 1) {
            setBlock((block) => block - 1);
        }
    }
}
// 다음 페이지로
export function nextPage(pageIndex, pageLastIndex, onChangePageIndex, count, setBlock) {
    if (!(pageIndex === pageLastIndex)) {
        onChangePageIndex(pageIndex + 1);
        if (pageIndex % count === 0) {
            setBlock((block) => block + 1);
        }
    }
}
// 첫번째 페이지로
export function firstPage(onChangePageIndex, setBlock) {
    onChangePageIndex(1);
    setBlock(0);
}
// 마지막 페이지로
export function lastPage(onChangePageIndex, pageLastIndex, setBlock, count) {
    onChangePageIndex(pageLastIndex);
    setBlock(Math.ceil(pageLastIndex / count - 1));
}
