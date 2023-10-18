import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout"
import axios from "axios";
import React, {useEffect ,useState } from "react";

const admin = () => {
    const [CompanyData, setData] = useState([]);

    useEffect(() => {
        // Axios를 사용하여 Spring Boot 백엔드에서 데이터 가져오기
        axios.get(`http://localhost:8081/company/1`)
        .then(response => {
            console.log(response.data)
            setData(response.data); // 받은 데이터를 상태에 저장
        })
        .catch(err => {
            console.log("getSampleByID Error", err);
        });
    }, []);

    return(
        <MainComponent>
            <CompanyInfoBox>
                <InfoDiv>
                    <InfoTitle>License</InfoTitle>
                    <InfoValue>{CompanyData.name}</InfoValue>
                </InfoDiv>
                <InfoDiv>
                    <InfoTitle>Location</InfoTitle>
                    <InfoValue>{CompanyData.address}</InfoValue>
                </InfoDiv>
                <InfoDiv>
                    <InfoTitle>Business number</InfoTitle>
                    <InfoValue>{}</InfoValue>
                </InfoDiv>
            </CompanyInfoBox>
            <ControllerBox>
                <ContentBox>프로젝트</ContentBox>
                <ContentBox>직원수</ContentBox>
                <ContentBox>근태 현황</ContentBox>
                <ContentBox>권한 권리</ContentBox>
            </ControllerBox>
        </MainComponent>
    )
};
export default admin;
/**
 * 컴포넌트명.getLayout 으로 _app.js에 있는 함수 선언
 * 리턴 값에 사용할 레이아웃 태그 선언 후 매개변수로 받은 page값 선언해서 사용
 */
admin.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};


const MainComponent = styled.div`
    width: 100%;
    height: 100vh;
    padding: 40px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`;

const CompanyInfoBox = styled.div`
    width: 80%;
    max-width: 700px;
`;
const InfoDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 38px;
    margin-bottom: 45px;
`;
const InfoTitle = styled.div`
    font-weight: 700;
    display: flex;
    justify-self: start;
`;
const InfoValue = styled.div`
    font-size: 30px;
    word-wrap: break-word;
`;
const ControllerBox = styled.div`
    width: 80%;
    max-width: 700px;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 20px;
    row-gap: 20px;
    margin-top: 60px;
`;
const ContentBox = styled.div`
    height: 60px;
    background: #F6F8FA;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 5px;
    cursor: pointer;
`;