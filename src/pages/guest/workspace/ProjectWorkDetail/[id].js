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

const ProjectWorkDetail = () => {
    const [projectwork, setProjectwork] = useState({});
    
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8081/guest/projectwork/${id}`)
                .then((response) => {
                    console.log('[ProjectWorkDetail] projectwork', response.data)
                    setProjectwork(response.data);
                })
                .catch((error) => {
                    console.log(error);
                });
        }
    }, [id]);

    const deleteProjectWork = (event) => {
        event.preventDefault();

        axios
            .delete(`http://localhost:8081/guest/projectwork/${id}`)
            .then((response) => {
                router.push('/guest/workspace');
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
                        <TableCell>프로젝트 업무명</TableCell>
                        <TableCell>{projectwork.pw_name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>담당업무</TableCell>
                        <TableCell>{projectwork.duties}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>기한</TableCell>
                        <TableCell>
                            {moment(projectwork.pw_deadline_s).format('YYYY-MM-DD')} ~{' '}
                            {moment(projectwork.pw_deadline_e).format('YYYY-MM-DD')}
                        </TableCell>
                    </TableRow> 
                    <TableRow>
                        <TableCell>완료여부</TableCell>
                        <TableCell>{projectwork.complete}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell colSpan="2">
                            <Link href="/guest/workspace/ProjectWorkEdit/[id]" as={`/guest/workspace/ProjectWorkEdit/${projectwork.pw_id}`} passHref>
                                <Button>수정</Button>
                            </Link>
                            <Button onClick={deleteProjectWork}>삭제</Button>
                            <Button onClick={() => router.push('/guest/workspace')}>목록</Button>
                        </TableCell>
                    </TableRow>
                </tbody>
            </Table>
        </MainLayout>
    );

}


export default ProjectWorkDetail;
