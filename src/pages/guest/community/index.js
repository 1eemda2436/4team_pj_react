import MainLayout from "@/components/layout/mainLayout";
import styled from "styled-components";
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import rootStore from "@/stores/rootStore";
import Header from "@/components/common/header";
import SelectBox from "@/components/form/selectBox";
import UserIcon from '../../../../public/asset/icons/user.svg';
import NewsCrawling from "@/components/crawling/news";


const Community = () => {
    
    const [data, setData] = useState([]);
    const [selectedItems, setSelectedItems] = useState([]);
    const [isAllSelected, setIsAllSelected] = useState(false);
    const [category, setCategory] = useState([]);

useEffect(() => {
    // 새로운 데이터를 불러오는 API 호출
    axios.get('URL_새로운_데이터를_불러오는_API')
        .then(response => {
            setNewData(response.data);
        })
        .catch(error => {
            console.error('새로운 데이터를 불러오는 중 에러:', error);
        });
}, []);

    
    const CategoryChange = (event) => {
        setData(prevData => ({
            ...prevData,
            [event.target.name] : event.target.value
        }));
        console.log(event.target.name,event.target.value);
    }

    // 체크박스 전체선택, 선택해제
    const handleSelectAllChage = () => {
        if (isAllSelected) {
            // 전체 선택이 해제된 경우, 모든 항목을 제거합니다.
            setSelectedItems([]);
        } else {
            // 전체 선택이 체크된 경우, 모든 항목을 추가합니다.
            const allItemIds = data.map(item => item.board_id);
            setSelectedItems(allItemIds);
        }
        // 전체 선택 체크박스의 상태를 업데이트합니다.
        setIsAllSelected(!isAllSelected);
    };
    

    // 체크박스를 토글하고 선택한 항목을 업데이트합니다.
    const handleCheckboxChange = (itemId) => {
        const itemIdInt = parseInt(itemId, 10);
        if (isSelected(itemId)) {
            setSelectedItems(selectedItems.filter(item => item !== itemId));
        } else {
            setSelectedItems([...selectedItems, itemId]);
        }
    };
    
    // 해당 아이템이 선택되었는지 확인합니다.
    
    const isSelected = (itemId) => selectedItems.includes(itemId);
    const intSelectedItems = selectedItems.map(item => parseInt(item));
    const deleteSelectedItems = () => {
        if (intSelectedItems.length === 0) {
            alert('선택된 항목이 없습니다.');
            return;
        }
        
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        
        // 여러 아이템을 삭제할 때는 배열 형태로 서버에 전달합니다.
        axios.delete('http://localhost:8081/guest/community/boardDelete', {
            data: intSelectedItems, // 선택된 아이템 ID 배열
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            console.log("Delete response:", response);
            // 삭제가 성공하면 선택 항목과 데이터를 업데이트합니다.
            setSelectedItems([]);
            refreshData();
        })
        .catch(err => {
            console.error('선택한 항목 삭제 중 오류 발생:', err);
        });
    };

    
    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get('http://localhost:8081/guest/community/list', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setData(response.data);
        })
        .catch(err => {
            if (axios.isAxiosError(err)) {
                setError(err.response.data.message);
            } else {
                setError('데이터를 가져오는 중 오류 발생');
            }
        });

        axios.get('http://localhost:8081/guest/community/category', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then((response) => {
            console.log(response.data)
            setCategory(response.data);
        })
        .catch((error) => {
            console.log(error);
        });
    },[]);
    // useEffect(() => {
    //     refreshData();
    // }, []);

    const router = useRouter();

    const goToBoardWrite = () => {
        router.push('/guest/community/BoardWrite');
    }

    return (
        <>
            <Header />
            <MainContainer>
                <BoardContainer>
                    <SubHeaderContainer>
                        <TitleBox>
                            <Title>자유게시판</Title>
                            <CategorySelect>
                                <Category>  
                                    <select name="category_id" value={data.category_id} onChange={CategoryChange}>
                                        <option value="">카테고리 선택</option>
                                        {category.map(cat => (
                                            <option key={cat[0]} value={cat[0]}>
                                                {cat[1]}
                                            </option>
                                        ))}
                                    </select> 
                                </Category>
                            </CategorySelect>
                        </TitleBox>
                        <ToggleBox>
                            <MyBoardBtn>내 글 보기</MyBoardBtn>
                            <AddBoardBtn onClick={goToBoardWrite}>글쓰기</AddBoardBtn>
                        </ToggleBox>
                    </SubHeaderContainer>

                    <ContentContainer>
                        {data.map(item => (
                            <ContentBox 
                                key={item.board_id}
                                onClick={() => router.push(`/guest/community/boardDetail/${item.board_id}`)}
                            >
                                <ContentHeader>
                                    <UserBox>
                                        <UserIconStyle width="35" height="35" />
                                        <UserName>작성자</UserName>
                                    </UserBox>
                                    {(item.hits !== 0 && item.hits !== null) ? 
                                        (<Hits>{item.hits}</Hits>) 
                                        : 
                                        (<Hits>0</Hits>)
                                    }
                                </ContentHeader>
                                <ContentInnerBox>
                                    <ContentTitleBox>
                                        <ContentTitle>{item.title}</ContentTitle>
                                        {(item.comment_cnt !== 0 && item.comment_cnt !== null) && (
                                            <ContentComment>+{item.comment_cnt}</ContentComment>
                                        )}
                                    </ContentTitleBox>
                                    <Contents>{item.content}</Contents>
                                    
                                </ContentInnerBox>
                            </ContentBox>
                        ))}
                    </ContentContainer>
                </BoardContainer>
                <NewsContainer>
                    <NewsCrawling />
                </NewsContainer>
            </MainContainer>
        </>
    );
}

