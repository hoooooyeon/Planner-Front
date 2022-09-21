import { useEffect, useState } from 'react';
import styled from 'styled-components';

const SpotPaginationBlock = styled.div`
  display: flex;
`;
const PageButton = styled.div`
  border-radius: 8px;
  padding: 8px;
  margin: 0;
  font-size: 1rem;
  &:hover {
    background: lightblue;
    cursor: pointer;
    transform: translateY(-2px);
  }

  &[disabled] {
    background: grey;
    cursor: revert;
    transform: revert;
  }

  &[aria-current] {
    background: lightblue;
    font-weight: bold;
    cursor: revert;
    transform: revert;
  }
`;

const SpotPagination = ({ totalCount, areaCode, listSpots }) => {
  const [page, setPage] = useState(1);
  const [blockNum, setBlockNum] = useState(0); //

  const createArr = () => {
    const iArr = [];
    for (let i = 0; i < totalCount; i++) {
      iArr[i] = i + 1;
    }
    return iArr;
  };

  const pageLimit = 10; // 보여줄 페이지네이션 개수
  const totalPage = Math.ceil(totalCount / 10); // 총 페이지 수
  const blockArea = blockNum * pageLimit; // 페이지네이션 구역
  const nArr = createArr(totalPage);
  let pArr = nArr.slice(blockArea, pageLimit + blockArea);

  const firstPage = () => {
    setPage(1);
    setBlockNum(0);
    listSpots(areaCode, page);
  };
  const lastPage = () => {
    setPage(totalPage);
    setBlockNum(Math.ceil(totalPage / pageLimit));

    listSpots(areaCode, page);
  };

  const prevPage = () => {
    if (page <= 1) {
      return;
    }
    if (page - 1 <= pageLimit * blockNum) {
      setBlockNum((n) => n - 1);
    }
    setPage((n) => n - 1);

    listSpots(areaCode, page);
  };
  const nextPage = () => {
    if (page >= totalPage) {
      return;
    }
    if (pageLimit * (blockNum + 1) < page + 1) {
      setBlockNum((n) => n + 1);
    }
    setPage((n) => n + 1);

    listSpots(areaCode, page);
  };

  useEffect(() => {
    listSpots(areaCode, page);
  }, [areaCode, page, listSpots]);

  return (
    <SpotPaginationBlock>
      <PageButton onClick={() => firstPage()}>&lt;&lt;</PageButton>
      <PageButton
        onClick={() => {
          prevPage();
        }}
        disabled={page === 1}
      >
        &lt;
      </PageButton>
      {pArr.map((_, i) => (
        <PageButton
          key={i + 1}
          onClick={() => {
            setPage(i + 1);
            listSpots(areaCode, page);
          }}
          aria-current={page === i + 1 ? 'page' : null}
        >
          {i + 1}
        </PageButton>
      ))}
      <PageButton
        onClick={() => {
          nextPage();
        }}
        disabled={page === totalPage}
      >
        &gt;
      </PageButton>
      <PageButton onClick={() => lastPage()}>&gt;&gt;</PageButton>
    </SpotPaginationBlock>
  );
};

export default SpotPagination;

// const SpotPagination = ({ totalCount, areaCode, listSpots }) => {
//   const [page, setPage] = useState(1);
//   // const [startPage, setStartPage] = useState();
//   // const [endPage, setEndPage] = useState();
//   const totalPage = Math.ceil(totalCount / 10);
//   useEffect(() => {
//     if (page < 1) {
//       setPage(1);
//     }
//     if (page > totalPage) {
//       setPage(totalPage);
//     }
//   }, [setPage, page, totalPage]);

//   useEffect(() => {
//     listSpots(areaCode, page);
//   }, [areaCode, page, listSpots]);

//   return (
//     <SpotPaginationBlock>
//       <PageButton
//         onClick={() => {
//           setPage(page - 1);
//           listSpots(areaCode, page);
//         }}
//         disabled={page === 1}
//       >
//         &lt;
//       </PageButton>
//       {Array(totalPage)
//         .fill()
//         .map((_, i) => (
//           <PageButton
//             key={i + 1}
//             onClick={() => {
//               setPage(i + 1);
//               listSpots(areaCode, page);
//             }}
//             aria-current={page === i + 1 ? 'page' : null}
//           >
//             {i + 1}
//           </PageButton>
//         ))}
//       <PageButton
//         onClick={() => {
//           setPage(page + 1);
//           listSpots(areaCode, page);
//         }}
//         disabled={page === totalPage}
//       >
//         &gt;
//       </PageButton>
//     </SpotPaginationBlock>
//   );
// };

// export default SpotPagination;
