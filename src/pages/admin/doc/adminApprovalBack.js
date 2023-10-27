import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";


const Doc = () => {

  const router = useRouter();
  const id = localStorage.getItem('user_id');
  console.log('id확인:',id);
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const token = localStorage.getItem('token')
      axios
      .get("http://localhost:8081/admin/doc/approvalBack", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
          setSamples(response.data);
          const filteredSamples = response.data.filter(approvalBack => approvalBack.doc_status === '반려');
          const sortedSamples = filteredSamples.sort((a,b) => b.doc_id - a.doc_id);
          setSamples(sortedSamples);
          setFilteredSamples(sortedSamples);
          console.log('sortedSamples:', sortedSamples)
      })
      .catch((error) => {
          console.log(error);
      });
  }, []);

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

  return(
    <Container>
        <Title>
            <H1>반려 문서함</H1>
        </Title>
        <Docstyle1>
            <tbody>
                <tr>
                    <th>
                        <button type="button" onClick={() => router.push('/admin/doc/adminApprovalEnd')}>결재 완료 문서함</button>
                    </th>
                    <th>
                        <button type="button" onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 예정 문서함</button>
                    </th>
                    <th>
                        <button type="button" onClick={() => router.push('/admin/doc/adminApprovalBack')}>결재 반려 문서함</button>
                    </th>
                </tr>
            </tbody>
        </Docstyle1>
        <Docstyle2>
                <thead>
                    <tr>
                        <th>상태</th>
                        <th>문서번호</th>
                        <th>문서 제목</th>
                        <th>작성자</th>
                        <th>결재일</th>
                    </tr>
                </thead>
                <tbody>
                {currentItems.map(approvalBack =>
                        <tr key = {approvalBack.doc_id} onClick={() => router.push(`/admin/doc/adminApprovalBackDetail?id=${approvalBack.doc_id}`)}>
                          <td component="" scope="approvalBack">{approvalBack.doc_status}</td>
                          <td>{approvalBack.doc_id}</td>
                          <td isTitle>{approvalBack.doc_title}</td>
                          <td>{approvalBack.name}</td>
                          <td>{formatDate(approvalBack.approval_date)}</td>
                        </tr>
                    )}
                </tbody>
        </Docstyle2>
        {totalPage > 1 && (  // 여기에서 조건부 렌더링을 수행합니다.
        <PageButton>
          <button onClick={() => handleClick("prev")} disabled={page === 1}>이전</button>
          <span>{page} / {totalPage}</span>
          <button onClick={() => handleClick("next")} disabled={page === totalPage}>다음</button>
        </PageButton>
        )}
    </Container>
  )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
  return <AdminLayout>{page}</AdminLayout>;
};

const Container = styled.div`
width: 100%;
display: flex;
flex-direction: column;
justify-content: center;
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
  border: 1px solid black;
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
thead {
  th {
    text-align: center;
    padding: 10px;
    border: 1px solid black;
  }
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