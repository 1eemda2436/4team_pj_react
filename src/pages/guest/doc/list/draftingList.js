import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Doc = () => {
  const router = useRouter();
  const id = localStorage.getItem('user_id');
  const user_name = localStorage.getItem('user_name');
  console.log('id확인:',id);
  console.log('name확인:', user_name);
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
      const token = localStorage.getItem('token')

        axios
        .get("http://localhost:8081/guest/doc/draft",{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
            setSamples(response.data);
            const filteredSamples = response.data.filter(draft => draft.doc_status === '기안' && draft.name === user_name);
            const sortedSamples = filteredSamples.sort((a,b) => b.doc_id - a.doc_id);
            setSamples(sortedSamples);
            setFilteredSamples(sortedSamples);
            console.log('sortedSamples:', sortedSamples)
        })
        .catch((error) => {
            console.log(error);
        });
    }, [id, user_name]);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredSamples.slice(indexOfFirstItem, indexOfLastItem);

    const totalPage = Math.ceil(filteredSamples.length / itemsPerPage);

    const handleClick = (type) => {
        if (type === "prev" && page > 1) {
            setPage(page - 1);
        } else if (type === "next" && page < totalPage) {
            setPage(page + 1);
        }
    };

    // 날짜 변환
    const formatDate = (timestamp) => {
      const date = new Date(timestamp);
      const formattedDate = date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
      return formattedDate;
    };

    return (
      <Container>
          <Title>
              <H1>기안 문서함</H1>
          </Title>
          <Docstyle1>
            <tbody>
              <tr>
                  <th>
                      <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</button>
                  </th>
                  <th>
                      <button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</button>
                  </th>
                  <th>
                      <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</button>
                  </th>
                  <th>
                      <button type="button" onClick={() => router.push('/guest/doc/list/approvalSuggestList')}>결재 요청목록</button>
                  </th>
              </tr>
            </tbody>
          </Docstyle1>
          <Docstyle2>
            <thead>
              <tr>
                  <th>문서번호</th>
                  <th>카테고리</th>
                  <th >문서 제목</th>
                  <th>작성자</th>
                  <th>기안일</th>
                  <th>상태</th>
                  <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((draft) =>
                  <tr key={draft.doc_id} onClick={() => router.push(`/guest/doc/detail/draftDetail?id=${draft.doc_id}`)}>
                    <td component="" scope="draft">{draft.doc_id}</td>
                    <td>{draft.category_name}</td>
                    <td>{draft.doc_title}</td>
                    <td>{draft.name}</td>
                    <td>{formatDate(draft.doc_date)}</td>
                    <td>{draft.doc_status}</td>
                    {/* 마우스 클릭이벤트가 안으로 전달되지 않게 하는 함수 */}
                    <td onClick={(e)=> {e.stopPropagation()}}>
                      <button type="button" onClick={() => router.push(`/guest/doc/updateApproval?id=${draft.doc_id}`)}>결재요청</button>
                    </td>
                  </tr>
              )}
            </tbody>
          </Docstyle2>
          <Docstyle2>
            <tbody>
              <tr>
                <td>
                  <button type="button" onClick={() => router.push(`/guest/doc/insertDraft`)}>문서 작성</button>
                </td>
              </tr>
            </tbody>
          </Docstyle2>
          {totalPage > 1 && ( 
        <PageButton>
          <button onClick={() => handleClick("prev")} disabled={page === 1}>이전</button>
          <span>{page} / {totalPage}</span>
          <button onClick={() => handleClick("next")} disabled={page === totalPage}>다음</button>
        </PageButton>
      )}
      </Container>
  );
};

export default Doc;

Doc.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
};

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`;

const Title = styled.div`
text-align: center;
margin-bottom: 20px;
`;

const Docstyle1 = styled.table`
width: 100%;
margin: 10px 0;
th {
  text-align: center;
  padding: 10px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
  margin: 1px;
}
`;

const Docstyle2 = styled.table`
width: 100%;
border-collapse: collapse;
th, td {
  text-align: center;
  padding: 10px;
  border: 1px solid black;
  vertical-align: middle; /* 중앙 정렬을 위해 추가된 스타일 */
}
tbody {
  tr {
    cursor: pointer;
    td {
      text-align: center;
      padding: 10px;
      border: 1px solid black;
    }
  }
}
`;

const H1 = styled.h1`
font-size: 30px;
`;

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;

  button {
    margin: 0 10px;
    padding: 10px 20px;
    font-size: 16px;
    background-color: gray;
    color: white;
    border: none;
    cursor: pointer;
    &:disabled {
      background-color: lightgray;
      cursor: not-allowed;
    }
  }
`;