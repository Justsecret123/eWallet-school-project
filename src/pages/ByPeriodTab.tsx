import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useRef, useState } from 'react';
import { Chart } from "react-google-charts";
import { useHistory } from 'react-router';
import { isRegExp } from 'util';
import './charts.css';


const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

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

const ByPeriodTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([0]);
  const [monthCharts, setMonthCharts] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(true);

  var routerHistory:any = useHistory();

  useIonViewDidEnter(async()=>{
    await getExpenseListFromDB();
  });

  useEffect(()=>{
    if(JSON.stringify(expenseList)!==JSON.stringify([0])){
      setTrigger(false);
    }
  },[expenseList]);

  useEffect(()=>{
  },[trigger]);


  const getExpenseListFromDB = async() => {
    
    const val:any = await db.get("expenses");
    if(val!==null){
        await getTotalExpensesByMonth(val);
      }else{
        setExpenseList([]);
      }
  };

  const getTotalExpensesByMonth = async(expenses:any) => {
    let newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    expenses.map((expense:any)=>{
      let month:any = expense.date.split("/")[0];
      newTotals[month] += expense.amount;
    });
    let data:any = [["Month","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([monthNames[key],value, monthColors[key], value]);
    }
    setMonthCharts(data.slice(0,13));
    setExpenseList(expenses);
    console.log(data.slice(0,13));
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
          <h1> Stats by month  </h1>
            <Chart
              width={"100%"}
              height={250}
              chartType="ColumnChart"
              loader={<div>Loading Chart</div>}
              data = {monthCharts}
              options = {monthOptions}
            />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ByPeriodTab;