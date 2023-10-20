import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        const token = localStorage.getItem('token');

        axios
        .get("http://localhost:8081/guest/doc/guestTotal",{
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
                <H1>전자 결재</H1>
            </Title>
            <PersonalMenu>
                <tbody>
                    <tr>
                        <td>개인문서함</td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</button>
                        </td>
                    </tr>
                </tbody>
            </PersonalMenu>
            <Docstyle2>
                    <thead>
                        <tr>
                            <th>문서번호</th>
                            <th>카테고리</th>
                            <th >문서 제목</th>
                            <th>작성자</th>
                            <th>기안일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((draft) =>
                            <tr key={draft.doc_id} onClick={() => router.push(`/guest/doc/detail/draftDetail?id=${draft.doc_id}`)}>
                                <td component="" scope="draft">{draft.doc_id}</td>
                                <td>{draft.category_name}</td>
                                <td >{draft.doc_title}</td>
                                <td>{draft.name}</td>
                                <td>{draft.doc_date}</td>
                            </tr>
                        )}
                    </tbody>
                <Table>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push(`/guest/doc/insertDraft`)}>문서 작성</button>
                        </td>
                    </tr>
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
  justify-content: center;
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const PersonalMenu = styled.table`
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

const Table = styled.table`
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