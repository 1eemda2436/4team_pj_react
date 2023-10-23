import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";


const Doc = () => {
  const router = useRouter();
  
  const [samples, setSamples] = useState([]);
  const [filteredSamples, setFilteredSamples] = useState([]);
  
  useEffect(() => {
      const token = localStorage.getItem('token')
      
      axios
      .get("http://localhost:8081/guest/doc/temporary",{
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then((response) => {
        setSamples(response.data);
        const filteredData = response.data.filter(temporary => temporary.doc_status === '임시');
        setFilteredSamples(filteredData);
        console.log(filteredData)
    })
      .catch((error) => {
          console.log(error);
      });
    }, []);
    return(
        <Container>
            <Title>
                <H1>임시 저장 목록</H1>
            </Title>
            <Docstyle1>
                <tbody>
                    <tr>
                        <th>
                            <button type="button" onClick={() => router.push('/guest/doc/list/draftingList')}>기안 문서함</button>
                        </th>
                        <th>
                            <button type="button" onClick={() => router.push('/guest/doc/list/circularList')}>회람 문서함</button>
                        </th>
                        <th>
                            <button type="button" onClick={() => router.push('/guest/doc/save/temporarySave')}>임시 저장목록</button>
                        </th>
                    </tr>
                </tbody>
            </Docstyle1>
            <Docstyle2>
                    <thead>
                      <tr>
                        <th>문서번호</th>
                        <th>카테고리</th>
                        <th >문서 제목</th>
                        <th>작성자</th>
                        <th>기안일</th>
                        <th>상태</th>
                      </tr>
                    </thead>
                    <tbody>
                        {filteredSamples.map((temporary) => 
                            <tr key={temporary.doc_id} onClick={() => router.push(`/guest/doc/detail/temporaryDetail?id=${temporary.doc_id}`)}>
                            <td component="" scope="temporary">{temporary.doc_id}</td>
                            <td>{temporary.category_name}</td>
                            <td>{temporary.doc_title}</td>
                            <td>{temporary.name}</td>
                            <td>{temporary.doc_date}</td>
                            <td>{temporary.doc_status}</td>
                            </tr>
                            )}
                    </tbody>
            </Docstyle2>
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
align-items: center;
`;

const Title = styled.div`
text-align: center;
margin-bottom: 20px;
`;

const Docstyle1 = styled.table`
width: 100%;
margin: 10px 0;
th {
  text-align: center;
  padding: 10px;
}
button {
  padding: 10px 20px;
  font-size: 16px;
  background-color: gray;
  color: white;
  border: none;
  cursor: pointer;
  margin: 1px;
}
`;

const Docstyle2 = styled.table`
width: 100%;
border-collapse: collapse;
th, td {
  text-align: center;
  padding: 10px;
  border: 1px solid black;
  vertical-align: middle; /* 중앙 정렬을 위해 추가된 스타일 */
}
tbody {
  tr {
    cursor: pointer;
    td {
      text-align: center;
      padding: 10px;
      border: 1px solid black;
    }
  }
}
`;

const H1 = styled.h1`
font-size: 30px;
`;