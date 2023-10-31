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

const ProjectEdit = () => {
    const [project, setProject] = useState({})
    const [departmentList, setDepartmentList] = useState([]);
    const [teams, setTeams] = useState([]);

    const router = useRouter();
    
    const { id } = router.query;
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        if (id) {
            axios
                .get(`${BASE_URL}/guest/project/${id}`,{
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                })
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

    useEffect(() => {
        const token = localStorage.getItem('token')

        axios
            .get(`${BASE_URL}/guest/department`,{
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

        // 팀 정보 가져오기
        axios
            .get(`${BASE_URL}/guest/team`,{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                console.log(response.data)
                setTeams(response.data);
            })
            .catch(error => {
                console.error("Error fetching teams:", error);
            });
    }, []); // 빈 배열을 넘겨주면 컴포넌트가 마운트될 때 한 번만 실행됩니다.

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

        const token = localStorage.getItem('token')

        console.log('[saveProject] project', project)

        axios
            .post(`${BASE_URL}/guest/project`, project,{
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
                            value={project.deadline_e || ''}
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
                            <select name="depart_id" value={project.depart_id} onChange={ProjectChange}>
                                <option value="">부서 선택</option>
                                {departmentList.map(department => (
                                    <option key={department[0]} value={department[0]}>
                                        {department[1]}
                                    </option>
                                ))}
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="team_id" value={project.team_id} onChange={ProjectChange}>
                                <option value="">팀 선택</option>
                                {teams
                                    .filter(team => team.depart_id === parseInt(project.depart_id)) // depart_id와 일치하는 팀만 필터링
                                    .map(filteredTeam => (
                                        <option key={filteredTeam.team_id} value={filteredTeam.team_id}>
                                            {filteredTeam.team_name}
                                        </option>
                                    ))}
                            </select>
                        </td>
                    </tr>
                    
                </thead>
            </table>

            <button onClick = {saveProject}>수정</button>
            <button onClick = {() => router.push('/guest/workspace')}>목록</button>
        </Component>
    )
}

export default ProjectEdit;

ProjectEdit.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};