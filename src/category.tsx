const categoryColors:any = {
    "Housing": "#3dc2ff",
    "Food": "#3dc2ff", 
    "Bills": "#2dd36f", 
    "Clothes": "#ffc409",
    "Extra": "#eb445a"
  }
  
const categoryOptions:{} = {
    title: "",
    titleTextStyle: {
      color: "white"
    },
    hAxis: {
      title: "Category", 
      titleTextStyle: {
        color: "white"
      },
      textStyle: {
        color: "white"
      },
      gridlines : {
        color: "transparent"
        }
    }, 
    vAxis: {
      minValue: 0, 
      textStyle: {
        color: "white"
      }
    }, 
    backgroundColor: "transparent", 
    chartArea: {
      textStyle: {
        color: "white"
      }, 
      width: "75%"
    }, 
    legend: {position: "none"}
};

export { categoryColors, categoryOptions };