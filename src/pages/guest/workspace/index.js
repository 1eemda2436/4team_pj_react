import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Header from '@/components/common/header';
import MyCalendar from "@/components/calendar/MyCalendar";

const Workspace = () => {
    const [departmentList, setDepartmentList] = useState([]);
    const [projectList, setProjectList] = useState([]);
    const [projectworkList, setProjectworkList] = useState([]);
    
    
    useEffect(() => {
        const token = localStorage.getItem('token')

        axios
            .get("http://localhost:8081/guest/department",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log(response.data)
                setDepartmentList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("http://localhost:8081/guest/project",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProjectList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("http://localhost:8081/guest/projectwork",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProjectworkList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        
    }, []);

    const router = useRouter();

    

    return (
        <Component>
            <Header/>
            <CalendarContainer>
                <MyCalendar />
            </CalendarContainer>
            {/* 부서별 사원 */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>부서ID</th>
                        <th style={cellStyle}>부서명</th>
                    </tr>
                </thead>
                <tbody>
                    {departmentList.map((dp) => (
                    <tr key={dp[0]}>
                        <td style={cellStyle}>{dp[0]}</td>
                        <td style={cellStyle}>{dp[1]}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </table>
            <br/>
            <br/>

            {/* 프로젝트 현황(목록) */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>PJ_ID</th>
                        <th style={cellStyle}>프로젝트명</th>
                        <th style={cellStyle}>기한(시작일)/기한(종료일)</th>
                    </tr>
                </thead>
                <tbody>
                    {projectList.map((pj) => (
                    <tr key={pj.pj_id}>
                        <td style={cellStyle}>{pj.pj_id}</td> 
                        <td style={cellStyle}>
                            <Link href="/guest/workspace/Project/ProjectDetail/[id]" as={`/guest/workspace/Project/ProjectDetail/${pj.pj_id}`}>
                                {pj.pj_name}
                            </Link>
                        </td>
                        <td style={cellStyle}>{moment(pj.deadline_s).format('YYYY-MM-DD')} ~ {moment(pj.deadline_e).format('YYYY-MM-DD')}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button onClick={() => router.push('/guest/workspace/Project/ProjectAdd')}>추가</button>
            </div>
            <br/>
            <br/>
            
            {/* 할일list */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>PW_ID</th>
                        <th style={cellStyle}>프로젝트업무명</th>
                        <th style={cellStyle}>기한(시작일)/기한(종료일)</th>
                    </tr>
                </thead>
                <tbody>
                    {projectworkList.map((pjw) => (
                    <tr key={pjw.pw_id}>
                        <td style={cellStyle}>{pjw.pw_id}</td>
                        <td style={cellStyle}>
                            <Link href="/guest/workspace/ProjectWork/ProjectWorkDetail/[id]" as={`/guest/workspace/ProjectWork/ProjectWorkDetail/${pjw.pw_id}`}>
                                {pjw.pw_name}
                            </Link></td>
                        <td style={cellStyle}>{moment(pjw.pw_deadline_s).format('YYYY-MM-DD')} ~ {moment(pjw.pw_deadline_e).format('YYYY-MM-DD')}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button onClick={() => router.push('/guest/workspace/ProjectWork/ProjectWorkAdd')}>추가</button>
            </div>
        </Component>
    )
    
}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Component = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
    marginTop: "50px",
};

const CalendarContainer = styled.div`
    margin-top: 350px;
    width: 100% /* 원하는 크기로 조절 */
`;