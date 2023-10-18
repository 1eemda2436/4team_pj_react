import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import React, {useState, useEffect} from "react";
import axios from "axios";


const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        axios
        .get("http://localhost:8081/doc/adminTotal")
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
                <H1>통합 문서함</H1>
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
            <DocList>
                <tbody>
                    <tr>
                        <td>
                            버튼을 누르면 페이지가 넘어가지 않고 여기에 뜨게 만들기
                        </td>
                    </tr>
                </tbody>
            </DocList>
            
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
  margin-bottom: 20px;
  td {
    padding: 10px;
    button {
      background-color: gray;
      color: white;
      border: none;
      cursor: pointer;
      padding: 10px 20px;
      font-size: 16px;
    }
  }
`;

const DocList = styled.table`
  td {
    padding: 10px;
    border: 1px solid black;
  }
`;

const H1 = styled.h1`
  font-size: 30px;
`;