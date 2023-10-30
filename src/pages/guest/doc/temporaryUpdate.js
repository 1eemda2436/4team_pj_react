import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query; // ID를 추출
    console.log(id);

    const [selectedCategory, setSelectedCategory] = useState('');
    
    const [samples, setSamples] = useState({
        doc_title: '',
        doc_content: '',
    });

    useEffect(() => {
        if(id) {
            axios.get(`http://localhost:8081/guest/doc/detail/${id}`)
            .then((response) => {
                const {doc_id, doc_date, name, doc_status, doc_attachment, category_id, doc_title, doc_content } = response.data;
                setSamples({
                    doc_id,
                    doc_date,
                    name,
                    doc_status,
                    doc_attachment,
                    category_id,
                    doc_title,
                    doc_content,
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
        setSamples((samples) => ({
        ...samples,
        doc_title: name === 'doc_title' ? value : samples.doc_title,
        doc_content: name === 'doc_content' ? value : samples.doc_content,
        }));
    };

    const handleFileChange = (f) => {
        const file = f.target.files[0];
        setSamples((samples) => ({
        ...samples,
        doc_attachment: file,
        }));
    };

    const hanldeUpdate = () => {
        const updateSamples = new FormData();
        updateSamples.append('doc_title', samples.doc_title);
        updateSamples.append('doc_content', samples.doc_content);
        updateSamples.append('doc_status', '기안');
        updateSamples.append('category_id', selectedCategory);

        const token = localStorage.getItem('token')
        
        if(id) {
            axios.put(`http://localhost:8081/guest/doc/update/${id}`, updateSamples, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('문서수정 완료')
                router.push(`/guest/doc/detail/draftDetail?id=${samples.doc_id}`)
            })
            .catch((error) => {
                console.error("문서 수정 실패:", error);
            });
        }
    }

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    return(
        <MainContainer>
            <Title>
                업무 기안서
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
                            <th>기안일</th>
                            <td>
                                <input
                                type="date"
                                name="doc_date"
                                value={samples.doc_date}
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
                                <textarea
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
                <Button type="button" onClick={hanldeUpdate}>수정완료</Button>
                <Button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>돌아가기</Button>
            </ButtonStyle>
        </MainContainer>
    )
}

export default Doc;

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
    textarea[name="doc_content"] {
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