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
      <Container>
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
          <Title>
              <H1>업무 기안서</H1>
          </Title>
          <Docstyle1>
              <DocstyleLeft>
                  <table>
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
                  </table>
              </DocstyleLeft>
              <DocstyleRight>
                  <ButtonStyle>
                      <button type="button" onClick={handleTemporarySave}>임시 저장</button>
                  </ButtonStyle>
              </DocstyleRight>
          </Docstyle1>
          <Docstyle2>
              <table>
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
                    <td colSpan={2}>
                      <input 
                        type="text"
                        name="doc_content"
                        value={samples.doc_content}
                        onChange={handleInputChange}
                      />
                    </td>
                  </tr>
              </table>
              <br></br>
              <table>
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
              </table>
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
              <button type="button" onClick={handleInsert}>완료</button>
              <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>취소</button>
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
align-items: center;
padding: 20px;
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

const H1 = styled.h1`
font-size: 30px;
margin-bottom: 10px;
`;

const Docstyle1 = styled.div`
width: 80%;
display: flex;
justify-content: space-between;
margin-bottom: 20px;
`;

const DocstyleLeft = styled.div`
width: 48%;
table {
  width: 100%;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f5f5f5;
  }
}
`;

const DocstyleRight = styled.div`
width: 48%;
display: flex;
justify-content: space-between;
button {
  width: 48%;
  padding: 10px;
  cursor: pointer;
  &:first-child {
    margin-right: 4%;
  }
}
`;

const Docstyle2 = styled.div`
width: 80%;
margin-bottom: 20px;
table {
  width: 100%;
  th,
  td {
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
  }
  th {
    background-color: #f5f5f5;
  }
}
`;

const CategoryTable = styled.div`
margin-bottom: 20px;
select {
  width: 100%;
  padding: 10px;
}
`;

const ButtonStyle = styled.div`
button {
  width: 48%;
  padding: 10px;
  cursor: pointer;
  &:first-child {
    margin-right: 4%;
  }
}
`;