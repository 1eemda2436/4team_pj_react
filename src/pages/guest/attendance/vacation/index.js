import React, { Component, useEffect, useState } from "react";
import MainLayout from "@/components/layout/mainLayout";
import axios from "axios";
import { useRouter } from "next/router";
import styled from "styled-components";

const cellStyle = {
    border: "2px solid black",
    padding: "8px",
    textAlign: "center",
};

const tableStyle = {
    borderCollapse: "collapse",
    width: "800px",
    borderRadius: "20px",
};

function GuestVacationList() {
    const token = localStorage.getItem('token')
    const [vacation, setVacation] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:8081/all/attendance/vacationRequestsList",{
                headers: {
                    Authorization: token
                }
            })
            .then((response) => {
                setVacation(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const router = useRouter();

    return (
        <div align="center">
            <TextTitle>휴가 신청 내역</TextTitle>

            <hr />
            <br/>
            <br/>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        <th style={cellStyle}>문서번호</th>
                        <th style={cellStyle}>문서 제목</th>
                        <th style={cellStyle}>승인여부</th>
                    </tr>
                </thead>

                <tbody>
                    {vacation.map((vacat) => (
                        <tr key={vacat.vacation_id}>
                            <td style={cellStyle}>{vacat.vacation_id}</td>
                            <td style={cellStyle}><a style={{ cursor: 'pointer' }}>{vacat.vacation_title}</a></td>
                            <td style={cellStyle}>{vacat.confirm}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default GuestVacationList;

GuestVacationList.getLayout = function getLayout(page) {
    return <MainLayout>{page}</MainLayout>;
};

const TextTitle = styled.div`
    font-size: 36px;
    font-weight: bold;
    padding: 30px 30px;
`;