import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import Link from "next/link";

const Component = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

const ContentContainer = styled.div`
    margin-bottom: 20px;
`;

const Label = styled.div`
    font-weight: bold;
    margin-bottom: 5px;
`;

const ButtonContainer = styled.div`
    display: flex;
    gap: 10px;
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


const ProjectDetail = () => {
    const [project, setProject] = useState({});

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
        }
    }, [id]);

    const deleteProject = (event) => {
        event.preventDefault();

        axios
            .delete(`http://localhost:8081/project/${id}`)
            .then((response) => {
                router.push('/guest/workspace');
            })
            .catch((error) => {
                console.log(error);
            });
        
    };
        
    return (
        <Component>
            <ContentContainer>
                <div>
                    <Label>프로젝트명</Label>
                    <div>{project.pj_name}</div>
                </div>
                <div>
                    <Label>기한</Label>
                    <div>{moment(project.deadline_s).format('YYYY-MM-DD')} ~ {moment(project.deadline_e).format('YYYY-MM-DD')}</div>
                </div>
                <div>
                    <Label>부서</Label>
                    <div>{project.depart_id}</div>
                </div>
                <div>
                    <Label>내용</Label>
                    <div>{project.content}</div>
                </div>
            </ContentContainer>
            <ButtonContainer>
                <Link href="/guest/workspace/ProjectEdit/[id]" as={`/guest/workspace/ProjectEdit/${project.pj_id}`} passHref><Button>수정</Button></Link>
                <Button onClick={deleteProject}>삭제</Button>
                <Button onClick={() => router.push('/guest/workspace')}>목록</Button>
            </ButtonContainer>
        </Component>
    );

}


export default ProjectDetail;

ProjectDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};