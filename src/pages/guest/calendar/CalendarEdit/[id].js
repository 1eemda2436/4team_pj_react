import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/header';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment";

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

const ProjectEdit = () => {
    const [project, setProject] = useState({})
    
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8081/project/${id}`)
                .then((response) => {
                    console.log('[ProjectEdit] project', response.data)
                    const formattedProject = {
                        ...response.data,
                        deadline_s: response.data.deadline_s
                        

                        ? moment(response.data.deadline_s).format('YYYY-MM-DD')
                          : '', // 날짜 포맷 변경
                        deadline_e: response.data.deadline_e
                        ? moment(response.data.deadline_e).format('YYYY-MM-DD')
                          : '', // 날짜 포맷 변경
                    };
                    setProject(formattedProject);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const ProjectChange = (event) => {
        console.log(event.target.value)

        setProject(prevProject => ({
            ...prevProject, //... => 객체에 사용하면 이전 객체 복사
            [event.target.name]: event.target.value
        }));
    };

    const saveProject = (event) => {
        event.preventDefault();

        project.deadline_s = new Date(project.deadline_s);
        project.deadline_e = new Date(project.deadline_e);

        console.log('[saveProject] project', project)

        axios
            .post("http://localhost:8081/project", project)
            .then((response) => {
                router.push('/guest/calendar');
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
                            value={project.pj_name || ''}
                            variant="standard"
                            label="프로젝트명"
                            type="text"
                            name="pj_name"
                            placeholder="프로젝트명을 입력해주세요"
                            onChange={ProjectChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={project.content || ''}
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
                            value={project.deadline_s || ''}
                            variant="standard"
                            label="기한일(시작)"
                            type="text"
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
                            value={project.deadline_e || ''}
                            variant="standard"
                            label="기한일(종료)"
                            type="text"
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
                            value={project.depart_id || ''}
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

            <button onClick = {saveProject}>수정</button>
            <button onClick = {() => router.push('/guest/calendar')}>목록</button>
        </Component>
    )
}

export default ProjectEdit;

ProjectEdit.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};