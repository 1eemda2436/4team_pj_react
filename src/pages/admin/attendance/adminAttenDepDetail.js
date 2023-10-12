import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";

// 관리자 부서별 근태 현황(상세)
const AdminAttenDepDetail = () => {
    // 테두리 스타일을 정의합니다.

    const router = useRouter();

    const tableBorderStyle = {
        border: "3px solid black",
        borderRadius: "20px",
        textAlign: "center"
    };

    return (
        <div>
            <div>
                <table style={tableBorderStyle}>
                    <tr>
                        <th colSpan={2} onClick={() => router.push('/admin/attendance/adminAttenAnnualDetail')}>부서별 근태 현황</th>
                    </tr>

                    <tr>
                        <th style={tableBorderStyle}>금일 출근률</th>
                        <td style={tableBorderStyle}>null%</td>
                    </tr>

                    <tr>
                        <th style={tableBorderStyle}>금일 지각률</th>
                        <td style={tableBorderStyle}>null%</td>
                    </tr>

                    <tr>
                        <th style={tableBorderStyle}>금일 연차률</th>
                        <td style={tableBorderStyle}>null%</td>
                    </tr>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{border: "3px solid black", borderRadius: "20px"}}>
                캘린더자리
            </div>
            <br/><br/><hr/><br/><br/>
            <table style={tableBorderStyle}>
                <tr>
                    <th style={tableBorderStyle}>지각자 수</th>
                    <th style={tableBorderStyle}>지각자 통계</th>
                    <th style={tableBorderStyle}>연차 및 휴가 자</th>
                    <th style={tableBorderStyle}>연차 및 휴가 자 통계</th>
                </tr>

                <tr>
                    <td style={tableBorderStyle}>null</td>
                    <td style={tableBorderStyle}>null</td>
                    <td style={tableBorderStyle}>null</td>
                    <td style={tableBorderStyle}>null</td>
                </tr>
            </table>
        </div>


    );
}

export default AdminAttenDepDetail;

AdminAttenDepDetail.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
