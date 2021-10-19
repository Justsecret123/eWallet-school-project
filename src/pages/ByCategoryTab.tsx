import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useHistory } from 'react-router';
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

const ByCategoryTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([0]);
  const [categoryCharts, setCategoryCharts] = useState<any>([]);
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

  useEffect(()=>{
  },[trigger]);


  const getExpenseListFromDB = () => {
    
    db.get("expenses")
    .then((val:any)=>{
      if(val!==null){
        setExpenseList(val);
        getTotalExpensesByCategory(val);
      }else{
        setExpenseList([]);
      }
    });

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
    let data:any = [["Category","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([key,value, categoryColors[key], value]);
    }
    setCategoryCharts(data);
  };

  const redirectToPeriod = () => {
    routerHistory.push("/tab5",{from: "byCategory"});
}

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Charts</IonTitle>
        </IonToolbar>
        <IonSegment scrollable={true} mode="ios">
            <IonSegmentButton disabled={true}>
              <IonLabel>By category</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=> redirectToPeriod()}>
              <IonLabel>By Period</IonLabel>
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
          <h1>Expenses by category</h1>
            <Chart
              width={"100%"}
              height={250}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {categoryCharts}
              options = {categoryOptions}
            />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ByCategoryTab;