import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
    const router = useRouter();
    const {id} = router.query;

    const [selectedCategory, setSelectedCategory] = useState('');

    const [samples, setSamples] = useState({
      doc_id: '',
      doc_date: '',
      name: '',
      doc_title: '',
      doc_content: '',
      doc_attachment: null,
    });

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
      insertSamples.append('id', "4");
      insertSamples.append('category_id', selectedCategory);
      
      const token = localStorage.getItem('token')

      axios.post("http://localhost:8081/guest/doc/insert", insertSamples, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
          alert('문서등록 완료');
          router.push('guest/doc/list/draftingList');
      })
      .catch((error) => {
        console.error('문서 등록 실패', error)
      });
    };

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
                  <table>
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
                          </tr>
                  </table>
              </DocstyleLeft>
              <DocstyleRight>
                  <ButtonStyle>
                      <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장</button>
                      <button type="button" onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 요청</button>
                  </ButtonStyle>
              </DocstyleRight>
          </Docstyle1>
          <Docstyle2>
              <table>
                  <tr>
                    <th>제목</th>
                    <th>
                      <input 
                        type="text"
                        name="doc_title"
                        value={samples.doc_title}
                        onChange={handleInputChange}
                      />
                    </th>
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
                    <th>구분</th>
                    <td> </td>
                  </tr>
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
margin-bottom: 20px;
table {
  width: 100%;
  td {
    width: 33.33%;
    cursor: pointer;
    border: 1px solid #ddd;
    padding: 10px;
    text-align: center;
    &:hover {
      background-color: #f5f5f5;
    }
  }
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