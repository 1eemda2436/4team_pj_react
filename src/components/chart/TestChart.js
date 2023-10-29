import { Chart, registerables } from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';  // 바 차트를 사용합니다.
Chart.register(...registerables);

const TestChart = () => {
    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Progress Data',
                data: [12, 31, 65, 100, 141],  // 프로그래스 데이터 (예시)
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                max: 150,  // 원하는 최대 값으로 조정
            },
        },
    };

    return (
        <div>
            <h2>Progress Bar Chart</h2>
            <Bar data={data} options={options} />
        </div>
    );
};

export default TestChart;
