import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import Link from "next/link";
import Header from '@/components/common/header';

const Table = styled.table`
    width: 80%;
    border-collapse: collapse;
    margin-bottom: 20px;
`;

const TableRow = styled.tr`
    &:nth-child(even) {
        background-color: #f2f2f2;
    }
`;

const TableCell = styled.td`
    padding: 10px;
    border: 1px solid #ddd;
    text-align: left;
`;

const Button = styled.button`
    background-color: #007bff;
    color: #fff;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;


const CalendarDetail = () => {
    const [project, setProject] = useState({});
    const [projectWorkList, setProjectWorkList] = useState([]); // 업무 목록 추가


    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8081/project/${id}`)
                .then((response) => {
                    console.log('[ProjectDetail] project', response.data)
                    setProject(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });

            axios
                .get(`http://localhost:8081/projectwork?pj_id=${id}`)
                .then((response) => {
                    console.log('[ProjectDetail] projectWorkList', response.data);
                    setProjectWorkList(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
            
        }
    }, [id]);

    const deleteProject = (event) => {
        event.preventDefault();

        axios
            .delete(`http://localhost:8081/project/${id}`)
            .then((response) => {
                router.push('/guest/calendar');
            })
            .catch((error) => {
                console.log(error);
            });
        
    };
        
    return (
        <MainLayout>
            <Header/>
            <Table>
                <tbody>
                    <TableRow>
                        <TableCell>프로젝트명</TableCell>
                        <TableCell>{project.pj_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>기한</TableCell>
                        <TableCell>
                            {moment(project.deadline_s).format('YYYY-MM-DD')} ~{' '}
                            {moment(project.deadline_e).format('YYYY-MM-DD')}
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>부서</TableCell>
                        <TableCell>{project.depart_id}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>내용</TableCell>
                        <TableCell>{project.content}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2">
                            <Link href="/guest/calendar/CalendarEdit/[id]" as={`/guest/calendar/CalendarEdit/${project.pj_id}`} passHref>
                                <Button>수정</Button>
                            </Link>
                            <Button onClick={deleteProject}>삭제</Button>
                            <Button onClick={() => router.push('/guest/calendar')}>목록</Button>
                        </TableCell>
                    </TableRow>
                </tbody>
            </Table>

            {/* 업무 목록 렌더링 */}
            <Table>
                <tbody>
                    <TableRow>
                    <TableCell>프로젝트 업무명</TableCell>
                    <TableCell>기한(시작일/마감일)</TableCell>
                    </TableRow>
                    {projectWorkList.map((projectWork) => (
                        <TableRow key={projectWork.pw_id}>
                            <TableCell>{projectWork.pw_name}</TableCell>
                            <TableCell>
                                {moment(projectWork.pw_deadline_s).format('YYYY-MM-DD')} ~{' '}
                                {moment(projectWork.pw_deadline_e).format('YYYY-MM-DD')}
                            </TableCell>
                        </TableRow>
                    ))}
                </tbody>
            </Table>
        </MainLayout>
    );

}


export default CalendarDetail;
