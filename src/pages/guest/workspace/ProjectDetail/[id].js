import MainLayout from "@/components/layout/mainLayout"
import styled from "styled-components";
import { useRouter } from 'next/router';
import { useState, useEffect } from "react";
import moment from 'moment';
import axios from 'axios';
import Link from "next/link";

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
            <div>
                {/* 프로젝트명 */}
                <div>
                    <div>프로젝트명</div>
                    <div>{project.pj_name}</div>
                </div>
                {/* 기한 */}
                <div>
                    <div>기한</div>
                    <div>{moment(project.deadline_s).format('YYYY-MM-DD')} ~ {moment(project.deadline_e).format('YYYY-MM-DD')}</div>
                </div>
                {/* 프로젝트명 */}
                <div>
                    <div>부서</div>
                    <div>{project.depart_id}</div>
                </div>
                <div>
                    <div>내용</div>
                    <div>{project.content}</div>
                </div>
            </div>
            <div>
                <Link href="/guest/workspace/ProjectEdit/[id]" as={`/guest/workspace/ProjectEdit/${project.pj_id}`}><button>수정</button></Link>
                <button onClick={deleteProject}>삭제</button>
                <button onClick={() => router.push('/guest/workspace')}>목록</button>
            </div>
        </Component>
    )

}

const Component = styled.div`
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`;

export default ProjectDetail;

ProjectDetail.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};