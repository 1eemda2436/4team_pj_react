import DocRadarChart from "@/components/chart/DocRadarChart";
import Header from "@/components/common/header";
import MainLayout from "@/components/layout/mainLayout"
import Weather from "@/components/weather/weather"
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { BASE_URL } from "@/api/apiPath";
import styled from "styled-components";

function Guest () {

    const [prg, setPrg] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const team_id = localStorage.getItem('team_id');

        axios
            .get(`${BASE_URL}/guest/projectwork/progress/${team_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setPrg(response.data);
            });
    }, []);
    
    return(
        <>
            <Header />
            <MainContainer>
                <Weather />
                <ChartContainer>
                    <DocRadarChart />
                </ChartContainer>
            </MainContainer>
        </>
    )
};

export default Guest;

/**
 * 컴포넌트명.getLayout 으로 _app.js에 있는 함수 선언
 * 리턴 값에 사용할 레이아웃 태그 선언 후 매개변수로 받은 page값 선언해서 사용
 */
Guest.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainContainer = styled.div`
    width: 100%;
    height: 91.7%;
    background: url('/img/GuestMain.jpg');
    background-size: cover;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
`;

const ChartContainer = styled.div`
    width: 20%;
    height: 50%;
    margin-left: 120px;
`;
