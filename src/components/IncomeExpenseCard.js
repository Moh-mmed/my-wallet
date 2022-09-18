import React from 'react'
import { Box, List, ListItem, ListItemIcon, ListItemText } from "@mui/material";
import LinearProgress from "@mui/material/LinearProgress";
import * as icons from "@mui/icons-material";
import { CategoriesContext } from "../context/CategoriesContext";
import { EntriesContext } from '../context/EntriesContext';

function useIcons(iconName) {
  const Icon = icons[iconName];
  return Icon
}

function getCumulativeAmount(category, filteredEntries) {
  const sameCategories = filteredEntries && filteredEntries.filter(
    (entry) => {
      let entryMonth = new Date(entry.date).getMonth() + 1 
      let currMonth = new Date().getMonth() + 1
      let entryCategory = entry.category.toLowerCase()
      let categoryName = category.name.toLowerCase()
      
      if (entryCategory === categoryName && entryMonth === currMonth ) return entry
    }
  );
  if (sameCategories.length == 0) {
    return 0
  }
  return sameCategories.reduce((total, cat) => total + cat.amount, 0);
} 

const IncomeExpenseCard = ({ type, title }) => {

  const [sameCategoryEntries, setSameCategoryEntries] = React.useState([]);
  const { chosenCategories } = React.useContext(CategoriesContext);
  const { entries } = React.useContext(EntriesContext);
  
  React.useEffect(() => {
    if (entries) {
      
      const filteredCategories = entries.filter(
        (entry) => entry.type.toLowerCase() === type.toLowerCase()
      );
      setSameCategoryEntries(filteredCategories);
    }
  }, [entries]);

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
         }}
       >
         {title}
       </Box>
       <List dense>
         {chosenCategories.map((category) => {
           const Icon = useIcons(category.icon);
           const cumulativeAmount = getCumulativeAmount(
             category,
             sameCategoryEntries
           );
           if (category.type === type.toLowerCase()) {
             return (
               <ListItem
                 key={category.id}
                 sx={{
                   display: "flex",
                   alignItems: "flex-start",
                   margin: "0.7rem 0",
                 }}
               >
                 <ListItemIcon>
                   <Icon
                     sx={{
                       color:
                         cumulativeAmount > category.budget &&
                         type === "expense"
                           ? "#B00020"
                           : "#000000c4",
                     }}
                   />
                 </ListItemIcon>
                 <Box
                   sx={{
                     flexGrow: 1,
                     borderBottom:
                       cumulativeAmount === 0 && "2px solid #dcdcdc",
                   }}
                 >
                   <ListItemText
                     primary={category.name}
                     secondary={`${cumulativeAmount}/${category.budget}`}
                     sx={{
                       display: "flex",
                       justifyContent: "space-between",
                       margin: 0,
                       height: "30px",
                       textTransform: "capitalize",
                       "& .MuiTypography-root": {
                         color:
                           cumulativeAmount > category.budget &&
                           type === "expense"
                             ? "#B00020"
                             : "#000000c4",
                         fontSize: ".9rem",
                       },
                     }}
                   />
                   {cumulativeAmount > 0 && (
                     <LinearProgress
                       variant="determinate"
                       value={
                         cumulativeAmount <= category.budget
                           ? (cumulativeAmount * 100) / category.budget
                           : 100
                       }
                       sx={{
                         borderRadius: 5,
                         "&": {
                           backgroundColor:
                             type === "income" ? "#6200ee3d" : "#03c49469",
                         },
                         ".MuiLinearProgress-bar": {
                           backgroundColor:
                             type === "income"
                               ? "#6200EE"
                               : cumulativeAmount <= category.budget
                               ? "#009561"
                               : "#B00020",
                         },
                       }}
                     />
                   )}
                 </Box>
               </ListItem>
             );
           }
         })}
       </List>
     </Box>
   );
}

export default IncomeExpenseCard