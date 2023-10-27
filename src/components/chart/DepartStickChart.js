import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
Chart.register(...registerables);

const DepartStickChart = ({ selectedDepartment }) => {
    const [depart, setDepart] = useState([]);
    const router = useRouter();

    console.log("selectedDepartment", {selectedDepartment});

    useEffect(() => {
        const fetchData = async () => {
            if (selectedDepartment) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:8081/admin/attendance/departmentAttendanceStatus/${selectedDepartment}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setDepart(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [selectedDepartment]);

    const annualCount = depart.annualCount;
    const averageWorkin = depart.averageWorkin;
    const averageWorkout = depart.averageWorkout;

    const data = {
        labels: ['연차/휴가', '출근 시간', '퇴근시간'],
        datasets: [
            {
                label: '부서별',
                data: [annualCount, averageWorkin, averageWorkout],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)'
                ],
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
            <div style={{ width: '100%', height: '100%' }}>
                <h2>Department Chart</h2>
                <Bar data={data} options={options} />
            </div>
        </div>
    );
};

export default DepartStickChart;
