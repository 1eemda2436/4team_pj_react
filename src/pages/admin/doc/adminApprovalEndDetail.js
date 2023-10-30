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
        <MainContainer>
            <Title>
                완료 문서
            </Title>
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

            <TblComponent>
                <TblHeader>
                    <DocstyleRow>
                        <DocstyleLeft>
                            <Table>
                                <tr>
                                    <th>문서번호</th>
                                    <td component="" scope="adminDetail">{samples.doc_id}</td>
                                </tr>
                                <tr>
                                    <th>기안자</th>
                                    <td>{samples.name}</td>
                                </tr>
                                <tr>
                                    <th>결재일</th>
                                    <td>{formatDate(samples.approval_date)}</td>
                                </tr>
                            </Table>
                        </DocstyleLeft>
                        <DocstyleRight>
                            <Table>
                                <tr>
                                    <th>결재의견</th>
                                </tr>
                                <tr>
                                    <td>{samples.approval_content}</td>
                                </tr>
                            </Table>
                        </DocstyleRight>
                    </DocstyleRow>
                </TblHeader>

            <TblContent>
                <TableContent>
                        <tr>
                            <th>제목</th>
                            <td>{samples.doc_title}</td>
                        </tr>
                        <tr>
                                <ContentTd colSpan={2}>{samples.doc_content}</ContentTd>
                        </tr>
                </TableContent>
                <TableAttachment>
                    <tr>
                        <td> </td>
                    </tr>
                    <tr>
                        <th>첨부파일</th>
                        <td>{samples.doc_attachment}</td>
                        <Button type="button" onClick={handleDownload}>파일 다운로드</Button>
                    </tr>
                </TableAttachment>
            </TblContent>

            </TblComponent>
            <ButtonStyle>
                <Button type="button" onClick={handleBack}>돌아가기</Button>
            </ButtonStyle>
        </MainContainer>
    )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};

const MainContainer = styled.div`
  width: 100%;
  min-height: 100vh;
  padding: 40px;
  display: flex;
flex-direction: column;
justify-content: center;
  box-sizing: border-box;
`;

const Title = styled.div`
  font-size: 26px;
  font-weight: 700;
  color: #007bff;
`;

const ApprovalLine = styled.div`
    text-align: right;
    margin-bottom: 20px;
    margin-left: auto;
    margin-right: 20%;
    tr {
        border: 1px solid #E5E5E5;
        border-radius: 5px;
        box-shadow: 0 2px 5px rgba(0,0,0,.10);
        box-sizing: border-box;
    };

    td {
        border: 1px solid #E5E5E5;
        border-radius: 5px;
        width: 100px;
        height: 100px;
        box-shadow: 0 2px 5px rgba(0,0,0,.10);
        box-sizing: border-box;
    }
`;

const DocstyleRow = styled.div`
    display: flex;
    align-items: flex-start;
`;

const TblComponent = styled.div`
  border: 1px solid #E5E5E5;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,.10);
  box-sizing: border-box;
  margin-top: 40px;
`;

const TblHeader = styled.div`
  padding: 0px 15px;
  background: #F6F8FA;
  border-radius: 5px 5px 0px 0px;
`;

const Button = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  margin-right: 20px;
`;

const TblContent = styled.div`
    margin: 20px;

`;

const TableContent = styled.table`
    border: 1px solid #E5E5E5;
    width: 100%;
    margin-top: 10px;

    th {
        padding: 20px 25px;  // 내용이 넉넉하게 나오도록 패딩을 조정합니다.
        border: solid 1px #E5E5E5;
        font-size: 16px;
        text-align: left;  // 텍스트를 왼쪽 정렬로 변경합니다.
        word-wrap: break-word;
        font-weight: 500;
        text-transform: uppercase;
        white-space: nowrap;
    }
`;

const ContentTd = styled.td`
    height: 500px;
    padding: 25px;  // 내용이 넉넉하게 나오도록 패딩을 조정합니다.
    border: solid 1px #E5E5E5;
    font-size: 16px;
    text-align: left;  // 텍스트를 왼쪽 정렬로 변경합니다.
    word-wrap: break-word;
`;

const TableAttachment = styled.table`
    border: 1px solid #E5E5E5;
    width: 100%;
    margin-top: 10px;

    th, td {
        padding: 15px 20px;
        border: solid 1px #E5E5E5;
        font-size: 16px;
        text-align: center;
        word-wrap: break-word;
    }

    th {
        font-weight: 500;
        text-transform: uppercase;
        white-space: nowrap;
    }
`;

const DocstyleLeft = styled.div`
    margin-left: 10px;
`;

const DocstyleRight = styled.div`
    margin-left: auto;
    text-align: center;
    padding-right: 10px;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
`;

const Table = styled.table`
    border: 1px solid;

    th {
        padding: 20px 15px;
        border: solid 1px #E5E5E5;
        font-weight: 500;
        font-size: 15px;
        text-transform: uppercase;
        white-space: nowrap;
    }

    td {
        padding: 15px;
        border: solid 1px #E5E5E5;
        vertical-align: middle;
        font-size: 15px;
        text-align: center;
        word-wrap: break-word;
    }
`;

const ButtonStyle = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 40px;
`;

