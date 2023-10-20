import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import axios from "axios";


const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);

    
    useEffect(() => {
      const token = localStorage.getItem('token')
        axios
        .get("http://localhost:8081/admin/doc/adminTotal", {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then((response) => {
            setSamples(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    return(
        <Container>
            <Title>
                <H1>전자 결재</H1>
            </Title>
            <AdminMenu>
                <tbody>
                    <tr>
                        <td>
                            결재문서함
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalEnd')}>결재 완료 문서함</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 예정 문서함</button>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalBack')}>결재 반려 문서함</button>
                        </td>
                    </tr>
                </tbody>
            </AdminMenu>
            <Docstyle2>
                    <thead>
                        <tr>
                            <th>상태</th>
                            <th>문서번호</th>
                            <th>카테고리</th>
                            <th>문서 제목</th>
                            <th>작성자</th>
                            <th>결재일</th>
                            <th>결재완료일</th>
                        </tr>
                    </thead>
                    <tbody>
                        {samples.map((adminTotal) =>
                            <tr key = {adminTotal.doc_id} onClick={() => router.push(`/admin/doc/adminApprovalIngDetail?id=${adminTotal.doc_id}`)}>
                                    <td component="" scope="adminTotal">{adminTotal.doc_status}</td>
                                    <td>{adminTotal.doc_id}</td>
                                    <td>{adminTotal.category_name}</td>
                                    <td>{adminTotal.doc_title}</td>
                                    <td>{adminTotal.name}</td>
                                    <td>{adminTotal.approval_date}</td>
                                    <td>{adminTotal.approval_endDate}</td>
                            </tr>
                        )}
                    </tbody>
            </Docstyle2>
            
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
  align-items: center;
`;

const Title = styled.div`
  text-align: center;
  margin-bottom: 20px;
`;

const AdminMenu = styled.table`
  width: 100%;
  margin: 10px 0;
  th {
    text-align: center;
    padding: 10px;
    border: 1px solid black;
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
  thead {
    th {
      text-align: center;
      padding: 10px;
      border: 1px solid black;
    }
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