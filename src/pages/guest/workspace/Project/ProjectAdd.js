import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { TextField } from "@mui/material";
import React, { useState, useEffect } from 'react';
import Header from '@/components/common/header';
import { useRouter } from 'next/router';
import axios from 'axios';

const ProjectAdd = () => {
    const [project, setProject] = useState({})
    const [departmentList, setDepartmentList] = useState([]);
    const [teams, setTeams] = useState([]);
    
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token')

        axios
            .get("http://localhost:8081/guest/department",{
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값", response.data);
                setDepartmentList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

        // 팀 정보 가져오기
        axios
            .get("http://localhost:8081/guest/team",{
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

            <button onClick={saveProject}>추가</button>
            <button onClick={() => router.push('/guest/workspace')}>목록</button>
        </Component>
    )
}

export default ProjectAdd;

ProjectAdd.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};