import React, { Component, useEffect, useState } from "react";
import AdminLayout from "@/components/layout/adminLayout";
import axios from "axios";

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
    textAlign: "center",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
};

function AdminAnnualList() {
    const [attendance, setAttendance] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/attendance/annualRequestsList")
            .then((response) => {
                setAttendance(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    return (
        <div>
            <h1>연차 신청 내역</h1>
            <br />
            <br />
            <hr />
            <br />
            <br />
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>문서번호</th>
                        <th style={cellStyle}>문서 제목</th>
                        <th style={cellStyle}>승인여부</th>
                    </tr>
                </thead>

                <tbody>
                    {attendance.map((annual) => (
                        <tr key={annual.annual_id}>
                            <td style={cellStyle}>{annual.annual_id}</td>
                            <td style={cellStyle}>{annual.annual_title}</td>
                            <td style={cellStyle}>{annual.confirm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AdminAnnualList;

AdminAnnualList.getLayout = function getLayout(page) {
    return <AdminLayout>{page}</AdminLayout>;
};
