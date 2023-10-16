import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";

// 관리자 부서별 근태 현황/통계
const AdminAttendanceDep = () => {

    const router = useRouter();

    return (
        <div>
            <div style={{ display: "flex", cursor: 'pointer'}}>
                {/* 50%를 차지하는 세로 직사각형 */}
                <div
                    style={{
                        flex: "1",
                        borderRadius: "20px",
                        border: "3px solid black",
                        height: "50vh", // 화면 높이의 50%를 차지
                        width: "50%", // 너비를 추가합니다.
                        textAlign: "center"
                    }}
                    onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
                >
                    <span style={{ lineHeight: "50vh" }}>
                        여기가 부서별 근태 현황 그래프가 되어야하는데 와이라노?
                    </span>
                </div>

                {/* 10%를 차지하는 가로 직사각형 */}
                <div
                    style={{
                        flex: "0 0 10%",
                        borderRadius: "20px",
                        border: "3px solid black",
                        width: "30%", // 너비를 추가합니다.
                        height: "80px",
                        marginLeft: "10px", // 간격을 줄 때 사용할 수 있습니다.
                        cursor: 'pointer',
                        textAlign: "center"
                    }}
                >
                    <span style={{ lineHeight: "80px" }}>
                        여기는 부서별 조회
                    </span>
                </div>
            </div>
            
            {/* 나머지 부분을 차지하는 원 */}
            <div
                style={{
                    width: "50%",
                    // height: "calc(100vh - 50% - 3px)", // 나머지 부분을 차지
                    height: "calc(450px - 0px - 3px)",
                    borderRadius: "50%", // 원 모양을 만들기 위해 50%로 설정
                    border: "3px solid black",
                    marginTop: "10px", // 간격을 줄 때 사용할 수 있습니다.
                    textAlign: "center",
                    cursor: 'pointer'
                }}
                onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
            >
                <span style={{ lineHeight: "450px" }}>
                    부서별 근태 통계 원형 그래프
                </span>
            </div>
            <div>
                <button type="button" onClick={() => router.push('/admin/attendance/adminAnnualList')} style={{ cursor: 'pointer' }}>연차 요청 목록</button>
                <button type="button" onClick={() => router.push('/admin/attendance/adminVacationList')} style={{ cursor: 'pointer' }}>휴가 요청 목록</button>
            </div>
        </div>
    );
}

export default AdminAttendanceDep;

AdminAttendanceDep.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
