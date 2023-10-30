import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    // const {id} = router.query;
    const id = localStorage.getItem('user_id');
    console.log('id가뭐야',id);
    
    const [selectedCategory, setSelectedCategory] = useState('');

    const [samples, setSamples] = useState({
      doc_id: '',
      doc_date: '',
      name: '',
      doc_title: '',
      doc_content: '',
      doc_attachment: null,
      doc_status: null,
      id:id,
      sign: null,
    });

    const [imageSrc, setImageSrc] = useState('');

    useEffect(() => {
      const user_name = localStorage.getItem('user_name');
      setSamples({
        ...samples,
        name: user_name
      })
    }, [id]);

    const handleInputChange = (e) => {
      const {name, value} = e.target;
      setSamples((samples) => ({
        ...samples,
        [name]: value,
      }));
    };

    const handleFileChange = (f) => {
      const file = f.target.files[0];
      setSamples((samples) => ({
        ...samples,
        doc_attachment: file,
      }));
    };

    const handleInsert = () => {
      const insertSamples = new FormData();
      // insertSamples.append('doc_id', samples.doc_id);
      insertSamples.append('doc_date', samples.doc_date);
      insertSamples.append('name', samples.name);
      insertSamples.append('doc_title', samples.doc_title);
      insertSamples.append('doc_content', samples.doc_content);
      insertSamples.append('doc_attachment2', samples.doc_attachment);
      insertSamples.append('sign2', samples.sign);
      insertSamples.append('id', samples.id);
      insertSamples.append('category_id', selectedCategory);
      insertSamples.append('doc_status', '기안');
      
      const token = localStorage.getItem('token')

      axios.post("http://localhost:8081/guest/doc/insert", insertSamples, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
          alert('문서등록 완료');
          router.push('/guest/doc/list/draftingList');
      })
      .catch((error) => {
        console.error('문서 등록 실패', error)
      });
    };

    const handleTemporarySave = () => {
      const temporarySaveData = new FormData();
      temporarySaveData.append('doc_date', samples.doc_date);
      temporarySaveData.append('name', samples.name);
      temporarySaveData.append('doc_title', samples.doc_title);
      temporarySaveData.append('doc_content', samples.doc_content);
      temporarySaveData.append('doc_attachment2', samples.doc_attachment);
      temporarySaveData.append('sign2', samples.sign);
      temporarySaveData.append('id', samples.id);
      temporarySaveData.append('category_id', selectedCategory);
      temporarySaveData.append('doc_status', '임시'); // 임시 상태로 설정
  
      const token = localStorage.getItem('token');
  
      axios.post("http://localhost:8081/guest/doc/temporarySave", temporarySaveData, {
          headers: {
              'Authorization': `Bearer ${token}`
          }
      })
      .then((response) => {
          alert('임시 저장 완료');
          router.push('/guest/doc/save/temporarySave');
      })
      .catch((error) => {
          console.error('임시 저장 실패', error);
      });
  };

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const encodeFileToBase64 = (fileBlob) => {
      // 첨부파일 전송을 위해 셋팅 
      const file = fileBlob;
      setSamples((samples) => ({
        ...samples,
        sign: file,
      }));

    // 미리보기
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result);
        resolve();
      };
    });
  };

    return(
      <MainContainer>
          <Title>
              업무 기안서
          </Title>
          <ApprovalLine>
              <table>
                  <tr>
                      <td>
                        {imageSrc && <img src={imageSrc} alt="미리보기" style={{width: '100px', height: '100px'}} />}
                      </td>
                      <td></td>
                  </tr>
                  <tr>
                    <td>
                      <input 
                        type="file"
                        name="signFile"
                        onChange={(e) => {
                          encodeFileToBase64(e.target.files[0]);
                        }
                      }
                      />
                      </td>
                      <td></td>
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
                              {samples.doc_id}
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
                                readOnly
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
                              <input 
                                type="hidden"
                                name="approval_id"
                                value={samples.approval_id}
                                onChange={handleInputChange}
                              />
                        </tr>
                    </Table>
                </DocstyleLeft>
                <DocstyleRight>
                    <ButtonStyle>
                        <Button type="button" onClick={handleTemporarySave}>임시 저장</Button>
                    </ButtonStyle>
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
                      <td>
                        <input 
                          type="file"
                          name="doc_attachment"
                          onChange={(f) => handleFileChange(f)}
                        />
                        </td>
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
              <Button type="button" onClick={handleInsert}>완료</Button>
              <Button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>취소</Button>
          </ButtonStyle>
      </MainContainer>
  )
}

export default Doc;

Doc.getLayout = function getLayout(page) {
  return <MainLayout>{page}</MainLayout>;
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