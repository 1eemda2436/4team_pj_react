import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import axios from "axios";


const Doc = () => {

  const router = useRouter();
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;

    
  useEffect(() => {
    const token = localStorage.getItem('token')

      axios
      .get("http://localhost:8081/admin/doc/adminTotal", {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setSamples(response.data);
        const statuses = ['완료', '진행', '반려']
        const filteredSamples = response.data.filter(adminTotal => statuses.includes(adminTotal.doc_status));
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
      <MainContainer>
        <Title>전자결재</Title>
        <AdminMenu>
          <Button onClick={() => router.push('/admin/doc/adminApprovalEnd')}>결재 완료 문서함</Button>
          <Button onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 예정 문서함</Button>
          <Button onClick={() => router.push('/admin/doc/adminApprovalBack')}>결재 반려 문서함</Button>
        </AdminMenu>

        <TblComponent>
          <TblHeader>
            <DocTableTop>
              <thead>
                <tr>
                  <th>상태</th>
                  <th>문서번호</th>
                  <th>제목</th>
                  <th>기안자</th>
                  <th>결재일</th>
                </tr>
              </thead>
            </DocTableTop>
          </TblHeader>

          <TblContent>
            <DocTableBottom>
              <tbody>
                {currentItems.map((adminTotal) =>
                  <tr key = {adminTotal.doc_id} onClick={() => router.push(`/admin/doc/adminApprovalIngDetail?id=${adminTotal.doc_id}`)}>
                    <td component="" scope="adminTotal">{adminTotal.doc_status}</td>
                    <td>{adminTotal.doc_id}</td>
                    <td>{adminTotal.doc_title}</td>
                    <td>{adminTotal.name}</td>
                    <td>{formatDate(adminTotal.doc_date)}</td>
                  </tr>
                )}
              </tbody>
            </DocTableBottom>
          </TblContent>

          {totalPage > 1 && (  // 여기에서 조건부 렌더링을 수행합니다.
          <PageButton>
            <button onClick={() => handleClick("prev")} disabled={page === 1}>이전</button>
            <span>{page} / {totalPage}</span>
            <button onClick={() => handleClick("next")} disabled={page === totalPage}>다음</button>
          </PageButton>
          )}
        </TblComponent>
      </MainContainer>
  )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainContainer = styled.div`
  width: 100%;
  height: 100%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const AdminMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
`;

const TblComponent = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,.10);
  box-sizing: border-box;
  margin-top: 40px;
`;

const TblHeader = styled.div`
  padding: 0px 15px;
  background: #F6F8FA;
  border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
  height: 600px;
  overflow-x: auto;
  padding: 0px 15px;

  &::-webkit-scrollbar {
    width: 4px;
  } 

  &::-webkit-scrollbar-track {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  }
  
  &::-webkit-scrollbar-thumb {
      -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
  }
`;

const Table = styled.table`
  width:100%;
  table-layout: fixed;
  font-size: .9em;
  width: 100%;
  min-width: 650px;
  border-collapse: collapse;

  th {
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
  }

  td {
    padding: 15px;
    vertical-align: middle;
    font-size: 13px;
    border-bottom: solid 1px #E5E5E5;
    text-align: center;
    word-wrap: break-word;
  }
`;

const DocTableTop = styled(Table)``;

const DocTableBottom = styled(Table)`
  margin-top: 20px;
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
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    &:disabled {
      background-color: #007bff;
      cursor: not-allowed;
    }
  }
`;