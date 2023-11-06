import styled from "styled-components";
import AdminLayout from "@/components/layout/adminLayout"
import axios from "axios";
import React, {useEffect ,useState } from "react";
import moment from 'moment';
import { BASE_URL } from "@/api/apiPath";
import AdminClock from "@/components/clock/AdminClock";

const admin = () => {
    const [companyData, setCompanyData] = useState([]);
    const [roleData, setRoleData] = useState([])
    
    useEffect(() => {
        const token = localStorage.getItem('token');
        const company_id = localStorage.getItem('company_id');
        const id = localStorage.getItem('user_id');

        async function fetchData() {
            try {
                const companyRes = await axios.get(`${BASE_URL}/admin/company/${company_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data)
                    setCompanyData(response.data); // 받은 데이터를 상태에 저장
                })
                .catch(err => {
                    console.log("Error", err);
                });

                const roleRes = await axios.get(`${BASE_URL}/admin/auth/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then(response => {
                    console.log(response.data)
                    setRoleData(response.data); // 받은 데이터를 상태에 저장

                    if(response.data != null) {
                        localStorage.setItem('roleData', JSON.stringify(response.data)); // 데이터를 로컬스토리지에 JSON 형식으로 저장
                    }
                })
                .catch(err => {
                    console.log("Error", err);
                });
                
            } catch (error) {
                console.error("Error fetching data: ", error);
            }
        }

        fetchData();
    }, []);

    return(
        <MainComponent>
            <AdminClock/>
            <CompanyInfoBox>
                <InfoDiv>
                    <InfoTitle>License</InfoTitle>
                    <InfoValue>{companyData.name}</InfoValue>
                </InfoDiv>
                <InfoDiv>
                    <InfoTitle>Location</InfoTitle>
                    <InfoValue>{companyData.address}</InfoValue>
                </InfoDiv>
                <InfoDiv>
                    <InfoTitle>Work-In</InfoTitle>
                    <InfoValue>AM {moment(companyData.work_in).format('H')}시</InfoValue>
                </InfoDiv>
                <InfoDiv>
                    <InfoTitle>Work-Out</InfoTitle>
                    <InfoValue>PM {moment(companyData.work_out).format('H')}시</InfoValue>
                </InfoDiv>
            </CompanyInfoBox>
            
            <ControllerBox>
                <ContentBox>프로젝트</ContentBox>
                <ContentBox>회사규모 ({companyData.employees})</ContentBox>
                <ContentBox>근태 현황</ContentBox>
                <ContentBox>{companyData.email}</ContentBox>
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
    font-size: 32px;
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