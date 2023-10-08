import AdminLayout from "@/components/layout/adminLayout";

// 연차 신청[관리자]
const AdminAnnualConfirm = () => {
    return (
        <div>
            <h1>연차 신청 내역</h1>
            <br/><br/><hr/><br/><br/>
            <table>
                <tr>
                    <th>문서번호</th>
                    <th>문서 제목</th>
                    <th>승인여부</th>
                </tr>

                <tr>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                </tr>

                <tr>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                </tr>

                <tr>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                </tr>

                <tr>
                    <td>NULL</td>
                    <td>NULL</td>
                    <td>NULL</td>
                </tr>
            </table>
        </div>
    );
}

export default AdminAnnualConfirm;

AdminAnnualConfirm.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
