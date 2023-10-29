import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Header from '@/components/common/header';
import MyCalendar from "@/components/calendar/MyCalendar";


const Workspace = () => {
    const [projectList, setProjectList] = useState([]);
    const [projectworkList, setProjectworkList] = useState([]);
    const [isProjectModalOpen, setProjectModalOpen] = useState(false);
    const [isProjectEditModalOpen, setProjectEditModalOpen] = useState(false);
    const [isWorkModalOpen, setWorkModalOpen] = useState(false);
    const [isWorkEditModalOpen, setWorkEditModalOpen] = useState(false);
    // const [teams, setTeams] = useState([]);

    const [showWork, setShowWork] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token')
        const company_id = localStorage.getItem('company_id')
        const team_id = localStorage.getItem('team_id')

        axios.get(`http://localhost:8081/guest/project/list/${team_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setProjectList(response.data);
            console.log('!!', response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }, []);

    const router = useRouter();

    const projectWorkToggle = (pj_id) => {
        const token = localStorage.getItem('token')

        axios.get(`http://localhost:8081/guest/projectwork/list/${pj_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            setProjectworkList(response.data)
            setShowWork(true)
            console.log('??', response.data)
        })
        .catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Header/>
            <MainContainer>
                <ProjectContainer>
                    <ProjectListContainer>
                        <PTitle>프로젝트</PTitle>
                        {projectList.length > 0 ? (
                            projectList.map((pj) => (
                                <ProjectBox key={pj.pj_id} onClick={() => projectWorkToggle(pj.pj_id)}>
                                    <ProjectDate>{moment(pj.deadline_s).format('YY-MM-DD')} ~ {moment(pj.deadline_e).format('YY-MM-DD')}</ProjectDate>
                                    <ProjectTitle>{pj.pj_name}</ProjectTitle>
                                </ProjectBox>
                            ))
                        ) : (
                            <NoTitle>아직 등록된 프로젝트가 없습니다.</NoTitle>
                        )}
                    </ProjectListContainer>

                    {showWork && (<ProjectWorkContainer>
                        <PTitle>업무</PTitle>
                        {projectworkList.length > 0 ? (
                            projectworkList.map((pjw) => (
                                <ProjectBox key={pjw.pw_id}>
                                    <ProjectDate>{moment(pjw.pw_deadline_s).format('YY-MM-DD')} ~ {moment(pjw.pw_deadline_e).format('YY-MM-DD')}</ProjectDate>
                                    <ProjectTitle>{pjw.pw_name}</ProjectTitle>
                                </ProjectBox>
                            ))
                        ) : (
                            <NoTitle>아직 등록된 업무가 없습니다.</NoTitle>
                        )}
                    </ProjectWorkContainer>)}
                    
                    <TeamContainer>
                        <ToggleBox>
                            <MyBoardBtn onClick={() => router.push('/guest/workspace/Project/ProjectAdd')}>프로젝트 추가</MyBoardBtn>
                            <AddBoardBtn onClick={() => router.push('/guest/workspace/ProjectWork/ProjectWorkAdd')}>업무 추가</AddBoardBtn>
                        </ToggleBox>

                        <TeamBox>
                            {/* {teams.map((t) => (
                                <TeamUser>
                                    <UserName></UserName>
                                </TeamUser>
                            ))} */}
                        </TeamBox>
                    </TeamContainer>
                </ProjectContainer>

                <CalendarContainer>
                    <MyCalendar height={750} />
                </CalendarContainer>

                {isProjectModalOpen && (
                    <ProjectAddModal
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                    />
                )}

                {isProjectEditModalOpen && (
                    <ProjectEditModal
                        onClose={handleEditModalClose}
                        onSave={handleEditModalSave}
                        depart_id={selectedDepartInfo.depart_id}
                        depart_name={selectedDepartInfo.depart_name}
                    />
                )}

                {isWorkModalOpen && (
                    <WorkAddModal
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                    />
                )}

                {isWorkEditModalOpen && (
                    <WorkEditModal
                        onClose={handleEditModalClose}
                        onSave={handleEditModalSave}
                        depart_id={selectedDepartInfo.depart_id}
                        depart_name={selectedDepartInfo.depart_name}
                    />
                )}
                
            </MainContainer>
        </>
    )
    
}

export default Workspace;

Workspace.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const MainContainer = styled.div`
    width: 100%;
    height: 90%;
    padding: 50px;
    box-sizing: border-box;
    width: 100%;
    display: flex;
    justify-content: space-between;
`;

const InfoContainer = styled.div`
    width: 100%;
    display: flex;
`;

const ProjectContainer = styled.div`
    display: flex;
`;

const ProjectListContainer = styled.div`
    border: 2px solid #eee;
    border-radius: 8px;
    padding: 10px 5px;
`;

const ProjectWorkContainer = styled(ProjectListContainer)`
    margin-left: 30px;
`;

const PTitle = styled.div`
    font-weight: 700;
    font-size: 20px;
    margin-left: 5px;
    margin-bottom: 30px;
    color: #005FC5;
    cursor: default;
`;

const NoTitle = styled.div`
    color: gray;
    padding: 0px 100px;
    white-space: nowrap;
    
`;

const ProjectBox = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 15px 0px;
    margin: 10px 20px;
    cursor: pointer;
    
    &:hover {
        background: #eff1f6;
        transition: 0.5s;
    }
`;

const ProjectDate = styled.div`
    color: gray;
    margin-right: 150px;
    padding-left: 20px;
    font-size: 14px;
    word-wrap: break-word;
`;

const ProjectTitle = styled.div`
    font-size: 18px;
    padding-right: 20px;
    font-weight: 600;
    white-space: nowrap;
`;

const ToggleBox = styled.div`
    display: flex;
    flex-direction: column;
    width: 300px;
    align-items: center;
    margin-left: 30px;
`;

const MyBoardBtn = styled.div`
    cursor: pointer;
    background: #007BFF;
    padding: 15px 0px;
    width: 100%;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;
    text-align: center;

    &:hover {
        background: #005CBF;
    }
`;
const AddBoardBtn = styled(MyBoardBtn)`
    margin-top: 20px;
`

const CalendarContainer = styled.div`
    width: 40%;
    display: flex;
    padding: 20px;
    box-sizing: border-box;
`;

const TeamContainer = styled.div``;

const UserContainer = styled.div``;

const TeamBox = styled.div``;

const TeamUser = styled.div``;

const UserName = styled.div``;