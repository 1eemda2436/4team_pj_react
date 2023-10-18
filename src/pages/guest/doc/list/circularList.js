import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8081/doc/view")
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
                <H1>회람 문서함</H1>
            </Title>
            <Docstyle2>
                <Table>
                    <thead>
                        <TableTr>
                            <TableTh2>문서번호</TableTh2>
                            <TableTh2>카테고리</TableTh2>
                            <TableTh2>문서 제목</TableTh2>
                            <TableTh2>작성자</TableTh2>
                            <TableTh2>기안일</TableTh2>
                            <TableTh2>조회여부</TableTh2>
                        </TableTr>
                    </thead>
                    <tbody>
                        {samples.map(view =>
                            <TableTr key={view.doc_id} onClick={() => router.push(`/guest/doc/detail/draftDetail?id=${view.doc_id}`)}>
                            <TableTd2 component="" scope="view">{view.doc_id}</TableTd2>
                            <TableTd2>{view.category_name}</TableTd2>
                            <TableTd2>{view.doc_title}</TableTd2>
                            <TableTd2>{view.name}</TableTd2>
                            <TableTd2>{view.doc_date}</TableTd2>
                            <TableTd2>{view.doc_read}</TableTd2>
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