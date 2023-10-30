import styled from "styled-components";
import MainLayout from "@/components/layout/mainLayout"
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from "react";
import axios from "axios";
import moment from 'moment';
import Header from '@/components/common/header';
import MyCalendar from "@/components/calendar/MyCalendar";
import ProjectAddModal from "./Project/projectAddModal";
import WorkAddModal from './ProjectWork/WorkAddModal';

const Workspace = () => {
    const [projectList, setProjectList] = useState([]);
    const [projectworkList, setProjectworkList] = useState([]);
    const [project, setProject] = useState([]);
    const [pj_id, setPj_id] = useState();

    //프로젝트 추가 모달
    const [isProjectModalOpen,setModalOpen] = useState(false);

    const projectModalOpen = () => {
        setModalOpen(true);
    };

    const projectModalClose = () => {
        setModalOpen(false);
    };

    const projectModalSave = () => {
        // 모달에서 저장 버튼을 눌렀을 때의 로직 추가
        setModalOpen(false); 
        window.location.reload();
        //router.push('/admin/department-team/'); // 부서 현황 화면으로 리디렉션
    };

    //업무 추가 모달
    const [isWorkModalOpen, setWorkModalOpen] = useState(false);

    const workModalOpen = () => {
        setWorkModalOpen(true);
    };

    const workModalClose = () => {
        setWorkModalOpen(false);
    };

    const workModalSave = () => {
        // 모달에서 저장 버튼을 눌렀을 때의 로직 추가
        setWorkModalOpen(false); 
        //router.push('/admin/department-team/'); // 부서 현황 화면으로 리디렉션
    };

    const [showWork, setShowWork] = useState(false);
    
    useEffect(() => {
        const token = localStorage.getItem('token')
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
        setPj_id(pj_id)

        try {
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

            axios.get(`http://localhost:8081/guest/project/${pj_id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                setProject(response.data)
                console.log(response.data)
            })
            .catch((error) => {
                console.log(error);
            })
        } catch (error) {
            console.error("Error fetching data: ", error);
        }

        console.log(project)
    }

    const handleCompleteClick = (pw_id, completed) => {
        console.log(completed)
        const token = localStorage.getItem('token');
        const newCompletedValue = completed === 'Y' ? 'N' : 'Y';
        console.log(newCompletedValue)
    
        axios.put(`http://localhost:8081/guest/projectwork/complete/${pw_id}`, newCompletedValue, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            // const updatedCompletion = { [pw_id]: newCompletedValue };
            // setCompletions({...updatedCompletion});
            const itemIndex = projectworkList.findIndex(item => item.pw_id === pw_id);

            if (itemIndex !== -1) {
                // 2. 해당 ID의 항목을 수정합니다.
                const updatedItems = [...projectworkList]; // 배열을 복사합니다.
                updatedItems[itemIndex] = { ...updatedItems[itemIndex], complete: newCompletedValue }; // 원하는 항목을 업데이트합니다.

                // 3. 변경된 배열로 상태를 업데이트합니다.
                setProjectworkList(updatedItems);
            }
            console.log(response);
        })
        .catch((error) => {
            console.log(error);
        });
    };

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

                    {showWork && (
                        <ProjectWorkContainer>
                            {project !== null ? (
                                <ProjectDetailBox>
                                    <DetailTitle>{project.pj_name}</DetailTitle>
                                    <Details>{project.content}</Details>
                                </ProjectDetailBox>
                            ) : (
                                <NoTitle>해당 프로젝트의 상세 정보가 없습니다.</NoTitle>
                            )}

                            <PTitle>업무</PTitle>

                            {projectworkList.length > 0 ? (
                                projectworkList.map((pjw) => (
                                    <ProjectBox key={pjw.pw_id}>
                                        <ProjectComplete 
                                            completed={pjw.complete} 
                                            onClick={() => handleCompleteClick(pjw.pw_id, pjw.complete)}
                                        />
                                        <ProjectDate>{moment(pjw.pw_deadline_s).format('YY-MM-DD')} ~ {moment(pjw.pw_deadline_e).format('YY-MM-DD')}</ProjectDate>
                                        <ProjectTitle>{pjw.pw_name}</ProjectTitle>
                                    </ProjectBox>
                                ))
                                ) : (
                                    <NoTitle>아직 등록된 업무가 없습니다.</NoTitle>
                                    )}
                            <AddBoardBtn onClick={() => workModalOpen(pj_id)}>업무 추가</AddBoardBtn>
                        </ProjectWorkContainer>
                    )}
                    
                    <TeamContainer>
                        <ToggleBox>
                            <MyBoardBtn onClick={projectModalOpen}>프로젝트 추가</MyBoardBtn>
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

                {/* {isProjectModalOpen && (
                    <ProjectAddModal
                        onClose={handleModalClose}
                        onSave={handleModalSave}
                    />
                )} */}
                {/* 프로젝트 추가 */}
                {isProjectModalOpen && (
                <ProjectAddModal
                    onClose={projectModalClose} // Close the modal
                    onSave={projectModalSave} // Save the modal
                />
                )}

                {/* {isProjectEditModalOpen && (
                    <ProjectEditModal
                        onClose={handleEditModalClose}
                        onSave={handleEditModalSave}
                        depart_id={selectedDepartInfo.depart_id}
                        depart_name={selectedDepartInfo.depart_name}
                    />
                )} */}
                {/* 업무 추가 */}
                {isWorkModalOpen && (
                    <WorkAddModal
                        onClose={workModalClose}
                        onSave={workModalSave}
                        pj_id={pj_id}
                    />
                )}

                {/* {isWorkEditModalOpen && (
                    <WorkEditModal
                        onClose={handleEditModalClose}
                        onSave={handleEditModalSave}
                        depart_id={selectedDepartInfo.depart_id}
                        depart_name={selectedDepartInfo.depart_name}
                    />
                )} */}
                
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
    overflow-x: auto;
`;

const ProjectWorkContainer = styled(ProjectListContainer)`
    margin-left: 30px;
    overflow-x: auto;
`;

const ProjectDetailBox = styled.div`
    padding: 30px 20px;
    margin-bottom: 30px;
`;

const DetailTitle = styled.div`
    font-weight: 700;
    font-size: 22px;
    padding-bottom: 10px;
    border-bottom: 1px solid #e5e5e5;
`;

const Details = styled.div`
    margin-top: 15px;
    font-size: 18px;
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

const ProjectComplete = styled.div`
    width: 13px;
    min-width: 13px;
    height: 13px;
    min-height: 13px;
    border: 1px solid gray;
    border-radius: 3px;
    margin-left: 10px;
    cursor: pointer;
    background: ${(props) => (props.completed === 'Y' ? '#005FC5' : 'transparent')};
    transition: background-color 0.3s;
`;

const ProjectBox = styled.div`
    display: flex;
    align-items: center;
    border-bottom: 1px solid #e5e5e5;
    padding: 15px 0px;
    margin: 10px 20px;
    
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

const TeamBox = styled.div``;
