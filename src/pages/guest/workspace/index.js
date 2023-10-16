import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout"
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
// import ApiService from "./ApiService";
import axios from "axios";

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

function Workspace() {
    const [project, setProject] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/project")
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        axios
            .get("http://localhost:8081/projectwork")
            .then((response) => {
                console.log(response.data);
                setProjectwork(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const router = useRouter();
    return (
        <Component>
            {/* 부서별 사원 */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>부서ID</th>
                        <th style={cellStyle}>부서명</th>
                        <th style={cellStyle}>사원이름</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle}>null</td>
                    </tr>
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
                    {project.map((pj) => (
                    <tr key={pj.pj_id}>
                        <td style={cellStyle}>{pj.pj_id}</td>
                        <td style={cellStyle} onClick={() => router.push('/guest/workspace/ProjectDetail')}>{pj.pj_name}</td>
                        <td style={cellStyle}>{pj.deadline_s} - {pj.deadline_e}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            <div>
            <button onClick={() => router.push('/guest/workspace/ProjectAdd')}>추가</button>
            </div>
            <br/>
            <br/>
            
            {/* 할일list */}
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>PW_ID</th>
                        <th style={cellStyle}>프로젝트명</th>
                        <th style={cellStyle}>기한(시작일)/기한(종료일)</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle} onClick={() => router.push('/guest/workspace/ProjectWorkDetail')}>클릭시 상세페이지 이동</td>
                        <td style={cellStyle}>null</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle} onClick={() => router.push('/guest/workspace/ProjectWorkDetail')}>클릭시 상세페이지 이동</td>
                        <td style={cellStyle}>null</td>
                    </tr>
                    <tr>
                        <td style={cellStyle}>null</td>
                        <td style={cellStyle} onClick={() => router.push('/guest/workspace/ProjectWorkDetail')}>클릭시 상세페이지 이동</td>
                        <td style={cellStyle}>null</td>
                    </tr>
                </tbody>
            </table>
            <div>
            <button onClick={() => router.push('/guest/workspace/ProjectWorkAdd')}>추가</button>
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