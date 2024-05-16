import { Chart, registerables } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import style from './DetectiveChart.module.css'
import React, {useState} from "react";
import certificateStyle from "../../Main.module.css";
import links from "../../../hyperlinksController";
// Регистрация необходимых адаптеров
Chart.register(...registerables);
const DetectiveChart = ({ detectives, cases }) => {
    const [selectedPeriod, setSelectedPeriod] = useState('all');

    const getData = () => {
        let filteredCases;
        if (selectedPeriod === 'all') {
            filteredCases = cases.filter(c => c.status === 'done');
        } else {
            const [start, end] = selectedPeriod.split('|');

            const dateStartString = start;
            const [yearStart, monthStart, dayStart] = dateStartString.split('-');
            const selectedPeriodStart = new Date(yearStart, monthStart - 1, dayStart);

            const dateEndString = end;
            const [yearEnd, monthEnd, dayEnd] = dateEndString.split('-');
            const selectedPeriodEnd = new Date(yearEnd, monthEnd - 1, dayEnd);

            filteredCases = cases.filter(c => {
                const [year, month, day] = c.date.split('-'); // Розбиваємо рядок на числа
                const caseDate = new Date(year, month - 1, day); // Створюємо об'єкт Date

                return c.status === 'done' && caseDate >= selectedPeriodStart && caseDate <= selectedPeriodEnd;
            });
            console.log(selectedPeriodStart)
            console.log(selectedPeriodEnd)
            //console.log(start)

        }

        const data = {
            labels: detectives.map(detective => detective.name),
            datasets: [
                {
                    label: 'Completed Cases',
                    backgroundColor: 'rgba(75,192,192,0.4)',
                    borderColor: 'rgba(75,192,192,1)',
                    borderWidth: 1,
                    hoverBackgroundColor: 'rgba(75,192,192,0.6)',
                    hoverBorderColor: 'rgba(75,192,192,1)',
                    data: detectives.map(detective => filteredCases.filter(c => c.detective === detective.name).length),
                },
            ],
        };

        return data;
    };

    const options = {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true,
                },
            }],
            xAxes: [{
                type: 'category',
            }],
        },
    };

    const handlePeriodChange = (event) => {
        const period = event.target.value;
        console.log(period)
        setSelectedPeriod(period);
    };

    return (
        <div className={style.allElements}>
            <h1 className={style.heading}><a className={certificateStyle.glosarij} href={links.detectives_instractionDiagrama} target="_blank">Detectives' Completed Cases</a></h1>
            <div className={style.diagramAndPeriodSelector}>
                <div className={style.periodSelector}>
                    <label htmlFor="period">Select Period:  </label>
                    <select id="period" value={selectedPeriod} onChange={handlePeriodChange}>
                        <option value="all">All</option>
                        <option value={`2023-01-01|2024-01-01`}>2023 - 2024</option>
                        <option value={`2022-01-01|2023-01-01`}>2022 - 2023</option>
                        <option value={`2002-01-01|2021-01-01`}>2002 - 2022</option>
                    </select>
                </div>
                <Bar data={getData()} options={options} />
            </div>
        </div>
    );
};

export default DetectiveChart;
