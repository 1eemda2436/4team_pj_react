import AdminLayout from "@/components/layout/adminLayout";
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { BASE_URL } from "@/api/apiPath";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query; // ID를 추출
    console.log(id);

    const handleBack = () => {
        router.back(); // 이전 페이지로 이동
    };


    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [samples, setSamples] = useState({
        doc_title: '',
        doc_content: '',
    });

    useEffect(() => {
        if(id) {
            axios.get(`${BASE_URL}/guest/doc/detail/${id}`)
            .then((response) => {
                const {doc_id, doc_date, name, doc_status, doc_attachment, category_id, doc_title, doc_content } = response.data;
                let date = new Date();
                let year = date.getFullYear();
                let month = ("0" + (1 + date.getMonth())).slice(-2);
                let day = ("0" + date.getDate()).slice(-2);
            
                let yyyymmdd = year + "-" + month + "-" + day;
                
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
                });
                setSelectedCategory(category_id);
            })
            .catch((error) => {
                console.error("문서 불러오기 실패", error);
            })
        }
    }, [id]);

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setSamples((prevSamples) => ({
        ...prevSamples,
        [name]: value,
        }));
    };

    const hanldeUpdate = () => {
        const updateSamples = new FormData();
        updateSamples.append('doc_status', '반려');
        updateSamples.append('approval_date', samples.approval_date);
        updateSamples.append('approval_content', samples.approval_content);
        const token = localStorage.getItem('token')
        
        if(id) {
            axios.put(`${BASE_URL}/admin/doc/updateBack/${id}`, updateSamples, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('반려 완료')
                router.push(`/admin/doc/adminApprovalBackDetail?id=${samples.doc_id}`)
            })
            .catch((error) => {
                console.error("반려 실패:", error);
            });
        }
    }

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return(
        <MainContainer>
            <Title>
                결 재
            </Title>

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
                                </td>
                                    <input 
                                    type="hidden"
                                    name="doc_status"
                                    value={samples.doc_status}
                                    onChange={handleInputChange}
                                    />
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
                <Button type="button" onClick={hanldeUpdate}>반려</Button>
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
        width: 100px; /* 칸의 너비 100%로 설정하여 늘어난 크기에 맞게 표시됩니다. */
        height: 100px;
        padding: 15px; /* 텍스트 패딩을 조절하여 칸 내부 여백을 늘립니다. */
        font-size: 12px; /* 폰트 크기를 조절할 수 있습니다. */
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
    width: 150px; /* 원하는 너비로 조절하세요 */
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