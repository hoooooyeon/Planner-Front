# 한국다봄 
한국 여행 플래너 웹사이트.
## 1. 제작 기간 & 참여 인원
- 2022년 08월 01일 ~ 2024년 01월 30일
- 팀 프로젝트
- 김태수: 백엔드, 프론트엔드(리뷰 UI 및 기능, 로그인/회원가입/찾기 기능, 마이페이지 UI 및 기능)
- 이호연: 프론트엔드(홈 UI 및 기능, 플래너 UI 및 기능, 여행지 UI 및 기능, 로그인/회원가입/찾기 UI)
## 2. 사용 기술
### `Back-end`
- Spring
- MySQL
### `Front-end`
- HTML
- CSS
- JavaScript(ES6)
- React
## 3. 링크
## 4. 업데이트
### `Back-end`
- 플래너 조회 API 호출 시 totalCount 값이 비정상적인 이슈 수정 (02.17)
- 플래너 정보 변경이 안되는 현상 수정(03. 02)
- 플래너 및 여행지 좋아요 상태를 정상적으로 못가져오는 현상 수정(03. 02)
### `Front-end`
- 마이페이지 유저 이미지 변경 버튼 이슈 수정 (02.15)
- 다른 사용자의 플래너리스트 아이템 높이 이슈 수정 (02.19)
- 플래너수정페이지의 지도로 인한 지역 변경 이슈 수정 (03. 02)
- 플래너의 지역코드 이슈 수정 (03. 02)

## 5. 페이지별 기능
<details>
<summary>홈</summary>
<div markdown="1">

  - 한국다봄의 서비스를 소개합니다.  
  - 추천 수가 많은 플래너 리스트를 나열하고, 선택 시 해당 플래너 정보 페이지로 이동합니다.  
  - 추천 수가 많은 리뷰 리스트를 나열하고, 선택 시 해당 리뷰 페이지로 이동합니다.  
  - 임의의 여행지를 나열합니다.  
</div>
</details>

<details>
<summary>플래너</summary>
<div markdown="1">
1. 플래너 리스트 페이지
  
