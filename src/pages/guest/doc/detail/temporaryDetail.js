import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const id = router.query.id; // ID를 추출
    console.log(id)
    
    const [samples, setSamples] = useState([]);

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        
        if (id) {
            console.log(id);
            axios.get(`http://localhost:8081/guest/doc/detail/${id}`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setSamples(response.data);
                console.log(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    // 파일 다운로드 
    const downloadFile = (fileName) => {
        const token = localStorage.getItem('token');
        // API를 통해 파일 다운로드 요청
        return axios.get(`http://localhost:8081/guest/doc/download/${fileName}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            // 이전 파일을 받아오기 위해 응답 타입을 blob으로 설정
            responseType: 'blob'
        })
        .then((response) => {
            // response로 받은 파일 데이터 가공
            const blob = new Blob([response.data], {type: response.headers['content-type'] });
            // 브라우저에서 파일을 다운로드할 수 있는 url 생성
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = fileName;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch((error) => {
            console.error('파일 다운로드 실패', error);
        });
    };

    const handleDownload = () => {
        if(samples.doc_attachment) {
            downloadFile(samples.doc_attachment);
        }
        else {
            alert('파일이 없습니다.');
        }
    };

    const handleDelete = () => {
        const token = localStorage.getItem("token");

        if(id) {
            axios.delete(`http://localhost:8081/guest/doc/delete/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('문서삭제 완료')
                // 문서 삭제 후 이동
                router.push("/guest/doc/save/temporarySave");
            })
            .catch((error) => {
                console.error("문서 삭제 실패:", error);
            });
        }
    }

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
                <H1>임시 저장 문서</H1>
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
                            <TableTh2>{samples.doc_title}</TableTh2>
                        </TableTr>
                        <TableTr>
                                <TableTd2 colSpan={2}>{samples.doc_content}</TableTd2>
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
                            <button type="button" onClick={handleDownload}>파일 다운로드</button>
                        </TableTr>
                    </div>
                </Table>
            </Docstyle2>
            <ButtonStyle>
                <button type="button" onClick={() => router.push(`/guest/doc/temporaryUpdate?id=${samples.doc_id}`)}>문서작성</button>
                <button type="button" onClick={handleDelete}>문서삭제</button>
                <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>돌아가기</button>
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