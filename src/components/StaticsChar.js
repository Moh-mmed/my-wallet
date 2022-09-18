import React from 'react'
import { Box } from '@mui/material'
import { CategoriesContext } from "../context/CategoriesContext";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  indexAxis: 'y',
  elements: {
    bar: {
      borderWidth: 1,
    },
  },
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
  },
};



const StaticsChar = ({type}) => {
    const {chosenCategories} = React.useContext(CategoriesContext)
    const [labels, setLabels] = React.useState([])
    const [barData, setBarData] = React.useState([])


    React.useEffect(() => {
        let categoriesNames = []
        let categoriesBudgets = []
        chosenCategories && chosenCategories.forEach((cat) => {
        if (cat.type === type) {
          categoriesNames.push(cat.name);
          categoriesBudgets.push(cat.budget);
        }
        });
        setLabels(categoriesNames);
        setBarData(categoriesBudgets);
    }, [chosenCategories]);

    const borderColor =
    type === "income" ? "rgb(199, 255, 211)" : "rgb(255, 99, 132)";
    const backgroundColor =
    type === "income" ? "rgb(199, 255, 211, 0.5)" : "rgb(255, 99, 132, 0.5)";

    const data = {
      labels,
      datasets: [
        {
          label: "Amount",
          data: barData,
          borderColor: borderColor,
          backgroundColor: backgroundColor,
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
        {type}
      </Box>
      <Box sx={{ p:2 }}>
        <Bar options={options} data={data} />
      </Box>
    </Box>
  );
}

export default StaticsChar;