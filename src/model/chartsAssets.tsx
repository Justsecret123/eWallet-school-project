const categoryColors:any = {
    "Housing": "#3dc2ff",
    "Food": "#3dc2ff", 
    "Bills": "#2dd36f", 
    "Clothes": "#ffc409",
    "Extra": "#eb445a"
}

const monthColors:any = {
    "0": "#3dc2ff",
    "1": "#3dc2ff", 
    "2": "#2dd36f", 
    "3": "#ffc409",
    "4": "#eb445a", 
    "5": "#92949c", 
    "6": "#f4f5f8", 
    "7": "#5260ff", 
    "8": "#3dc2ff",
    "9": "#3dc2ff",
    "10": "#2dd36f",
    "11": "#ffc409"
}

const monthNames:any = {
    "0": "Jan",
    "1": "Fev", 
    "2": "Mar", 
    "3": "Apr",
    "4": "May", 
    "5": "Jun", 
    "6": "Jul", 
    "7": "Aug", 
    "8": "Sep",
    "9": "Oct",
    "10": "Nov",
    "11": "Dec"
};

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
  
  const monthOptions:{} = {
    title: "",
    titleTextStyle: {
      color: "white"
    },
    hAxis: {
      slantedText:true,
      slantedTextAngle:45,
      title: "Month", 
      titleTextStyle: {
        color: "white"
      },
      textStyle: {
        color: "white"
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
      width: "80%"
    }, 
    legend: {position: "none"}
};
  
  const salaryOptions:{} = {
    title: "",
    colors: ["#3dc2ff"],
    titleTextStyle: {
      color: "white"
    },
    hAxis: {
      slantedText:true,
      slantedTextAngle:45,
      title: "Month", 
      titleTextStyle: {
        color: "white"
      },
      textStyle: {
        color: "white"
      }, 
      gridlines: {
        interval: 0,
        color: "none"
      }
    }, 
    vAxis: {
      minValue: 0, 
      textStyle: {
        color: "white"
      }, 
      gridlines: {
        interval: 0,
        color: "none"
      }
    }, 
    backgroundColor: "transparent", 
    chartArea: {
      textStyle: {
        color: "white"
      }, 
      width: "80%"
    }, 
    annotations: {
      textStyle: {
        color: "white"
      }
    },
    legend: {position: "none"}
};

export default {categoryColors, categoryOptions, monthOptions, salaryOptions, monthColors, monthNames};

