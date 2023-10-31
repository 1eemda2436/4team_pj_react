import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query; // ID를 추출
    console.log('id:', id);
    const userId = localStorage.getItem('user_id')

    const handleBack = () => {
        router.back(); // 이전 페이지로 이동
    };

    const [selectedCategory, setSelectedCategory] = useState('');
    const [imageSrc, setImageSrc] = useState("");
    const [insertImageSrc, setInsertImageSrc] = useState('');
    const [samples, setSamples] = useState({
        doc_title: '',
        doc_content: '',
        sign: null,
        admin_sign: null,
    });

    useEffect(() => {
        if(id) {
            axios.get(`http://localhost:8081/admin/doc/adminDetail/${id}`)
            .then((response) => {
                const {doc_id, doc_date, name, doc_status, doc_attachment, category_id, doc_title, doc_content, sign, admin_sign } = response.data;
                let date = new Date();
                let year = date.getFullYear();
                let month = ("0" + (1 + date.getMonth())).slice(-2);
                let day = ("0" + date.getDate()).slice(-2);
            
                let yyyymmdd = year + "-" + month + "-" + day;
                console.log('response.data:', response.data);
                setSamples({
                    doc_id,
                    doc_date,
                    name,
                    doc_status,
                    doc_attachment,
                    category_id,
                    doc_title,
                    doc_content,
                    approval_date: yyyymmdd,
                    sign,
                    admin_sign,
                });
                setImageSrc(`http://localhost:8081/myimage/${response.data.sign}`);
                setSelectedCategory(category_id);
            })
            .catch((error) => {
                console.error("문서 불러오기 실패", error);
            })
        }
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSamples((samples) => ({
        ...samples,
        [name]: value,
        }));
    };

    const handleInsertSign = () => {
        console.log('samples.admin_sign:',samples.admin_sign);
        if(samples.admin_sign) {
        const insertSamples = new FormData();
        insertSamples.append('name', samples.name);
        insertSamples.append('doc_status', samples.doc_status);
        insertSamples.append('doc_attachment', samples.doc_attachment);
        insertSamples.append('category_id', samples.category_id);
        insertSamples.append('doc_title', samples.doc_title);
        insertSamples.append('doc_content', samples.doc_content);
        insertSamples.append('approval_date', samples.approval_date);
        insertSamples.append('sign', samples.sign);
        insertSamples.append('admin_sign1', samples.admin_sign);
        insertSamples.append('id', userId);
        console.log('insertSamples:', insertSamples);
        console.log('samples:', samples);
        console.log('insertSamples:', insertSamples);
        
        const token = localStorage.getItem('token')
        

        axios.post("http://localhost:8081/admin/doc/insert", insertSamples, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            alert('결재사인 등록');
            hanldeUpdate();
        })
        .catch((error) => {
            console.error('사인등록 실패', error)
        });
        } else {
        console.error('admin_sign 없음', samples.admin_sign)
        }
    };

    const hanldeUpdate = () => {
        const updateSamples = new FormData();
        updateSamples.append('doc_status', '완료');
        updateSamples.append('approval_date', samples.approval_date);
        updateSamples.append('approval_content', samples.approval_content);
        const token = localStorage.getItem('token')
        
        if(id) {
            axios.put(`http://localhost:8081/admin/doc/updateEnd/${id}`, updateSamples, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('결재 완료')
                router.push(`/admin/doc/adminApprovalEndDetail?id=${samples.doc_id}`)
            })
            .catch((error) => {
                console.error("결재 실패:", error);
            });
        }
    }

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const encodeFileToBase64 = (fileBlob) => {
        // 첨부파일 전송을 위해 셋팅 
        const file = fileBlob;
        console.log('fileBlob:',fileBlob);
        setSamples((samples) => ({
        ...samples,
        admin_sign: file,
        }));
        

        // 미리보기
        const reader = new FileReader();
        reader.readAsDataURL(fileBlob);
        return new Promise((resolve) => {
            reader.onload = () => {
                setInsertImageSrc(reader.result);
                resolve();
            };
        });
    };

    return(
        <MainContainer>
            <Title>
                결 재
            </Title>
            <ApprovalLine>
                <table>
                    <tr>
                        <td>
                            {imageSrc && (
                                <img
                                    src={imageSrc}
                                    alt="사원사인"
                                    style={{ width: "100px", height: "100px" }}
                                />
                            )}
                        </td>
                        <td>
                            {insertImageSrc && <img src={insertImageSrc} alt="관리자사인" style={{width: '100px', height: '100px'}} />}
                        </td>
                    </tr>
                    <tr>
                        <td>
                            
                        </td>
                        <td>
                            <input 
                            type="file"
                            name="admin_sign2"
                            onChange={(e) => {
                                encodeFileToBase64(e.target.files[0]);
                                }
                            }
                            />
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
                                    <td>
                                        <input 
                                            type="number"
                                            name="doc_id"
                                            readOnly
                                            value={samples.doc_id}
                                            onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>결재일</th>
                                    <td>
                                        <input
                                        type="date"
                                        name="approval_date"
                                        value={samples.approval_date}
                                        onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                                <tr>
                                    <th>기안자</th>
                                    <td>
                                        <input 
                                        type="text"
                                        name="name"
                                        value={samples.name}
                                        onChange={handleInputChange}
                                        />
                                        <input 
                                        type="hidden"
                                        name="doc_status"
                                        value={samples.doc_status}
                                        onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                            </Table>
                        </DocstyleLeft>
                        <DocstyleRight>
                            <Table>
                                <tr>
                                    <th>결재의견</th>
                                    <td>
                                        <textarea 
                                        type="text"
                                        name="approval_content"
                                        value={samples.approval_content}
                                        onChange={handleInputChange}
                                        />
                                    </td>
                                </tr>
                            </Table>
                        </DocstyleRight>
                    </DocstyleRow>
                </TblHeader>

                <TblContent>
                    <TableContent>
                        <tr>
                            <th>제목</th>
                            <td>
                                <input 
                                    type="text"
                                    name="doc_title"
                                    value={samples.doc_title}
                                    onChange={handleInputChange}
                                />
                            </td>
                        </tr>
                        <tr>
                            <ContentTd colSpan={2}>
                                <input
                                    type="text"
                                    name="doc_content"
                                    value={samples.doc_content}
                                    onChange={handleInputChange}
                                />
                            </ContentTd>
                        </tr>
                    </TableContent>
                    <TableAttachment>
                        <tbody>
                            <tr>
                                <td> </td>
                            </tr>
                            <tr>
                                <th>첨부파일</th>
                                <td>{samples.doc_attachment}</td>
                            </tr>
                        </tbody>
                    </TableAttachment>
                    <CategoryTable>
                        <select value={selectedCategory} onChange={CategoryChange}>
                            <option value="">카테고리 선택</option>
                            <option value="1">카테고리 1</option>
                            <option value="2">카테고리 2</option>
                            <option value="3">카테고리 3</option>
                        </select>
                    </CategoryTable>
                </TblContent>
            </TblComponent>

            <ButtonStyle>
                <Button type="button" onClick={handleInsertSign}>결재</Button>
                <Button type="button" onClick={handleBack}>취소</Button>
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
    input[name="doc_title"] {
        width: 95%; 
        padding: 20px 25px; 
        font-size: 16px; 
    }

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
    input[name="doc_content"] {
        width: 98%;
        height: 95%;
        padding: 15px;
        font-size: 16px;
    }
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
    input[name="approval_content"] {
        width: 100px;
        height: 100px;
        padding: 15px;
        font-size: 12px;
    }
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

const CategoryTable = styled.div`
  margin-bottom: 20px;
  select {
    width: 150px;
    padding: 10px;
  }
`;

const ButtonStyle = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;

  button {
    width: 150px; /* 버튼 너비 조절 */
    padding: 10px;
    cursor: pointer;
    margin: 0 10px; /* 버튼 사이의 간격 조절 */
  }
`;