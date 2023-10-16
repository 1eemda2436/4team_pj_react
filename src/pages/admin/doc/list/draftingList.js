import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

const Doc = () => {

    const router = useRouter();

    // const [samples, setSamples] = useState([]);

    // useEffect(() => {
    //     fetch("http://localhost:8081/draft", {
    //     })
    //         .then(response => response.json())
    //         .then(data => {
    //             setSamples(data);
    //         })
    //         .catch(error => {
    //             console.error("API 호출 오류:", error);
    //         });
    // }, []);

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8081/doc/draft")
        .then((response) => {
            setSamples(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return (
        <Container>
            <Title>
                <H1>기안 문서함</H1>
            </Title>
            <Docstyle2>
                <Table>
                    <thead>
                        <TableTr>
                            <TableTh2>문서번호</TableTh2>
                            <TableTh2>카테고리</TableTh2>
                            <TableTh2 >문서 제목</TableTh2>
                            <TableTh2>작성자</TableTh2>
                            <TableTh2>기안일</TableTh2>
                        </TableTr>
                    </thead>
                    <tbody>
                        {samples.map(draft =>
                            <TableTr key={draft.save_id}>
                                <TableTd2 component="" scope="draft">{draft.doc_id}</TableTd2>
                                <TableTd2>{draft.category_id}</TableTd2>
                                <TableTd2 >{draft.doc_title}</TableTd2>
                                <TableTd2>{draft.name}</TableTd2>
                                <TableTd2>{draft.doc_date}</TableTd2>
                            </TableTr>
                        )}
                    </tbody>
                </Table>
                <Table>
                    <TableTd2>
                    <button type="button" onClick={() => router.push('/guest/doc/insertDraft')}>문서 작성</button>
                    </TableTd2>
                </Table>
            </Docstyle2>
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
`;

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const Docstyle1 = styled.div`
    display: flex;
    justify-content: flex-start;
    margin: 10px;
`;

const Docstyle2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const H1 = styled.h1`
    font-size: 30px;
`;

const Table = styled.table`
    border: 1px solid;
`;

const TableTr = styled.tr`
    border: 1px solid;
`;

const TableTh = styled.th`
    border: 1px solid;
    padding: 5px;
`;

const TableTh2 = styled.th`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: ${(props) => (props.isTitle ? '40%' : 'auto%')};
    width: 100px;
`;

const TableTd = styled.td`
    border: 1px solid;
`;

const TableTd2 = styled.td`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: ${(props) => (props.isTitle ? '40%' : 'auto%')};
`;