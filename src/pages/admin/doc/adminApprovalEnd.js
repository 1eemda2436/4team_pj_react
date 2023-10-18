import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";



const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);
    const [filteredSamples, setFilteredSamples] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8081/doc/approvalEnd")
        .then((response) => {
            setSamples(response.data);
            const filteredData = response.data.filter(approvalEnd => approvalEnd.doc_status === 'E');
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
                <H1>완료 문서함</H1>
            </Title>
            <Docstyle1>
                <tbody>
                    <tr>
                        <th>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalEnd')}>결재 완료 문서함</button>
                        </th>
                        <th>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalIng')}>결재 예정 문서함</button>
                        </th>
                        <th>
                            <button type="button" onClick={() => router.push('/admin/doc/adminApprovalBack')}>결재 반려 문서함</button>
                        </th>
                    </tr>
                </tbody>
            </Docstyle1>
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
                        {samples.map((approvalEnd) =>
                            <tr key = {approvalEnd.doc_id} onClick={() => router.push(`/guest/doc/detail/draftDetail?id=${approvalEnd.doc_id}`)}>
                                    <td component="" scope="approvalEnd">{approvalEnd.doc_status}</td>
                                    <td>{approvalEnd.doc_id}</td>
                                    <td>{approvalEnd.category_name}</td>
                                    <td>{approvalEnd.doc_title}</td>
                                    <td>{approvalEnd.name}</td>
                                    <td>{approvalEnd.approval_date}</td>
                                    <td>{approvalEnd.approval_endDate}</td>
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