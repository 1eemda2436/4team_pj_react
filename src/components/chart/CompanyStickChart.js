import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);

const CompanyStickChart = ({ selectedCompany }) => {
    const [comList, setComList] = useState([]);
    const [selectedCompany, setSelectedCompany] = useState('');
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            if (selectedCompany) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:8081/admin/attendance/companyStatus/${selectedCompany}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setComList(response.data); // 배열 전체를 저장
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [selectedCompany]);

    // labels와 데이터를 동적으로 추출
    const labels = comList.map((com) => com.depart_name);
    console.log("labels", labels);
    const lateCounts = comList.map((com) => com.lateCount);
    const holidayCounts = comList.map((com) => com.holidayCount);
    const workinCounts = comList.map((com) => com.workinCount);

    // 차트 데이터 설정
    const data = {
        labels: labels,
        datasets: [
            {
                label: '지각자 수',
                data: lateCounts,
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1,
            },
            {
                label: '연차 및 휴가자 수',
                data: holidayCounts,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1,
            },
            {
                label: '출근자 수',
                data: workinCounts,
                backgroundColor: 'rgba(255, 206, 86, 0.2)',
                borderColor: 'rgba(255, 206, 86, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            x: {
                beginAtZero: true,
            },
            y: {
                beginAtZero: true,
            },
        },
    };

    return (
        <div>
            <h2>Company Chart</h2>
            <div style={{ width: '100%', height: '100%' }}>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default CompanyStickChart;
