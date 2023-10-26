import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const TeamPieChart = ({ selectedTeam }) => {
    const [team, setTeam] = useState([]);
    const router = useRouter();

    console.log("selectedTeam", {selectedTeam});

    useEffect(() => {
        const fetchData = async () => {
            if (selectedTeam) {
                const token = localStorage.getItem('token');
                try {
                    const response = await axios.get(`http://localhost:8081/admin/attendance/teamAttendanceStatus/${selectedTeam}`, {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    });
                    setTeam(response.data);
                } catch (error) {
                    console.error(error);
                }
            }
        };
        fetchData();
    }, [selectedTeam]);

    const annualCount = team.annualCount;
    const averageWorkin = team.averageWorkin;
    const averageWorkout = team.averageWorkout;

    const data = {
        labels: ['연차/휴가', '출근 시간', '퇴근시간'],
        datasets: [
            {
                label: '팀별',
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

    return (
        <div>
            <h2>Team Chart</h2>
            <Pie data={data} />
        </div>
    );
};

export default TeamPieChart;
