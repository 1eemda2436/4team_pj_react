import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Header from "@/components/common/header";
import { BASE_URL } from "@/api/apiPath";


const Doc = () => {
  const router = useRouter();
  const id = localStorage.getItem('user_id');
  console.log('id확인:',id);
  const [samples, setSamples] = useState([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 10;
  
  useEffect(() => {
      const token = localStorage.getItem('token')

        axios
        .get(`${BASE_URL}/guest/doc/view`,{
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
            const sortedSamples = response.data.sort((a,b) => b.doc_id - a.doc_id);
            setSamples(sortedSamples);
            console.log('sortedSamples:', sortedSamples)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = samples.slice(indexOfFirstItem, indexOfLastItem);

    const totalPage = Math.ceil(samples.length / itemsPerPage);

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
            회람 문서함
          </Title>
          <PersonalMenu>
            <Button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</Button>
            <Button type="button" onClick={() => router.push('/guest/doc/list/approvalSuggestList')}>결재 요청목록</Button>
          </PersonalMenu>

          <TblComponent>
            <TblHeader>
              <DocTableTop>
                <thead>
                    <tr>
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
                  {currentItems.map(view =>
                    <tr key={view.doc_id} onClick={() => router.push(`/guest/doc/detail/circularDetail?id=${view.doc_id}`)}>
                      <td component="" scope="view">{view.doc_id}</td>
                      <td>{view.doc_title}</td>
                      <td>{view.name}</td>
                      <td>{formatDate(view.doc_date)}</td>
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