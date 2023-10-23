import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/router";
import styled from "styled-components";
import AttenCalendar from "@/components/calendar/AttenCalendar";
import { useEffect, useState } from "react";
import axios from "axios";

// 연차 신청
function AnnualRegister () {
    const [attendance, setAttendance] = useState([]);
    const [annual, setAnnual] = useState({
        annual_id: '',
        id: '',
        name: '',
        annual_title: '',
        annual_start: '',
        annual_end: '',
        annual_content: '',
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setAnnual((annual) => ({
            ...annual,
            [name]: value,
        }));
    };

    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');
        axios
            .get(`http://localhost:8081/guest/attendance/myAttenCount/${id}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                console.log("값? : ", response.data);
                setAttendance(response.data);
            });
    }, []);

    const handleAnnualSubmit = () => {
        const token = localStorage.getItem('token');
        const id = localStorage.getItem('user_id');

        // 데이터를 requestData에 채우기
        const insertAnnual = new FormData();
        insertAnnual.append('id', attendance.id);
        insertAnnual.append('name', attendance.name);
        
        insertAnnual.append('annual_title', annual.annual_title);
        insertAnnual.append('annual_start', annual.annual_start);
        insertAnnual.append('annual_end', annual.annual_end);
        insertAnnual.append('annual_content', annual.annual_content);

        axios
            .post('http://localhost:8081/guest/attendance/annualRegister', insertAnnual, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then((response) => {
                // POST 요청 완료 후 원하는 작업 수행
                console.log("신청 완료:", response.data);
                // 예: 페이지 이동
                router.push('/guest/attendance/annuallist');
            })
            .catch((error) => {
                // 에러 처리
                console.error("에러 발생:", error);
            });
    };
    

    return (
        <div align="center">
            <AttenCal>
                <div style={{ border: "3px solid black", borderRadius: "20px", width: "100%", height: "100%", display: "flex"}}>
                    <AttenCalendar />
                </div>
            </AttenCal>0
            <br/><br/><hr/><br/><br/>
            <div>
            <TblComponent>
                <PayTableBottom>
                    <tbody>
                        <tr>
                            <th colSpan="2" style={{fontSize: "36px", fontWeight: "bold"}}>연차 신청서</th>
                        </tr>

                        <tr>
                            <th colSpan={2} style={{padding: "0px"}}><hr/></th>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="title">작성자번호</label>
                                <input type="text" name="id" size={30} readOnly value={attendance.id} onChange={handleInputChange}/>
                            </td>
                            <td>
                                <label htmlFor="reference">작성자명</label>
                                <input type="text" name="name" size={30} readOnly value={attendance.name} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="title">제목</label>
                                <input type="text" name="annual_title" placeholder="제목입력~" size={30} value={annual.annual_title} onChange={handleInputChange} />
                            </td>
                            <td>
                                <label htmlFor="reference">참조</label>
                                <input type="text" id="reference" placeholder="참조 입력~" size={30} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="title">시작일</label>
                                <input type="date" name="annual_start" value={annual.annual_start} onChange={handleInputChange} />
                            </td>
                            <td>
                                <label htmlFor="reference">종료일</label>
                                <input type="date" name="annual_end" value={annual.annual_end} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2" >
                                <input type="text" name="annual_content" placeholder="내용 입력~" style={{width: "760px", height: "200px"}} value={annual.annual_content} onChange={handleInputChange} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <input type="submit" value={"신청하기"} style={{ cursor: 'pointer' }} onClick={handleAnnualSubmit} />
                            </td>
                        </tr>
                    </tbody>
                </PayTableBottom>
            </TblComponent>
            </div>
            <br/><br/><hr/><br/><br/>
        </div>
    );
}

export default AnnualRegister;

AnnualRegister.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const TblComponent = styled.div`
    border: 1px solid #E5E5E5;
    border-radius: 20px;
    box-shadow: 0 2px 5px rgba(0,0,0,.10);
    box-sizing: border-box;
    margin-top: 40px;
    width: 800px;
`;

const TblHeader = styled.div`
    padding: 0px 15px;
    background: #F6F8FA;
    border-radius: 5px 5px 0px 0px;
`;

const TblContent = styled.div`
    height: 550px;
    overflow-x: auto;
    padding: 0px 15px;

&::-webkit-scrollbar {
    width: 4px;
} 

&::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}

&::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
}
`;

const MainComponent = styled.div`
    width: 100%;
    height: 100%;
    padding: 40px;
    box-sizing: border-box;
`;

const Table = styled.table`
    width:100%;
    table-layout: fixed;
    font-size: .9em;
    width: 800px;
    min-width: 650px;
    border-collapse: collapse;

    th {
    width: 150px;
    padding: 20px 15px;
    text-align: center;
    font-weight: 500;
    font-size: 15px;
    text-transform: uppercase;
    white-space: nowrap;
    }

    td {
    padding: 15px;
    vertical-align: middle;
    font-size: 13px;
    border-bottom: solid 1px #E5E5E5;
    text-align: center;
    word-wrap: break-word;
    }
`;

const PayTableTop = styled(Table)``;

const PayTableBottom = styled(Table)`
    margin-top: 20px;
`;

const AttenCal = styled.div`
    width: 40%;
    height: 100%;
    border: 2px solid #005FC5;
    border-radius: 10px;
    padding: 20px;
    box-sizing: border-box;
    text-align: center;
    margin-right: 10px;
`;