import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useState} from "react";



const Doc = () => {

    const TemporarySave = () => {

        console.log('임시 저장이 완료되었습니다.');
    }
    
    const Approval = () => {
    
        console.log('결재 요청이 완료되었습니다.');
    }

    const Complete = () => {

        console.log('문서 작성이 완료되었습니다.');
    }
    
    const Cancel = () => {
    
        console.log('문서 작성이 취소되었습니다.');
    }

    const [selectedCategory, setSelectedCategory] = useState('');

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return(
        <Container>
            <ApprovalLine>
                <table>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                    </tr>
                </table>
            </ApprovalLine>
            <Title>
                <H1>업무 기안서</H1>
            </Title>
            <Docstyle1>
                <DocstyleLeft>
                    <Table>
                        <TableTr>
                            <TableTh>문서번호</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안일</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안자</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                    </Table>
                </DocstyleLeft>
                <DocstyleRight>
                    <ButtonStyle>
                        <button type="button" onClick={TemporarySave}>임시 저장</button>
                        <button type="button" onClick={Approval}>결재 요청</button>
                    </ButtonStyle>
                </DocstyleRight>
            </Docstyle1>
            <Docstyle2>
                <Table>
                        <TableTr>
                            <TableTh3>제목</TableTh3>
                            <TableTh2>여기에 문서 제목</TableTh2>
                        </TableTr>
                        <TableTr>
                                <TableTd2 colSpan={2}>문서 내용</TableTd2>
                        </TableTr>
                </Table>
                <br></br>
                <Table>
                        <TableTr>
                            <TableTh3>구분</TableTh3>
                            <TableTd3> </TableTd3>
                        </TableTr>
                        <TableTr>
                            <TableTh3>첨부파일</TableTh3>
                            <TableTd3>여기에 첨부파일</TableTd3>
                        </TableTr>
                </Table>
            </Docstyle2>
            <CategoryTable>
                <select value={selectedCategory} onChange={CategoryChange}>
                    <option value="">카테고리 선택</option>
                    <option value="category1">카테고리 1</option>
                    <option value="category2">카테고리 2</option>
                    <option value="category3">카테고리 3</option>
                </select>
            </CategoryTable>
            <ButtonStyle>
                <button type="button" onClick={Complete}>완료</button>
                <button type="button" onClick={Cancel}>취소</button>
            </ButtonStyle>
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
`;

const ApprovalLine = styled.div`
    text-align: right;
    margin-bottom: 20px;
    margin-left: auto;
    tr {
        border: solid 1px;
    };

    td {
        border: solid 1px;
        width: 100px;
        height: 100px;
    }
`;

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;
const Docstyle1 = styled.div`
    display: flex;
    justify-content: space-between;
    margin: 10px;
`;

const Docstyle2 = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 10px;
`;

const DocstyleLeft = styled.div`
    margin-left: 10px;
`;

const DocstyleRight = styled.div`
    margin-right: 10px;
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
    width: 600px;
`;

const TableTh3 = styled.th`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: 60px;
`;

const TableTd = styled.td`
    border: 1px solid;
    width: 80px;
`;

const TableTd2 = styled.td`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: 200px;
    height: 300px;
`;

const TableTd3 = styled.td`
    border: 1px solid;
    padding-left: 10px;
    padding-right: 10px;
    width: 600px;
`;

const ButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 20px;

    button {
        border: solid 1px;
        padding: 10px 20px;
        font-size: 16px;
        background-color: gray;
        color: white;
        border: none;
        cursor: pointer;
        margin: 1px;
    }

`;

const CategoryTable = styled.div`
    display: flex;
    justify-content: flex-end;
`;