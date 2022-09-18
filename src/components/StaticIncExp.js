import React from 'react'
import { Box } from '@mui/material'
import { EntriesContext } from "../context/EntriesContext";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
const today = new Date();
export const options = {
  responsive: true,
  tension: 0.4,
  interaction: {
    mode: "index",
    intersect: false,
  },
  stacked: false,
  scales: {
    y: {
      type: "linear",
      display: true,
      position: "left",
    },
    y1: {
      type: "linear",
      display: true,
      position: "right",
      grid: {
        drawOnChartArea: false,
      },
    },
  },
};

const labels = [
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "11",
    "12",
    "13",
    "14",
    "15",
    "16",
    "17",
    "18",
    "19",
    "20",
    "21",
    "22",
    "23",
    "24",
    "25",
    "26",
    "27",
    "28",
    "29",
    "30",
    "31",
].slice(0, today.getDate())
  
const StaticIncExp = () => {

    const { entries } = React.useContext(EntriesContext);
    const [incomesData, setIncomesData] = React.useState([]);
    const [expensesData, setExpensesData] = React.useState([]);

    React.useEffect(() => {
      let incomesPerDay = [];
     let expensesPerDay = [];
        
        labels.forEach(day => {
            let incAccAmount = 0;
            let expAccAmount = 0;
            entries && entries.forEach((entry) => {
              const entryDay = new Date(entry.date).getDate();
                const entryMonth = new Date(entry.date).getMonth() + 1;
              if (day == entryDay && (today.getMonth() + 1) === entryMonth) {
                if (entry.type === "income") {
                  incAccAmount += entry.amount;
                } else {
                  expAccAmount += entry.amount;
                }
              }
            });
            incomesPerDay.push(incAccAmount);
            expensesPerDay.push(expAccAmount);
        })
      setIncomesData(incomesPerDay);
      setExpensesData(expensesPerDay);
    }, [entries]);

    const data = {
      labels,
      // Array.from({length: new Date().getDate()}, (_, i) => i + 1)
      datasets: [
        {
          label: "# Of Votes",
          data: incomesData,
          borderColor: "rgb(255, 99, 132)",
          backgroundColor: "rgba(255, 99, 132, 0.5)",
          yAxisID: "y",
        },
        {
            label: "# Of Votes",
          data: expensesData,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgba(53, 162, 235, 0.5)",
          yAxisID: "y1",
        },
      ],
    };
  return (
     <Box
      sx={{
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
        marginBottom: "2rem",
        boxShadow:
          "0px 2px 8px 4px #dedcdc, 1px 1px 4px 0px #e9e9e9, -3px 2px 4px 0px #e9e9e9",
      }}
    >
      <Box
        sx={{
          padding: "10px",
          backgroundColor: "#ececec",
          color: "#7d7d7d",
          fontSize: ".95rem",
          textTransform: "capitalize",
          fontWeight: 600,
        }}
      >
        Incomes & Expenses
        </Box>
        <Box sx={{ p: 2 }}>          
          <Line options={options} data={data} />
      </Box>
    </Box>
  )
}

export default StaticIncExp