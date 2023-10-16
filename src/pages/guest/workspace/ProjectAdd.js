import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { Button, TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/header';
import { useRouter } from 'next/router';
import axios from 'axios';

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

const Component = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

function ProjectAdd() {
    const [project, setProject] = useState({});
    const router = useRouter();

    const ProjectChange = (event) => {
        setProject({
            [event.target.name] : event.target.value
        });
    };

    const saveProject = (event) => {
        event.preventDefault();

        console.log(project);
/*
        ApiService.addSample(inputData)
            .then(res => {
                this.setState({
                    message : inputData.name + '이 성공적으로 등록되었습니다.'
                });
                console.log('addSample 성공 : ' , res.data);
                this.props.history.push('/samples');    // RouterComponent - ListSampleComponent 호출
        })
        .catch(err => {
            console.log('addSample 실패 : ' , err);
        }) */
    }

    return (
        <Component>
            <Header/>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>프로젝트 이름</th>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="pj_name"
                            type="text"
                            name="pj_name"
                            placeholder="프로젝트 이름을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={cellStyle}>내용</th>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="content"
                            type="text"
                            name="content"
                            placeholder="내용을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={cellStyle}>기한일(시작)</th>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="deadline_s"
                            type="text"
                            name="deadline_s"
                            placeholder="프로젝트 시작일을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={cellStyle}>기한일(종료)</th>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="deadline_e"
                            type="text"
                            name="deadline_e"
                            placeholder="프로젝트 종료일을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <th style={cellStyle}>부서ID</th>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="depart_id"
                            type="text"
                            name="depart_id"
                            placeholder="부서ID를 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                </thead>
            </table>

            <Button variant="contained" color="primary" onClick={saveProject}>Save</Button>
        </Component>
    )
}

const ProjectDetail = () => {
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
                    <th style={cellStyle}>기한</th>
                    <td style={cellStyle}>기한</td>
                </tr>
                <tr>
                    <th style={cellStyle}>팀원</th>
                    <td style={cellStyle}>팀원</td>
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

export default ProjectAdd;

ProjectAdd.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};