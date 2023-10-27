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
        doc_date: null,
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
        setSamples((prevSamples) => ({
        ...prevSamples,
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

    const hanldeUpdate = () => {
        const updateSamples = new FormData();
        updateSamples.append('doc_status', '진행');
        const token = localStorage.getItem('token')
        
        if(id) {
            axios.put(`http://localhost:8081/guest/doc/updateIng/${id}`, updateSamples, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(() => {
                alert('결재요청 완료')
                router.push('/guest/doc/list/draftingList')
            })
            .catch((error) => {
                console.error("결재요청 실패:", error);
            });
        }
    }

    const CategoryChange = (event) => {
        setSelectedCategory(event.target.value);
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
                                {samples.doc_date}
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
                    </table>
                </DocstyleLeft>
                    
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
                            <td>{samples.doc_attachment}</td>
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
                <button type="button" onClick={hanldeUpdate}>결재요청</button>
                <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>돌아가기</button>
            </ButtonStyle>
        </Container>
    )
}

export default Doc;

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