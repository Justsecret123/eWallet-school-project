import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { monthColors, monthNames, monthOptions } from '../months';
import { useHistory } from 'react-router';
import './charts.css';


const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

const ByPeriodTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([0]);
  const [monthCharts, setMonthCharts] = useState<any>([]);
  const [salaryMonthCharts, setSalaryMonthCharts] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(true);

  var routerHistory:any = useHistory();

  useIonViewDidEnter(()=>{
    getExpenseListFromDB();
  });

  useEffect(()=>{
    if(JSON.stringify(expenseList)!==JSON.stringify([0])){
      setTrigger(false);
    }
  },[expenseList]);

  const getExpenseListFromDB = async() => {
    
    const expenses:any = await db.get("expenses");
    const salaries = await db.get("salaries");

    if(expenses!==null && salaries!==null){
      setExpenseList(expenses);
      getTotalExpensesByMonth(expenses);
      getTotalSalaryByMonth(salaries);
    }else{
      setExpenseList([]);
    }

  };

  const getTotalExpensesByMonth = (expenses:any) => {
    let newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    expenses.map((expense:any)=>{
      let month:any = expense.date.split("/")[0];
      newTotals[month-1] += expense.amount;
    });
    let data:any = [["Month","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([monthNames[key],value, monthColors[key], value]);
    }
    setMonthCharts(data.slice(0,13));
    setExpenseList(expenses);
  }

  const getTotalSalaryByMonth = (salaries:any) => {
    let newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    salaries.map((salary:any)=>{
      let month:any = salary.date.split("/")[0];
      newTotals[month-1] += salary.salary;
    });
    let data:any = [["Month","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([monthNames[key],value, monthColors[key], value]);
    }
    setSalaryMonthCharts(data.slice(0,13));
  }

  const redirectToCategory = () => {
    routerHistory.push("/tab3",{from: "byPeriod"});
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Charts</IonTitle>
        </IonToolbar>
        <IonSegment scrollable={true} mode="ios">
            <IonSegmentButton disabled={true}>
              <IonLabel>By Period</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=> redirectToCategory()}>
              <IonLabel>By category</IonLabel>
            </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Charts</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="main-app">
          <h1> Expenses by month  </h1>
            <Chart
              width={"100%"}
              height={250}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data = {monthCharts}
              options = {monthOptions}
            />
            <h1> Salary by month </h1>
            <Chart 
                width={"100%"}
                height={250}
                chartType="LineChart"
                loader={<div>Loading Chart</div>}
                data = {salaryMonthCharts}
                options = {monthOptions}
            />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ByPeriodTab;