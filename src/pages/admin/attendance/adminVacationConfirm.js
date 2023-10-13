import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";

// 연차 승인/반려[관리자]
const AdminAnnualConfirm = () => {

    const router = useRouter();
    
    return (
        <div>
            <div>
                <button>PDF 다운</button>
                <button>결제 취소</button>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table >
                    <tr>
                        <th>결재 번호 : </th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>결재 명 : </th>
                        <td>null</td>
                    </tr>

                    <tr>
                        <th>문서 번호 : </th>
                        <td>null</td>
                    </tr>
                </table>

                <table>
                    <tr>
                        <th>제목</th>
                        <td>문서제목~~</td>
                    </tr>

                    <tr>
                        <td colSpan={2}>
                            <input type="text" width={500} height={500} placeholder="문서내용~"/>
                        </td>
                    </tr>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table>
                    <tr>
                        <th>구분</th>
                        <td>---</td>
                    </tr>

                    <tr>
                        <th>첨부파일</th>
                        <td>
                            <input type="file"/>
                        </td>
                    </tr>
                </table>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <h1>결재의견</h1>
                <input type="text" placeholder="반려시 필수 작성"/>
                <br/><br/>
                <button style={{ cursor: 'pointer' }} onClick={() => router.push('/admin/attendance/adminAnnualList')} >승인</button>
                <button style={{ cursor: 'pointer' }} onClick={() => router.push('/admin/attendance/adminAnnualList')} >반려</button>
            </div>
        </div>
    );
}

export default AdminAnnualConfirm;

AdminAnnualConfirm.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
