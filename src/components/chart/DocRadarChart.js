import axios from 'axios';
import { Chart, registerables } from 'chart.js';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { Pie } from 'react-chartjs-2';
Chart.register(...registerables);

const DocRadarChart = () => {
    const [doc, setDoc] = useState([]);
    const router = useRouter();

    useEffect(() => {
        const fetchData = async () => {
            const token = localStorage.getItem('token');
            const company_id = localStorage.getItem('company_id');
            console.log('전사ID????', company_id);
            try {
                const response = await axios.get(`http://localhost:8081/guest/doc/docChart/${company_id}`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setDoc(response.data);
                console.log("값좀보자!@!@!@", response.data);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);

    const docConfirmCount = doc.docConfirmCount;
    console.log("승인!@!@!@", doc.docConfirmCount);
    const docDoingCount = doc.docDoingCount;
    console.log("진행!@!@!@", doc.docDoingCount);
    const docReturnCount = doc.docReturnCount;
    console.log("반려!@!@!@", doc.docReturnCount);
    const docNewCount = doc.docNewCount;
    console.log("진행전!@!@!@", doc.docNewCount);
    const docLaterCount = doc.docLaterCount;
    console.log("임시!@!@!@", doc.docLaterCount);
    const 

    const data = {
        labels: ['결재완료', '결재진행중', '결재반려', '결재진행전', '임시저장'],
        datasets: [
            {
                label: '결재',
                data: [docConfirmCount, docDoingCount, docReturnCount, docNewCount, docLaterCount],
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(255,99,132,1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div>
            <h2>전자결재</h2>
            <div style={{ width: '300px', height: '300px' }}>
                <Pie data={data} />
            </div>
        </div>
    );

};
export default DocRadarChart;