export default Community;

Community.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const Component = styled.div`
`;

const MainContainer = styled.div`
    width: 100%;
    height: 90%;
    display: flex;
    box-sizing: border-box;
    padding: 20px 50px;
`;

const BoardContainer = styled.div`
    width: 80%;
    display: flex;
    flex-direction: column;
    margin-right: 40px;
`;

const SubHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: 50px;
`;

const TitleBox = styled.div`
    display: flex;
    align-items: flex-end;
`;

const Title = styled.span`
    font-size: 38px;
    font-weight: 700;
    cursor: default;
`;

const CategorySelect = styled.div`
    margin-left: 20px;
    display: flex;
    
`;

const Category = styled.div`
    margin-bottom: -5px;
    font-size: 18px;
    text-decoration: underline;
    cursor: pointer;
    padding: 15px 15px 5px 15px;
    border-radius: 5px;

    &:hover {
        font-weight: 700;
        background: #eff1f6;
        transition: 0.3s;
    }
`;
const ToggleBox = styled.div`
    display: flex;
    align-items: center;
`;

const MyBoardBtn = styled.div`
    cursor: pointer;
    background: #007BFF;
    padding: 15px 20px;
    border-radius: 5px;
    color: #fff;
    font-weight: 600;
    font-size: 15px;

    &:hover {
        background: #005CBF;
    }
`;
const AddBoardBtn = styled(MyBoardBtn)`
    margin-left: 20px;
`
const ContentContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    column-gap: 50px;
    row-gap: 20px;
`;


const ContentBox = styled.div`
    background: #eff1f6;
    border-radius: 5px;
    padding: 10px 25px;
    cursor: pointer;
`;

const ContentHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 15px;
`;

const UserBox = styled.div`
    display: flex;
    align-items: center;
`;

const UserName = styled.div`
    margin-left: 10px;
`;


const UserIconStyle = styled(UserIcon)``;

const Hits = styled.div`
    color: rgba(0,0,0,0.3);
`;

const ContentInnerBox = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const ContentTitleBox = styled.div`
    display: flex;
    margin-bottom: 10px;
`;

const ContentTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`;

const ContentComment = styled.span`
    color: red;
    margin-left: 5px;
`;

const Contents = styled.div`
    max-width: 500px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 3em; 
`;

const NewsContainer = styled.div`
    width: 20%;
    height: 100%;
    background: #eee;
    border-radius: 5px;
`;

