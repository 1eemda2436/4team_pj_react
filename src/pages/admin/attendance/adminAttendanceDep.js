import AdminLayout from "@/components/layout/adminLayout";

// 관리자 부서별 근태 현황/통계
const AdminAttendanceDep = () => {
    return (
        <div>
            <div style={{ display: "flex" }}>
                {/* 50%를 차지하는 세로 직사각형 */}
                <div
                    style={{
                        flex: "1",
                        borderRadius: "20px",
                        border: "3px solid black",
                        height: "50vh", // 화면 높이의 50%를 차지
                        width: "50%", // 너비를 추가합니다.
                    }}
                >여기가 부서별 근태 현황 그래프가 되어야하는데 와이라노?</div>

                {/* 10%를 차지하는 가로 직사각형 */}
                <div
                    style={{
                        flex: "0 0 10%",
                        borderRadius: "20px",
                        border: "3px solid black",
                        width: "10%", // 너비를 추가합니다.
                        marginLeft: "10px", // 간격을 줄 때 사용할 수 있습니다.
                    }}
                >여기는 부서별 조회</div>
            </div>
            
            {/* 나머지 부분을 차지하는 원 */}
            <div
                style={{
                    width: "100%",
                    height: "calc(100vh - 50% - 3px)", // 나머지 부분을 차지
                    borderRadius: "50%", // 원 모양을 만들기 위해 50%로 설정
                    border: "3px solid black",
                    marginTop: "10px", // 간격을 줄 때 사용할 수 있습니다.
                    textAlign: "center"
                }}
            >부서별 근태 통계 원형 그래프</div>
        </div>
    );
}

export default AdminAttendanceDep;

AdminAttendanceDep.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
