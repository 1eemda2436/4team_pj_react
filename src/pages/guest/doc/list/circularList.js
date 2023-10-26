import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


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
        .get("http://localhost:8081/guest/doc/view",{
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

    return(
        <Container>
            <Title>
                <H1>회람 문서함</H1>
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
                    </tr>
                </tbody>
            </Docstyle1>
            <Docstyle2>
                <Table>
                    <thead>
                        <TableTr>
                            <TableTh2>문서번호</TableTh2>
                            <TableTh2>문서 제목</TableTh2>
                            <TableTh2>작성자</TableTh2>
                            <TableTh2>기안일</TableTh2>
                            <TableTh2>조회여부</TableTh2>
                        </TableTr>
                    </thead>
                    <tbody>
                        {currentItems.map(view =>
                            <TableTr key={view.doc_id} onClick={() => router.push(`/guest/doc/detail/circularDetail?id=${view.doc_id}`)}>
                            <TableTd2 component="" scope="view">{view.doc_id}</TableTd2>
                            <TableTd2>{view.doc_title}</TableTd2>
                            <TableTd2>{view.name}</TableTd2>
                            <TableTd2>{view.doc_date}</TableTd2>
                            <TableTd2>{view.doc_read}</TableTd2>
                            </TableTr>
                            )}
                    </tbody>
                </Table>
            </Docstyle2>
            <PageButton>
                <button onClick={() => handleClick("prev")} disabled={page === 1}>이전</button>
                <span>{page} / {totalPage}</span>
                <button onClick={() => handleClick("next")} disabled={page === totalPage}>다음</button>
          </PageButton>
        </Container>
    )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Container = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const H1 = styled.h1`
  font-size: 30px;
  margin-bottom: 10px;
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

const Docstyle2 = styled.div`
  width: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
`;

const TableTr = styled.tr`
  border: 1px solid #ddd;
  &:hover {
    background-color: #f5f5f5;
  }
`;

const TableTh2 = styled.th`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
`;

const TableTd2 = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
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