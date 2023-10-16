import AdminLayout from "@/components/layout/adminLayout";
import { useRouter } from "next/router";
import axios from "axios";
import React, { useEffect, useState } from "react";

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
    textAlign: "center",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

// 연차 승인/반려[관리자]

function AdminAnnualConfirm() {
    const [attendance, setAttendance] = useState([]);
    const [id, setId] = useState();

    const router = useRouter();

    useEffect(() => {
        const annual_id = router.query.id;
        setId(router.query.id);
        console.log('!!!', id);

        axios
            .get(`http://localhost:8081/attendance/annualDetail/${annual_id}`)
            .then((response) => {
                setAttendance(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, [id]);
    
    return (
        <div align="center">
            <div>
                <button>PDF 다운</button>
                <button>결제 취소</button>
            </div>
            <br/><br/><hr/><br/><br/>
            <div>
                <table style={tableStyle}>
                    <tbody>
                        {attendance.map((annual) => (
                            <tr key={annual.annual_id}>
                                <th style={cellStyle}>문서 번호</th>
                                <td style={cellStyle}>{annual.annual_id}</td>
                            </tr>
                        ))}
                        {attendance.map((annual) => (
                            <tr key={annual.annual_id}>
                                <th style={cellStyle}>제목</th>
                                <td style={cellStyle}>{annual.annual_title}</td>
                            </tr>
                        ))}
                        <tr>
                            <td colSpan={2} style={cellStyle}>
                                <input type="text" width={500} height={500} placeholder="문서내용~"/>
                            </td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>구분</th>
                            <td style={cellStyle}>---</td>
                        </tr>

                        <tr>
                            <th style={cellStyle}>첨부파일</th>
                            <td style={cellStyle}>
                                <input type="file"/>
                            </td>
                        </tr>
                    </tbody>
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
