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
import { BASE_URL } from "@/api/apiPath";


const Community = () => {
    
    const router = useRouter();
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);


    useEffect(() => {
        const token = localStorage.getItem('token');
        axios.get(`${BASE_URL}/guest/community/list`, {
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
    }, [currentPage]); // currentPage 변경 시에만 데이터를 다시 가져옵니다.

    const [itemsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    // 페이지별로 데이터 슬라이스
    const paginateData = (data, page, itemsPerPage) => {
    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return data.slice(startIndex, endIndex);
    };

    // 현재 페이지에 따라 데이터 슬라이스
    const currentItems = paginateData(data, page, itemsPerPage);
    const totalPages = Math.ceil(data.length / itemsPerPage);

    const handleClick = (type) => {
    if (type === "prev" && page > 1) {
        setPage(page - 1);
    } else if (type === "next" && page < totalPages) {
        setPage(page + 1);
    }
    };

    const [selectedCategory, setSelectedCategory] = useState(''); // 선택한 카테고리
    const [categories, setCategories] = useState([]); // 카테고리 목록
    const [filteredData, setFilteredData] = useState([]); // 필터링된 게시글 목록

    // useEffect(() => {
    //     // 카테고리 목록을 가져오는 API 요청
    //     const token = localStorage.getItem('token');
    //     axios.get('http://localhost:8081/guest/community/categories', {
    //         headers: {
    //             'Authorization': `Bearer ${token}`
    //         }
    //     })
    //     .then(response => {
    //         setCategories(response.data);
    //     })
    //     .catch(error => {
    //         console.error('카테고리 가져오기 오류:', error);
    //     });
    // }, []);

    // 카테고리 선택 시 호출되는 함수 / 대기
    const handleCategorySelect = (category_id) => {
        setSelectedCategory(category_id);
        const token = localStorage.getItem('token');
        // API 요청을 보내서 선택한 카테고리에 해당하는 게시글 목록을 가져옴
        axios.get(`${BASE_URL}/guest/community/list?category=${category_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        .then(response => {
            setFilteredData(response.data);
        })
        .catch(error => {
            console.error('게시글 목록 가져오기 오류:', error);
        });
    }

    //BoardWrite이동 메서드
    const goToBoardWrite = () => {
        const user_id = localStorage.getItem('user_id');
        //router.push(`/guest/community/BoardWrite/`);
        router.push({
            pathname: '/guest/community/boardWrite',
            query: { id: user_id }
        });
        
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
                                {/* <SelectBox 
                                    // SelectBox 컴포넌트에 카테고리 목록과 선택된 카테고리를 전달
                                    label='카테고리를 선택하세요.'
                                    //options={categories}
                                    itemData={categories}
                                    selectedValue={selectedCategory}
                                    onItemSelected={handleCategorySelect}
                                /> */}
                            </CategorySelect>
                        </TitleBox>
                        <ToggleBox>
                            {/* <MyBoardBtn>내 글 보기</MyBoardBtn> */}
                            <AddBoardBtn onClick={goToBoardWrite}>글쓰기</AddBoardBtn>
                        </ToggleBox>
                    </SubHeaderContainer>

                    <ContentContainer>
                        {/* {filteredData.map(item => ( */}
                        {currentItems
                        //.filter(item => item.category_id === selectedCategory) // 선택된 카테고리에 해당하는 게시글만 필터링
                        .map(item => (
                            <ContentBox 
                                // key={item.board_id}
                                // onClick={() => router.push(`/guest/community/boardDetail/${item.board_id}`)}
                                key={item.board_id}
                                onClick={() => router.push(`/guest/community/boardDetail/${item.board_id}`)}
                            >
                                <ContentHeader>
                                    <UserBox>
                                        <UserIconStyle width="35" height="35" />
                                        <UserName>{item.writer}</UserName>
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
                    {totalPages > 1 && (  // 여기에서 조건부 렌더링을 수행합니다.
                    <PageButton>
                        <button onClick={() => handleClick("prev")} disabled={page === 1}>이전</button>
                        <span>{page} / {totalPages}</span>
                        <button onClick={() => handleClick("next")} disabled={page === totalPages}>다음</button>
                    </PageButton>
                    )}
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

const PageButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px`;