import AdminLayout from "@/components/layout/adminLayout";

// 관리자 부서별 근태 통계(상세)
const AdminAttenAnnalDetail = () => {
    // 테두리 스타일을 정의합니다.
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
                        <th style={tableBorderStyle}>사번</th>
                        <th style={tableBorderStyle}>이름</th>
                        <th style={tableBorderStyle}>지각계</th>
                        <button>정렬</button>
                    </tr>

                    <tr>
                        <td style={tableBorderStyle}>null%</td>
                        <td style={tableBorderStyle}>null%</td>
                        <td style={tableBorderStyle}>null%</td>
                    </tr>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div style={{border: "3px solid black", borderRadius: "20px"}}>
                캘린더자리
            </div>
        </div>


    );
}

export default AdminAttenAnnalDetail;

AdminAttenAnnalDetail.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
