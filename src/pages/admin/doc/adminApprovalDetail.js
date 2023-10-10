import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, {useState} from "react";



const Doc = () => {

    const Approval = () => {

    }

    const Return = () => {
        
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
            <Docstyle1>
                <DocstyleLeft>
                    <Table>
                        <TableTr>
                            <TableTh>결재번호</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안자</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>문서번호</TableTh>
                            <TableTd>1</TableTd>
                        </TableTr>
                    </Table>
                </DocstyleLeft>
                <DocstyleRight>
                    <Comment placeholder="결재 의견을 입력하세요" />
                    <ButtonStyle>
                        <button type="button" onClick={Approval}>결재</button>
                        <button type="button" onClick={Return}>반려</button>
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
    text-align: right;
`;

const Comment = styled.textarea`
    width: 100%;
    min-height: 100px;
    margin-bottom: 10px;
    resize: vertical;
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