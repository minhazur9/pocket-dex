import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import chart from 'tui-chart';


const StatChart = (props) => {
    const info = useSelector((state => state.info));
    const hp = info.stats[0].base_stat;
    const atk = info.stats[1].base_stat;
    const def = info.stats[2].base_stat;
    const spAtk = info.stats[3].base_stat;
    const spDef = info.stats[4].base_stat;
    const speed = info.stats[5].base_stat;
    let height = props.height;
    let width = props.width;

    // Renders a bar chart
    const renderChart = () => {
        const container = document.getElementById('chart-area');
        const data = {
            categories: ['HP', 'Attack', 'Defense', 'Sp.Atk', 'Sp.Def', 'Speed'],
            series: [
                {
                    data: [hp, atk, def, spAtk, spDef, speed]
                },
            ]
        };
        if(window.innerWidth <= 900) {
            height = 240;
            width = 200;
        }
        if(window.innerWidth <= 850) {
            height = 180;
            width = 180;
        }
        const options = {
            chart: {
                width: width,
                height: height
            },
            xAxis: {
                min: 0,
                max: 250
            },
            legend: {
                visible: false
            },
            plot: {
                showLine: false
            },
            series: {
                showLabel: true
            },
            chartExportMenu: {
                visible: false
            }
        };
        chart.barChart(container, data, options);

    }



    useEffect(() => {
        document.getElementById('chart-area').innerHTML = "";
        renderChart()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info])

    return (
        <>
            <li id="chart-area"></li>
        </>
    )
}

export default StatChart;