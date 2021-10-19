import { IonContent, IonHeader, IonItem, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import './charts.css';


const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

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

const initialTotals:{} = {
  "Housing":0, 
  "Food":0, 
  "Bills":0, 
  "Clothes":0, 
  "Extra":0
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
    width: "80%"
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

const ChartsTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([]);
  const [salaryList, setSalaryList] = useState<any>([]);
  const [totalsByCategory, setTotalsByCategory] = useState<{}>(initialTotals);
  const [categoryCharts, setCategoryCharts] = useState<any>([]);
  const [monthCharts, setMonthCharts] = useState<any>([]);
  const [salaryCharts, setSalaryCharts] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(true);


  useEffect(()=>{
    getExpenseListFromDB();
    getSalaryListFromDB();
  },[trigger]);

  useIonViewDidEnter(()=>{
    getExpenseListFromDB();
    getSalaryListFromDB();
  })

  const getExpenseListFromDB = async() => {
    const val = await db.get("expenses");
    if(val!==null){
      setExpenseList(val);
      getTotalExpensesByCategory(val);
      getTotalExpensesByMonth(val);
    }else{
      getTotalExpensesByCategory([]);
      getTotalExpensesByMonth([]);  
    }
  };

  const getSalaryListFromDB = async() => {
    const val = await db.get("salaries");
    if(val!==null){
      setSalaryList(val);
      getTotalSalaryByMonth(val);
    }else{
      getTotalSalaryByMonth([]);
    }
  };

  const getTotalExpensesByCategory = (expenses:any) => {
    const newTotals:any = {
      "Housing":0, 
      "Food":0, 
      "Bills":0, 
      "Clothes":0, 
      "Extra":0
    };
    expenses.map((expense:any)=>{
      let category = expense.category;
      newTotals[category] += expense.amount;
    });
    setTotalsByCategory(newTotals);
    let data:any = [["Category","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([key,value, categoryColors[key], value]);
    }
    setCategoryCharts(data);
  };

  const getTotalExpensesByMonth = (expenses:any) => {
    const newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    expenses.map((expense:any, index:number)=>{
      let month:string = new Date(expense.date).getMonth().toString();
      newTotals[month] += expense.amount;
    });
    let data:any = [["Month","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([monthNames[key],value, monthColors[key], value]);
    }
    setMonthCharts(data);
  }

  const getTotalSalaryByMonth = (salaries:any) => {
    const newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    salaries.map((salary:any)=>{
      let month:string = new Date(salary.date).getMonth().toString();
      newTotals[month] += salary.salary;
    });
    let data:any = [["Month","Amount", {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([monthNames[key],value,value]);
    }
    setSalaryCharts(data);
  }


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Charts</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Charts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="main-app">
          <h1>Expenses by category</h1>
          <IonItem lines="none">
            <Chart
              width={"100%"}
              height={250}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {categoryCharts}
              options = {categoryOptions}
            >
            </Chart>
          </IonItem >
          <h1>Expenses by month</h1>
          <IonItem lines="none">
            <Chart
                width={"100%"}
                height={280}
                chartType="ColumnChart"
                loader={<div>Loading Chart</div>}
                data = {monthCharts}
                options = {monthOptions}
              >
              </Chart>
          </IonItem>
          <h1> Salary by month</h1>
          <IonItem lines="none">
            <Chart
                  width={"100%"}
                  height={200}
                  chartType="LineChart"
                  loader={<div>Loading Chart</div>}
                  data = {salaryCharts}
                  options = {salaryOptions}
                >
              </Chart>            
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChartsTab;
