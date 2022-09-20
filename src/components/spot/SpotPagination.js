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

// const SpotPagination = ({ totalCount, areaCode, listSpots }) => {
//   const [page, setPage] = useState(1);
//   const [startPage, setStartPage] = useState();
//   const [endPage, setEndPage] = useState();

//   const totalP = Math.ceil(totalCount / 10);
//   const [totalPage, setTotalPage] = useState([]);
//   const makePageArray = () => {
//     let pageArray = [];
//     for (let i = 1; i <= totalP; i++) {
//       pageArray.push(i);
//     }
//     setTotalPage(pageArray);
//   };
//   let pageArr = [];
//   const pagination = () => {
//     for (let i = 0; i < totalPage.length; i += 10) {
//       pageArr.push(totalPage.slice(i, i + 10));
//     }
//     console.log(pageArr);
//     return pageArr;
//   };

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

const SpotPagination = ({ totalCount, areaCode, listSpots }) => {
  const [page, setPage] = useState(1);
  // const [startPage, setStartPage] = useState();
  // const [endPage, setEndPage] = useState();
  const totalPage = Math.ceil(totalCount / 10);
  useEffect(() => {
    if (page < 1) {
      setPage(1);
    }
    if (page > totalPage) {
      setPage(totalPage);
    }
  }, [setPage, page, totalPage]);

  useEffect(() => {
    listSpots(areaCode, page);
  }, [areaCode, page, listSpots]);

  return (
    <SpotPaginationBlock>
      <PageButton
        onClick={() => {
          setPage(page - 1);
          listSpots(areaCode, page);
        }}
        disabled={page === 1}
      >
        &lt;
      </PageButton>
      {Array(totalPage)
        .fill()
        .map((_, i) => (
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
          setPage(page + 1);
          listSpots(areaCode, page);
        }}
        disabled={page === totalPage}
      >
        &gt;
      </PageButton>
    </SpotPaginationBlock>
  );
};

export default SpotPagination;
