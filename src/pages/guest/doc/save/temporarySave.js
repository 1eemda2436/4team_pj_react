import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
  const router = useRouter();
  
  const [samples, setSamples] = useState([]);
  
  useEffect(() => {
      const token = localStorage.getItem('token')
      
      axios
      .get("http://localhost:8081/guest/doc/temporary",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
          setSamples(response.data);
      })
      .catch((error) => {
          console.log(error);
      });
    }, []);
    return(
        <Container>
            <Title>
                <H1>임시 저장 목록</H1>
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
                            <TableTh2 isTitle>문서 제목</TableTh2>
                            <TableTh2>임시저장일</TableTh2>
                        </TableTr>
                    </thead>
                    <tbody>
                        {samples.map((temporary) => 
                            <TableTr key={temporary.doc_id} onClick={() => router.push(`/guest/doc/detail/temporaryDetail?id=${temporary.doc_id}`)}>
                            <TableTd2 component="" scope="temporary">{temporary.doc_id}</TableTd2>
                            <TableTd2 isTitle>{temporary.doc_title}</TableTd2>
                            <TableTd2>{temporary.save_date}</TableTd2>
                            </TableTr>
                            )}
                    </tbody>
                </Table>
            </Docstyle2>
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
  ${(props) => props.isTitle && "width: 60%;"}
`;

const TableTd2 = styled.td`
  border: 1px solid #ddd;
  padding: 10px;
  text-align: center;
  ${(props) => props.isTitle && "text-align: left;"}
`;