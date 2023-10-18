import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";

const AdminAttendanceDep = () => {
    const router = useRouter();

    return (
        <div>
            <div style={{ display: "flex", cursor: 'pointer' }}>
                <div
                    style={{
                        flex: "1",
                        borderRadius: "20px",
                        border: "3px solid black",
                        height: "50vh",
                        width: "50%",
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        flexDirection: "column",
                        fontSize: "1.5rem", // 폰트 크기 추가
                    }}
                    onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
                >
                    부서별 근태 현황 그래프 (리눅스 예정)
                </div>
                <div
                    style={{
                        flex: "0 0 10%",
                        borderRadius: "20px",
                        border: "3px solid black",
                        width: "30%",
                        height: "80px",
                        marginLeft: "10px",
                        cursor: 'pointer',
                        textAlign: "center",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        fontSize: "1.2rem", // 폰트 크기 추가
                    }}
                >
                    부서별 조회
                </div>
            </div>
            <div
                style={{
                    width: "50%",
                    height: "calc(450px - 0px - 3px)",
                    borderRadius: "50%",
                    border: "3px solid black",
                    marginTop: "10px",
                    textAlign: "center",
                    cursor: 'pointer',
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    flexDirection: "column",
                    fontSize: "1.5rem", // 폰트 크기 추가
                }}
                onClick={() => router.push('/admin/attendance/adminAttenDepDetail')}
            >
                부서별 근태 통계 원형 그래프
            </div>
            <div>
                <button
                    type="button"
                    onClick={() => router.push('/admin/attendance/adminAnnualList')}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        fontSize: "1rem",
                        margin: "5px",
                    }}
                >
                    연차 요청 목록
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/admin/attendance/adminVacationList')}
                    style={{
                        cursor: 'pointer',
                        backgroundColor: "#007BFF",
                        color: "white",
                        border: "none",
                        padding: "10px 20px",
                        borderRadius: "20px",
                        fontSize: "1rem",
                        margin: "5px",
                    }}
                >
                    휴가 요청 목록
                </button>
            </div>
        </div>
    );
}

export default AdminAttendanceDep;

AdminAttendanceDep.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
