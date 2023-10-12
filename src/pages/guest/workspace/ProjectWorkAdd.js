import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

const ProjectWorkDetail = () => {
    const router = useRouter();
    return (
        <Component>
        <table style={tableStyle}>
            <thead>
                <tr>
                    <th style={cellStyle}>프로젝트명</th>
                    <td style={cellStyle}>프로젝트명</td>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <th style={cellStyle}>담당업무</th>
                    <td style={cellStyle}>담당업무</td>
                </tr>
                <tr>
                    <th style={cellStyle}>기한</th>
                    <td style={cellStyle}>기한</td>
                </tr>
                <tr>
                    <th style={cellStyle}>진행상황</th>
                    <td style={cellStyle}>진행상황</td>
                </tr>
                <tr>
                    <th style={cellStyle} >내용</th>
                    <td style={cellStyle} >내용</td>
                </tr>
            </tbody>
        </table>
        <div>
            <button onClick={() => router.push('/guest/workspace')}>등록</button>
            <button onClick={() => router.push('/guest/workspace')}>목록</button> 
        </div>
                        
        </Component>

    )

}

const Component = styled.div``;

export default ProjectWorkDetail;

ProjectWorkDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};