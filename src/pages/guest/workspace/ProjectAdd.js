import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/header';
import { useRouter } from 'next/router';
import axios from 'axios';

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

const ProjectAdd = () => {
    const [project, setProject] = useState({})
    
    const router = useRouter();
    
    const ProjectChange = (event) => {
        setProject(prevProject => ({
            ...prevProject,
            [event.target.name]: event.target.value
        }));
    };
    
    const saveProject = (event) => {
        event.preventDefault();
        
        const token = localStorage.getItem('token')
        
        console.log('[saveProject] project', project)

        axios
            .post("http://localhost:8081/guest/project", project,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                router.push('/guest/workspace');
            })
            .catch((error) => {
                console.log(error);
            });
    }

    return (
        <Component>
            <Header/>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="프로젝트 이름"
                            type="text"
                            name="pj_name"
                            placeholder="프로젝트 이름을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="내용"
                            type="text"
                            name="content"
                            placeholder="내용을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            type="date"
                            name="deadline_s"
                            placeholder="프로젝트 시작일을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            type="date"
                            name="deadline_e"
                            placeholder="프로젝트 종료일을 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="부서ID"
                            type="text"
                            name="depart_id"
                            placeholder="부서ID를 적어주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                </thead>
            </table>

            <button onClick={saveProject}>추가</button>
            <button onClick={() => router.push('/guest/workspace')}>목록</button>
        </Component>
    )
}

export default ProjectAdd;

ProjectAdd.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};