import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import React, {useState, useEffect} from "react";



const Doc = () => {

    const router = useRouter();

    const [samples, setSamples] = useState([]);

    useEffect(() => {
        fetch("http://localhost:8081/total", {
        })
            .then(response => response.json())
            .then(data => {
                setSamples(data);
            })
            .catch(error => {
                console.error("API 호출 오류:", error);
            });
    }, []);

    return(
        <Container>
            <Title>
                <H1>통합 문서함</H1>
            </Title>
            <AdminMenu>
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
            </AdminMenu>
            <DocList>
                    <tr>
                        <td>
                            버튼을 누르면 페이지가 넘어가지 않고 여기에 뜨게 만들기
                        </td>
                    </tr>
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
`;

const Title = styled.div`
    text-align: center;
    margin-bottom: 20px;
`;

const H1 = styled.h1`
    font-size: 30px;
`;

const PersonalMenu = styled.div`
    width: 200px;
    padding: 20px;
    position: fixed;
    height: 100%;
    left: auto;
    top: 100px;
`;

const AdminMenu = styled.div`
    width: 200px;
    padding: 20px;
    position: fixed;
    height: 100%;
    left: auto;
    top: 50%;
`;

const DocList = styled.div`
    margin-left: 220px;
    padding: 20px;
`;