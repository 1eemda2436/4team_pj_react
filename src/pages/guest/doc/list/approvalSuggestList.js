import MainLayout from "@/components/layout/mainLayout"
import { useRouter } from "next/router";
import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import Header from "@/components/common/header";


const Doc = () => {
  // // useRouter 훅을 사용하여 라우터 객체를 생성=
  const router = useRouter();
  const id = localStorage.getItem('user_id');
  console.log('id확인:',id);
  const user_name = localStorage.getItem('user_name');
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('');

  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const token = localStorage.getItem('token')
    axios
      .get("http://localhost:8081/guest/doc/approvalSelect", {
        headers: {
          'Authorization': `Bearer ${token}`
      }
      })
      .then((response) => {
        const allDocuments = response.data;
        const filteredDocuments = allDocuments.filter(document => document.id === id && document.name === user_name);
        setSamples(allDocuments); // 모든 문서 데이터 저장
        setFilteredSamples(filteredDocuments); // 필터링된 문서 데이터 저장
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleChange = (e) => {
    setSelectedStatus(e.target.value); // select 요소의 변경에 따라 상태 업데이트
  };

  useEffect(() => {
    // 선택된 상태에 따라 문서 데이터 필터링
    const filteredResults = samples.filter(approvalIng => {
      if (selectedStatus === '') {
        return approvalIng.name  == user_name;
      }
      return approvalIng.doc_status === selectedStatus && approvalIng.name == user_name;
    });
    console.log('filteredResult', filteredResults)
    // 문서번호 내림차순정렬
    const sortedResults = filteredResults.sort((a, b) => b.doc_id - a.doc_id);
    setFilteredSamples(sortedResults);
  }, [selectedStatus, samples, user_name]);

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
    <>
      <Header />
      <MainContainer>
          <Title>
              진행 문서함
          </Title>
          <PersonalMenu>
            <Button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/list/approvalSuggestList')}>결재 요청목록</Button>
          </PersonalMenu>

          <FilterContainer>
            <label>문서 상태:</label>
            <select value={selectedStatus} onChange={handleChange}>
              <option value="">모든 상태</option>
              <option value="진행">진행</option>
              <option value="완료">완료</option>
              <option value="반려">반려</option>
            </select>
          </FilterContainer>

          <TblComponent>
            <TblHeader>
              <DocTableTop>
                <thead>
                    <tr>
                        <th>상태</th>
                        <th>문서번호</th>
                        <th>문서 제목</th>
                        <th>작성자</th>
                        <th>기안일</th>
                    </tr>
                </thead>
              </DocTableTop>
            </TblHeader>

            <TblContent>
              <DocTableBottom>
                <tbody>
                  {currentItems.map(approvalIng =>
                    <tr key = {approvalIng.doc_id} onClick={() => router.push(`/guest/doc/detail/approvalSuggestDetail?id=${approvalIng.doc_id}`)}>
                      <td component="" scope="approvalIng">{approvalIng.doc_status}</td>
                      <td>{approvalIng.doc_id}</td>
                      <td isTitle>{approvalIng.doc_title}</td>
                      <td>{approvalIng.name}</td>
                      <td>{formatDate(approvalIng.doc_date)}</td>
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
      </>
  )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainContainer = styled.div`
  width: 100%;
  height: 90%;
  padding: 40px;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
  text-align: center;
`;

const PersonalMenu = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 40px;
`;

const FilterContainer = styled.div`
  margin: 20px 0;
  display: flex;
  align-items: center;

  label {
    margin-right: 10px;
  }

  select {
    padding: 10px;
    font-size: 16px;
  }
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
  height: 520px;
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
  margin: 20px 0px;

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