import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query.id; // ID를 추출
    console.log(id);

    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [samples, setSamples] = useState({
        doc_id: '',
        doc_date: '',
        name: '',
        doc_title: '',
        doc_content: '',
        doc_status: null,
    });

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8081/guest/doc/detail/${id}`);
                setSamples(response.data);
            } catch (error) {
                console.error("문서 정보를 불러오는 중 오류 발생:", error);
            }
        };
    
        if (id) {
            fetchData();
        }
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSamples((samples) => ({
            ...samples,
            [name]: value,
        }));
        };
        
        const CategoryChange = (event) => {
            setSelectedCategory(event.target.value);
        };

    const hanldeUpdate = async () => {
        try {
            const token = localStorage.getItem("token");
            const updateData = {
            doc_date: samples.doc_date,
            name: samples.name,
            doc_title: samples.doc_title,
            doc_content: samples.doc_content,
            category_id: samples.category_id,
            doc_status: samples.doc_status,
        };
        await axios.put(`http://localhost:8081/guest/doc/update/${id}`, updateData, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
        });

        alert("문서 업데이트 성공");
        router.push(`/guest/doc/detail/${id}`);
        } catch (error) {
            console.error("업데이트 실패", error);
        }
    };

    return(
        <Container>
            <ApprovalLine>
                <table>
                    <tr>
                        <td onClick={() => router.push('/guest/doc/approvalLine')}></td>
                        <td onClick={() => router.push('/guest/doc/approvalLine')}></td>
                        <td onClick={() => router.push('/guest/doc/approvalLine')}></td>
                    </tr>
                </table>
            </ApprovalLine>
            <Title>
                <H1>업무 기안서</H1>
            </Title>
            <Docstyle1>
                <DocstyleLeft>
                    <Table>
                        <div>
                        <TableTr>
                            <TableTh>문서번호</TableTh>
                            <TableTd component="" scope="detail">{samples.doc_id}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안일</TableTh>
                            <TableTd>{samples.doc_date}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안자</TableTh>
                            <TableTd>{samples.name}</TableTd>
                        </TableTr>
                        </div>
                    </Table>
                </DocstyleLeft>
                    
            </Docstyle1>
            <Docstyle2>
                <Table>
                    <div>
                        <TableTr>
                            <TableTh3>제목</TableTh3>
                            <TableTh2>
                                <input 
                                    type="text"
                                    name="doc_title"
                                    value={samples.doc_title}
                                    onChange={handleInputChange}
                                />
                            </TableTh2>
                        </TableTr>
                        <TableTr>
                                <TableTd2 colSpan={2}>
                                    <input
                                        type="text"
                                        name="doc_content"
                                        value={samples.doc_content}
                                        onChange={handleInputChange}
                                    />
                                    </TableTd2>
                        </TableTr>
                    </div>
                </Table>
                <br></br>
                <Table>
                    <div>
                        <TableTr>
                            <TableTh3>구분</TableTh3>
                            <TableTd3> </TableTd3>
                        </TableTr>
                        <TableTr>
                            <TableTh3>첨부파일</TableTh3>
                            <TableTd3>{samples.doc_attachment}</TableTd3>
                        </TableTr>
                    </div>
                </Table>
            </Docstyle2>
            <CategoryTable>
                <select value={selectedCategory} onChange={CategoryChange}>
                    <option value="">카테고리 선택</option>
                    <option value="1">카테고리 1</option>
                    <option value="2">카테고리 2</option>
                    <option value="3">카테고리 3</option>
                </select>
            </CategoryTable>
            <ButtonStyle>
                <button type="button" onClick={hanldeUpdate}>수정완료</button>
                <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>돌아가기</button>
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
margin-bottom: 20px;
select {
  width: 100%;
  padding: 10px;
}
`;