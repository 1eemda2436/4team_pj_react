import MainLayout from "@/components/layout/mainLayout";
import { useRouter } from "next/router";
import styled from "styled-components";

// 연차 신청
const AnnualRegister = () => {
    const token = localStorage.getItem('token')
    const router = useRouter();

    return (
        <div align="center">
            <div style={{border: "3px solid black", borderRadius: "20px", height: "80px", textAlign: "center", width: "800px"}}>
                <span style={{ lineHeight: "80px" }}>
                    캘린더자리
                </span>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
            <TblComponent>
                <PayTableBottom>
                    <tbody>
                        <tr>
                            <th colSpan="2" style={{fontSize: "36px", fontWeight: "bold"}}>휴가 신청서</th>
                        </tr>

                        <tr>
                            <th colSpan={2} style={{padding: "0px"}}><hr/></th>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="title">제목</label>
                                <input type="text" id="title" placeholder="제목입력~" size={30} />
                            </td>
                            <td>
                                <label htmlFor="reference">참조</label>
                                <input type="text" id="reference" placeholder="참조 입력~" size={30} />
                            </td>
                        </tr>

                        <tr>
                            <td>
                                <label htmlFor="title">시작일</label>
                                <input type="date"/>
                            </td>
                            <td>
                                <label htmlFor="reference">종료일</label>
                                <input type="date"/>
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <input type="text" id="content" placeholder="내용 입력~" style={{width: "760px", height: "200px"}} />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <label htmlFor="file">파일 추가</label>
                                <input type="file" id="file" />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <label htmlFor="referenceList">참조자 및 참조 부서 목록</label>
                                <input type="text" id="referenceList" placeholder="참조자 입력~" />
                            </td>
                        </tr>

                        <tr>
                            <td colSpan="2">
                                <input type="button" value={"신청하기"} onClick={() => router.push('/guest/attendance/vacation')} style={{ cursor: 'pointer' }}/>
                            </td>
                        </tr>
                    </tbody>
                </PayTableBottom>
            </TblComponent>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <div>휴가 상세 내역</div>
                <br/>
                <div>[ 총 휴가 ]</div>
                <div>[ 사용한 휴가 ]</div>
                <div>[ 남은 휴가 ]</div>
                <div>[ 그 동안 사용한 휴가의 승인 여부 ]</div>
                <div>[ 그 동안 거절된 휴가의 사유 ]</div>
            </div>
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