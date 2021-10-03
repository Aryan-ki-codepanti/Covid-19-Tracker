import React, { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import numeral from "numeral";


const options = {
    legend: {display : false},
    elements: {
      point: {
        radius: 0,
      },
    },
    maintainAspectRatio: false,
    tooltips: {
      mode: "index",
      intersect: false,
      callbacks: {
        label: function (tooltipItem, data) {
          return numeral(tooltipItem.value).format("+0,0");
        },
      },
    },
    scales: {
      xAxes: [
        {
          type: "time",
          time: {
            format: "MM/DD/YY",
            tooltipFormat: "ll",
          },
        },
      ],
      yAxes: [
        {
          gridLines: {
            display: false,
          },
          ticks: {
            // Include a dollar sign in the ticks
            callback: function (value, index, values) {
              return numeral(value).format("0a");
            },
          },
        },
      ],
    },
  };

const LineGraph = ( { casesType="cases" }) => {
    const [data, setData] = useState({});

    const buildChartData = (data,casesType="cases") => {
        const chartData = [];
        let lastDataPoint;

        Object.entries(data[casesType]).forEach(([date , point]) => {
            if (lastDataPoint){
                chartData.push({
                    x: date,
                    y: data[casesType][date] - lastDataPoint
                });
            }
            lastDataPoint = point;
        });
        return chartData;
    };

    useEffect(() => {
        const getData = async () => {
            const url =
                "https://disease.sh/v3/covid-19/historical/all?lastdays=120";

            const response = await fetch(url);
            const parsedResponse = await response.json();
            const chartData = buildChartData(parsedResponse , casesType);
            setData(prev => chartData);
        };
        getData();
    }, [casesType]);

    return (
        <div>

        { data?.length > 0 && (
            <Line
          data={{
            datasets: [
              {
                backgroundColor: "rgba(204, 16, 52, 0.5)",
                borderColor: "#CC1034",
                data: data,
              },
            ]}}
          options={options}
        />)}
        </div>
    );
};

export default LineGraph;
