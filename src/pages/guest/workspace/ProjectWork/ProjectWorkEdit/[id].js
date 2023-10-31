import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/header';
import { useRouter } from 'next/router';
import axios from 'axios';
import moment from "moment";
import { BASE_URL } from "@/api/apiPath";

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

const ProjectWorkEdit = () => {
    const [projectwork, setProjectwork] = useState({});
    const [project, setProject] = useState([]);

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')

        //프로젝트ID 불러오기 위함
        axios
            .get(`${BASE_URL}/guest/project`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProject(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
        }, []); 

    const { id } = router.query;

    useEffect(() => {
        const token = localStorage.getItem('token')

        if (id) {
            axios
                .get(`${BASE_URL}/guest/projectwork/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
                .then((response) => {
                    console.log('[ProjectWorkEdit] projectwork', response.data)
                    const formattedProjectWork = {
                        ...response.data,
                        pw_deadline_s: response.data.pw_deadline_s
                        ? moment(response.data.pw_deadline_s).format('YYYY-MM-DD')
                        : '', //날짜 포맷 변경
                        pw_deadline_e: response.data.pw_deadline_e
                        ? moment(response.data.pw_deadline_e).format('YYYY-MM-DD')
                        : '', //날짜 포맷 변경
                    };
                    setProjectwork(formattedProjectWork);
                })
                .catch((erorr) => {
                    console.log(error);
                });
        }
    }, [id]);

    const ProjectWorkChange = (event) => {
        console.log(event.target.value)

        setProjectwork(prevProjectWork => ({
            ...prevProjectWork,//... => 객체에 사용하면 이전 객체 복사
            [event.target.name]: event.target.value
        }));
    };

    const saveProjectWork = (event) => {
        event.preventDefault();

        projectwork.pw_deadline_s = new Date(projectwork.pw_deadline_s);
        projectwork.pw_deadline_e = new Date(projectwork.pw_deadline_e);

        const token = localStorage.getItem('token')

        console.log('[saveProjectWork] projectwork', projectwork)

        axios
            .post(`${BASE_URL}/guest/projectwork`, projectwork,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                router.push('/guest/workspace');
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <Component>
            <Header/>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <td>
                        <select name="pj_id" value={project.pj_id} onChange={ProjectWorkChange}>
                        <option value="">프로젝트 선택</option>
                        {project.map((pj) => (
                        <option key={pj.pj_id} value={pj.pj_id}>{pj.pj_name}</option>
                        ))}
                        </select>
                        </td>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={projectwork.pw_name || ''}
                            variant="standard"
                            label="프로젝트 업무명"
                            type="text"
                            name="pw_name"
                            placeholder="프로젝트 업무명을 입력해주세요"
                            onChange={ProjectWorkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={projectwork.duties || ''}
                            variant="standard"
                            label="담당업무"
                            type="text"
                            name="duties"
                            placeholder="담당업무를 입력해주세요"
                            onChange={ProjectWorkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={projectwork.pw_deadline_s || ''}
                            variant="standard"
                            type="date"
                            name="pw_deadline_s"
                            placeholder="프로젝트 시작일을 입력해주세요"
                            onChange={ProjectWorkChange}
                            />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <TextField
                            required
                            id="standard-required"
                            value={projectwork.pw_deadline_e || ''}
                            variant="standard"
                            type="date"
                            name="pw_deadline_e"
                            placeholder="프로젝트 종료일을 입력해주세요"
                            onChange={ProjectWorkChange}
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
                                onChange={ProjectWorkChange}
                            />
                            N
                            </label>
                            <label>
                            <input
                                name="complete"
                                type="radio"
                                value="Y"
                                checked={projectwork.complete == 'Y'}
                                onChange={ProjectWorkChange}
                            />
                            Y
                            </label>
                        </td>
                    </tr>
                </tbody>
            </table>

            <button onClick = {saveProjectWork}>수정</button>
            <button onClick = {() => router.push('/guest/workspace')}>목록</button>
        </Component>
    )
}

export default ProjectWorkEdit;

ProjectWorkEdit.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

