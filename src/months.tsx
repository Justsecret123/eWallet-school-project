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

const monthColors:any = {
    "0": "#3dc2ff",
    "1": "#2dd36f", 
    "2": "#ffc409", 
    "3": "#eb445a",
    "4": "#92949c", 
    "5": "#f4f5f8", 
    "6": "#5260ff", 
    "7": "#3dc2ff", 
    "8": "#2dd36f",
    "9": "#ffc409",
    "10": "#eb445a",
    "11": "#92949c"
};

const monthOptions:any = {
    title: "",
    titleTextStyle: {
      color: "white"
    },
    hAxis: {
      slantedText:true,
      slantedTextAngle:35,
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
      }, 
      gridlines : {
        color: "transparent"
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

export {monthNames, monthColors, monthOptions};



