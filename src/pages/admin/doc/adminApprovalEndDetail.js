import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {

    const router = useRouter();
    const id = router.query.id; // ID를 추출
    console.log(id)

    const handleBack = () => {
        router.back(); // 이전 페이지로 이동
    };

    const [samples, setSamples] = useState([]);
    console.log('samples.sign:', samples.sign)
    console.log('samples.admin_sign:', samples.admin_sign)
    const [imageSrc, setImageSrc] = useState("");
    const [imageSrc2, setImageSrc2] = useState('');

    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (id) {
            console.log(id);
            axios.get(`http://localhost:8081/admin/doc/adminDetail/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setSamples(response.data);
                console.log('response.data:', response.data);
                setImageSrc(`http://localhost:8081/myimage/${response.data.sign}`);
                setImageSrc2(`http://localhost:8081/myimage/${response.data.admin_sign}`);
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
        <Container>
            <ApprovalLine>
                <table>
                    <tr>
                        <td>
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    alt="기안자사인"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                        </td>           
                        <td>
                            {imageSrc2 && (
                                <img 
                                    src={imageSrc2}
                                    alt="관리자사인"
                                    style={{width: "100px", height: "100px"}}
                                />
                            )}
                        </td>
                    </tr>
                </table>
            </ApprovalLine>
            <Docstyle1>
                <DocstyleLeft>
                    <Table>
                        <TableTr>
                            <TableTh>문서번호</TableTh>
                            <TableTd component="" scope="adminDetail">{samples.doc_id}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>기안자</TableTh>
                            <TableTd>{samples.name}</TableTd>
                        </TableTr>
                        <TableTr>
                            <TableTh>결재일</TableTh>
                            <TableTd>{formatDate(samples.approval_date)}</TableTd>
                        </TableTr>
                    </Table>
                </DocstyleLeft>
                <DocstyleRight>
                    <table>
                        <tr>
                            <th>결재의견</th>
                            <td>{samples.approval_content}</td>
                        </tr>
                    </table>
                </DocstyleRight>
            </Docstyle1>
            <Docstyle2>
                <Table>
                        <TableTr>
                            <TableTh3>제목</TableTh3>
                            <TableTh2>{samples.doc_title}</TableTh2>
                        </TableTr>
                        <TableTr>
                                <TableTd2 colSpan={2}>{samples.doc_content}</TableTd2>
                        </TableTr>
                </Table>
                <br></br>
                <Table>
                    <TableTr>
                        <TableTd3> </TableTd3>
                    </TableTr>
                    <TableTr>
                        <TableTh3>첨부파일</TableTh3>
                        <TableTd3>{samples.doc_attachment}</TableTd3>
                        <button type="button" onClick={handleDownload}>파일 다운로드</button>
                    </TableTr>
                </Table>
            </Docstyle2>
            <ButtonStyle>
                <button type="button" onClick={handleBack}>돌아가기</button>
            </ButtonStyle>
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