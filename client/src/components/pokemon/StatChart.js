import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { calculateHP, calculateOtherStats } from '../../calculations/pokemonStats';
import chart from 'tui-chart';


const StatChart = (props) => {
    const info = useSelector((state => state.info));
    let max = 250;
    let hp = 0;
    let atk = 0;
    let def = 0;
    let spAtk = 0;
    let spDef = 0;
    let speed = 0;
    const { stats } = info;
    if (props.level) {
        hp = calculateHP(stats[0].base_stat, props.ivs[0], props.evs[0], props.level)
        const baseStats = calculateOtherStats(stats, props.ivs, props.evs, props.level, props.nature)
        atk = baseStats[0];
        def = baseStats[1];
        spAtk = baseStats[2];
        spDef = baseStats[3];
        speed = baseStats[4];
        max = 715;
    }
    else {
        hp = stats[0].base_stat;
        atk = stats[1].base_stat;
        def = stats[2].base_stat;
        spAtk = stats[3].base_stat;
        spDef = stats[4].base_stat;
        speed = stats[5].base_stat;
    }
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
        if (window.innerWidth <= 900) {
            height = 240;
            width = 200;
        }
        if (window.innerWidth <= 850) {
            height = 180;
            width = 180;
        }
        if (window.innerWidth <= 550) {
            height = 165;
            width = 165;
        }
        const options = {
            chart: {
                width: width,
                height: height
            },
            xAxis: {
                min: 0,
                max: max
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
            },
        };
        chart.barChart(container, data, options);

    }



    useEffect(() => {
        const abortCont = new AbortController();
        document.getElementById('chart-area').innerHTML = "";
        renderChart()
        return () => abortCont.abort()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [info, props.level,props.ivs,props.evs])

    return (
        <>
            <li id="chart-area"></li>
        </>
    )
}

export default StatChart;