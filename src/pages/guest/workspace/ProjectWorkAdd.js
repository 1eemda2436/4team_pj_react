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

const ProjectWorkAdd = () => {
    const token = localStorage.getItem('token')
    const [projectwork, setProjectwork] = useState({
        complete: 'N' //default 'N'
    })
    const [project, setProject] = useState([])
    const router = useRouter();
    
    useEffect(() => {
        //프로젝트ID 불러오기 위함
        axios
            .get("http://localhost:8081/guest/project",{
                headers: {
                    Authorization: token
                }
            })
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }, []); 

    const ProjectworkChange = (event) => {
        setProjectwork(prevProjectwork => ({
            ...prevProjectwork, 
            [event.target.name] : event.target.value
        }));
    };

    const saveProjectwork = (event) => {
        event.preventDefault();

        projectwork.pw_deadline_s = new Date(projectwork.pw_deadline_s);
        projectwork.pw_deadline_e = new Date(projectwork.pw_deadline_e);

        console.log('[saveProjectwork] projectwork', projectwork)

        axios
            .post("http://localhost:8081/guest/projectwork", projectwork,{
                headers: {
                    Authorization: token
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
                        <select name="pj_id" value={project.pj_id} onChange={ProjectworkChange}>
                        <option value="">프로젝트 선택</option>
                        {project.map((pj) => (
                        <option key={pj.pj_id} value={pj.pj_id}>{pj.pj_name}</option>
                        ))}
                        </select>
                        </td>
                    </tr>

                    
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="프로젝트 업무명"
                            type="text"
                            name="pw_name"
                            placeholder="프로젝트 업무명을 입력해주세요"
                            onChange={ProjectworkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="담당업무"
                            type="text"
                            name="duties"
                            placeholder="담당업무를 입력해주세요"
                            onChange={ProjectworkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="기한일(시작)"
                            type="text"
                            name="pw_deadline_s"
                            placeholder="프로젝트 시작일을 입력해주세요"
                            onChange={ProjectworkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            variant="standard"
                            label="기한일(종료)"
                            type="text"
                            name="pw_deadline_e"
                            placeholder="프로젝트 종료일을 적어주세요"
                            onChange={ProjectworkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <label>
                            <input
                                name="complete"
                                type="radio"
                                value="N"
                                checked={projectwork.complete == 'N'}
                                onChange={ProjectworkChange}
                            />
                            N
                            </label>
                            <label>
                            <input
                                name="complete"
                                type="radio"
                                value="Y"
                                checked={projectwork.complete == 'Y'}
                                onChange={ProjectworkChange}
                            />
                            Y
                            </label>
                        </td>
                    </tr>
                    
                </thead>
            </table>

            <button onClick = {saveProjectwork}>추가</button>
            <button onClick={() => router.push('/guest/workspace')}>목록</button>
        </Component>
    )
}

export default ProjectWorkAdd;

ProjectWorkAdd.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};