import DocRadarChart from "@/components/chart/DocRadarChart";
import Header from "@/components/common/header";
import MainLayout from "@/components/layout/mainLayout"
import Weather from "@/components/weather/weather"
import axios from "axios";
import ProgressBar from "@ramonak/react-progress-bar";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

function Guest () {

    const [prg, setPrg] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const team_id = localStorage.getItem('team_id');

        axios
            .get(`http://localhost:8081/guest/projectwork/progress/${team_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("진척값", response.data);
                setPrg(response.data);
            });
    }, []);
    
    return(
        <div>

            <div>
                <Header />
                <DocRadarChart />
                <Weather />
            </div>
            <div>
                <ProgressBar bgColor="red" completed={(prg.complete_count / prg.pw_id_count) * 100} maxCompleted={100} />
            </div>

        </div>
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