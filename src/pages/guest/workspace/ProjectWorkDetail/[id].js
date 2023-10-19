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

const ProjectWorkDetail = () => {
    const [projectwork, setProjectwork] = useState({});
    
    const router = useRouter();

    const { id } = router.query;

    useEffect(() => {
        if (id) {
            axios
                .get(`http://localhost:8081/projectwork/${id}`)
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
            .delete(`http://localhost:8081/projectwork/${id}`)
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
                    <Label>프로젝트 업무명</Label>
                    <div>{projectwork.pw_name}</div>
                </div>
                <div>
                    <Label>담당업무</Label>
                    <div>{projectwork.duties}</div>
                </div>
                <div>
                    <Label>기한</Label>
                    <div>{moment(projectwork.pw_deadline_s).format('YYYY-MM-DD')} ~ {moment(projectwork.pw_deadline_e).format('YYYY-MM-DD')}</div>
                </div>
                <div>
                    <Label>완료여부</Label>
                    <div>{projectwork.complete}</div>
                </div>
            </ContentContainer>
            <ButtonContainer>
                <Link href="/guest/workspace/ProjectWorkEdit/[id]" as={`/guest/workspace/ProjectWorkEdit/${projectwork.pw_id}`} passHref><Button>수정</Button></Link>
                <Button onClick={deleteProjectWork}>삭제</Button>
                <Button onClick={() => router.push('/guest/workspace')}>목록</Button>
            </ButtonContainer>
        </Component>
    );

}


export default ProjectWorkDetail;

ProjectWorkDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};