![plannerList-ezgif com-video-to-gif-converter](https://github.com/hoooooyeon/todolist/assets/92985196/86b83c27-f4e4-4e7f-a7fb-84a2ab77844f)

- 나의 플래너 리스트를 나열하고, 선택 시 해당 플래너 정보 페이지로 이동합니다.
- 플래너 생성 버튼을 눌러 플래너를 생성하고, 플래너 수정 페이지로 이동합니다.
- 다른 사용자의 플래너 리스트를 나열하고, 선택시 해당 플래너 정보 페이지로 이동합니다.
- 지역, 정렬, 키워드 조건을 통해 플래너를 검색할 수 있습니다.

2. 플래너 정보 페이지

![plannerInfo-ezgif com-video-to-gif-converter](https://github.com/hoooooyeon/todolist/assets/92985196/809e092a-74c2-479c-b051-29b17bd40b54)
   
- 관리 버튼을 눌러 플래너 정보 수정, 플래너 루트 수정, 멤버 관리, 플래너 삭제를 할 수 있습니다.
- 지도를 통해 여행 경로를 알 수 있습니다.
- 일정표를 통해 날짜별 여행 일정을 확인할 수 있습니다.
- 플래너 이름, 여행 일정, 여행 멤버, 여행 비용을 보여줍니다.
- 현재 사용자의 플래너라면 메모를 통해 글을 작성할 수 있습니다.

4. 플래너 수정 페이지

![plannerEdit-ezgif com-video-to-gif-converter](https://github.com/hoooooyeon/todolist/assets/92985196/6bfbb40c-dfd2-4169-a880-fbe597c86fcc)
   
- 메뉴 버튼을 눌러 플래너 정보 수정, 멤버 관리를 할 수 있습니다.
- 날짜를 눌러 여행 시작일을 선택합니다.
- 여행 날짜를 추가하고, 해당 날짜에 여행지 리스트에 있는 여행지를 추가할 수 있습니다.
- 지역별, 카테고리별 여행지 리스트를 나열하고, 키워드 조건을 통해 여행지를 검색할 수 있습니다.
- 지도에 여행지와 여행 경로를 나타냅니다.
- 모든 일정 및 사용 방법을 확인할 수 있고, 일정 저장을 통해 완성된 플래너를 확인할 수 있습니다.
</div>
</details>


<details>
<summary>리뷰</summary>
<div markdown="1">
1. 리뷰 리스트 페이지
- 사용자들이 만든 여행지 플래너를 바탕으로 해당 여행지 플래너의 후기를 작성한 리스트를 나열합니다.
2. 리뷰 페이지
- 사용자가 작성한 리뷰 페이지를 나타냅니다. 작성자는 수정 또는 삭제할 수 있습니다.
3. 리뷰 수정 페이지
- 사용자가 작성한 리뷰를 수정합니다.
</div>
</details>


<details>
<summary>여행지</summary>
<div markdown="1">

![spot-ezgif com-video-to-gif-converter](https://github.com/hoooooyeon/todolist/assets/92985196/c6f601fb-62f4-40ec-ba72-5560e16bcd56)
  
- 유명 여행지 슬라이드를 보여줍니다.
- 여행지 리스트를 나열합니다.
- 지역, 카테고리, 키워드 조건을 통해 여행지를 검색할 수 있습니다.
</div>
</details>

## 6. 트러블 슈팅
<details>
<summary>플래너 주소 이동 이슈</summary>
<div markdown="1">
  
플래너 페이지는 플래너 리스트를 나열하는 리스트 페이지, 하나의 플래너를 보여주는 정보 페이지, 플래너를 수정하는 수정 페이지 이렇게 3개로 나뉘어져 있습니다.  
각 페이지는 아래와 같은 이동 동선을 생각하였습니다.

- 플래너 리스트에서 선택한 플래너 정보로 이동.
- 플래너 정보에서 일정을 수정하기 위해 플래너 수정으로 이동.
- 수정을 완료하면 다시 플래너 정보로 이동.
- 플래너를 삭제하면 플래너 리스트로 이동.

이 과정에서 플래너를 가져오지 못하였을 때나 에러가 발생했을 때, 주소 이동을 막기 위해서 아래와 같은 이동 조건을 생각하였습니다.

- 에러가 발생하지 않고, 플래너 정보가 있을 때만 이동.
- 플래너 리스트에서 선택한 플래너가 성공적으로 로드된 후에 플래너 정보로 이동
- 플래너가 성공적으로 삭제된 후에 플래너 리스트로 이동

~~~javascript
// plannerListContainer.jsx
  useEffect(() => { // 주소 이동
        if (planner !== false && Object.keys(planner).length <= 0 && plannerId && pType === 2) {
            history.push(`/Planners/edit/${plannerId}`);
        } else if (planner !== false && Object.keys(planner).length <= 0 && plannerId && pType === 1) {
            history.push(`/Planners/${plannerId}`);
        }
    }, [plannerId]);

// plannerInfoContainer.jsx
    useEffect(() => { // 페이지 접근 제어
        if (planner === false) {
            history.push('/Planners');
        }
    }, [history, planner, plannerId]);

// plannerEditContainer.jsx
    useEffect(() => { // 페이지 접근 제어
        if (!accountId) {
            history.push('/Planners');
        } else if (planner === false) {
            history.push(`/Planners/${params.plannerId}`);
        } else if (Object.keys(planner).length > 0 && accountId !== planner.accountId) {
            history.push(`/Planners/${params.plannerId}`);
        }
    }, [history, accountId, account, planner]);
~~~

</div>
</details>

<details>
<summary>플래너 수정 페이지의 현재 지도에서 지역 변경 이슈</summary>
<div markdown="1">
  
플래너 수정 페이지의 지도에는 현재 보이는 위치의 지역 관련 여행지 리스트를 보여줍니다.  
지역을 최신화하는 조건은 마우스로 지도를 이동하다 클릭을 떼었을 때(mouseup)를 기점으로 최신화 됩니다.  

이 과정에서 마우스가 처음부터 지도 위에 있지 않고 리스트 위에서 클릭한 뒤(mousedown) 지도 위에서 클릭을 떼었을 때(mouseup)에도 지역이 최신화가 되는 문제가 발생하였습니다.  
이를 막기 위해 지도 위에서 마우스를 클릭 했을 때를 확인하는 코드를 추가하고 이 경우에만 지역이 최신화가 되도록 수정하였습니다.
  
~~~javascript
// editMap.jsx
const [areaBool, setAreaBool] = useState();
const getAreaBool = useCallback((bool) => {
        setAreaBool(bool);
    });

    useEffect(() => { // 지도 중심 좌표 얻기
        if (map) {
            kakao.maps.event.addListener(map, 'mouseup', getMapCenter);
            kakao.maps.event.addListener(map, 'mousedown', () => getAreaBool(true));
            kakao.maps.event.addListener(map, 'mouseup', () => getAreaBool(false));
        }
    }, [map, getMapCenter, kakao.maps.event]);

    useEffect(() => { // 중심 좌표를 통해 현재 지역 구하기
           if (map && areaBool) {
            let arr = [];
            let polyline;
            let coordArr = [];
            let minCoord;
            let num;
            if (centerCoord) {
                areaArr.map((a) => {
                    arr = [
                        new kakao.maps.LatLng(centerCoord.Lat, centerCoord.Lng),
                        new kakao.maps.LatLng(a.coord.Lat, a.coord.Lng),
                    ];
                    polyline = new kakao.maps.Polyline({
                        path: arr, // 선을 구성하는 좌표배열 입니다
                    });
                    coordArr = [...coordArr, polyline.getLength()];


                    minCoord = Math.min(...coordArr);
                    num = coordArr.findIndex((c) => c === minCoord);
                    return coordArr;
                });
                onChangeAreaIndex(areaArr[num].code);
            }
        }
    }, [centerCoord, kakao.maps.LatLng, kakao.maps.Polyline, map]);
~~~

</div>
</details>

<details>
<summary>드래그 함수 이슈</summary>
<div markdown="1">
  
날짜나 여행지 순서를  변경하기 위해선 마우스로 드래그하여 변경할 위치에 내려놓는 방법을 사용합니다.   
이 때 내려놓는 위치가 자연스럽게 벌어지는 모션이 필요하기 때문에 요소의 높이를 구해야 했습니다.  
이 과정에서 높이를 구할 요소에 useRef가 연결되지 않아 구현에 문제가 생겼고, useRef 자체를 드래그 함수 내부로 이동시키고 getBoundingClientRect()를 사용하여 해결하였습니다.

~~~javascript
// itemDrag.js
export function DragFunction() { // 드래그 앤 드롭
(...)
    const dragTarget = useRef();
(...)

function onDragStart({ e, item, items, scrollTop, onChangeCurItem, onCloneElement, onChangeStyle }) {
        setIsDrag(true);

        onChangeCurItem(item);

        // 순서 이동 모션
        // 드래그시 반투명 이미지 제거
        let img = new Image();
        e.dataTransfer.setDragImage(img, 10, 10);

        // 드래그되는 요소
        dragTarget.current = e.currentTarget;
        dragTarget.current.style.zIndex = '101';

        const computedStyle = getComputedStyle(dragTarget.current);
        const marginBottom = parseInt(computedStyle.marginBottom);
        const height = dragTarget.current.getBoundingClientRect().height;
        itemHeight.current = height + marginBottom;
        initialScrollTop.current = scrollTop.current ? scrollTop.current : 0;

        // 마우스 포인터 좌표
        posY.current = e.clientY;

        // 순서 이동 기능
        dragItem.current = item;
        dragItemIndex.current = getElementIndex(item, items);

        onCloneElement();
        onChangeStyle(itemHeight.current * (dragItemIndex.current - items.length));
}
~~~
</div>
</details>

<details>
<summary>proxy 설정 에러</summary>
<div markdown="1">
  
프록시(proxy)란, 웹팩 개발 서버에서 지원하는 기능으로, 개발 서버로 요청하는 API들을 우리가 프록시로 정해둔 서버로 그대로 전달해 주고 그 응답을 웹 애플리케이션에서 사용할 수 있게 해주는 기능입니다.  
CRA에서 만든 프로젝트에서 프록시를 설정할 때는 package.json 파일을 수정해주면 됩니다.

~~~
// package.json 
{ 	
... 
}, 	
"proxy": "http://localhost:4000/" 
}
~~~

해당 에러 발생으로, package.json에 추가했던 코드는 지우고 src에 setupProxy.js 파일을 생성한 뒤 다음 코드를 입력하여 해결하였습니다.

~~~
Invalid options object. Dev Server has been initialized using an options object that does not match the API schema.
~~~

~~~javascript
const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(
        '/api',
        createProxyMiddleware({
            target: 'http://localhost:8080/planner',
            changeOrigin: true,
        }),
    );
};

~~~
</div>
</details>

<details>
<summary>addEventListener 이슈</summary>
<div markdown="1">
  
헤더에 스크롤시 그림자 이펙트를 주기 위한 코드를 작성하였습니다.  
그런데 맨 처음 렌더링된 페이지를 제외하고 그 다음 페이지부터 스크롤할 때 오류가 발생하였습니다.  

addEventListener로 추가된 함수는 컴포넌트가 지워져도 함수는 지워지지 않고 계속 남게 됩니다.  
그리고 이 남아있는 함수는 다른 컴포넌트로 넘어가서도 계속 실행이 되면서 이러한 이슈가 발생하게 됩니다.  
즉 첫 페이지의 헤더에 설정한 ref는 다음 페이지로 넘어가면서 사라지게 되는데 이 ref를 지워지지 않은 함수(onScroll)가 계속 사용하려 하면서 이슈가 발생하게 된 것입니다.  
해결방법으로, removeEventListener로 남아있는 함수를 제거해 주었습니다.

~~~javascript
 return () => { window.removeEventListener('scroll', onScroll); };
~~~

</div>
</details>



## 7. 회고 & 느낀점
### 김태수
### 이호연
먼저 프로젝트를 마무리 하고 나서 아쉬움이 가장 컸다. 페이지의 디자인, 구조, 기능 등의 초기 설계를 했음에도 불구하고 제작하면서 수정되고 추가되는 사항들이 많이 생겼다. 
특히 기능 구현시 막히고 수정되는 과정에서 가장 많은 시간을 소비하였고 이 부분이 가장 큰 아쉬움으로 남았다. 
하지만 이 경험으로 더 세부적인 설계의 필요함을 느꼈고, 중간중간 막히더라도 문제를 해결하는 과정 속에서 더 많이 배울 수 있었다.
리액트를 공부하고 처음 제작한 팀 프로젝트였는데 기간도 오래 걸리고 막히는 부분도 많아 힘들었지만 그만큼 얻은 것도 많고 좋은 공부가 된 프로젝트였다.


