import { IonCard, IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import { Chart } from "react-google-charts";
import { useHistory } from 'react-router';
import { categoryColors, categoryOptions } from '../category';
import './charts.css';


const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

var today:Date = new Date();

const ByCategoryTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([0]);
  const [categoryCharts, setCategoryCharts] = useState<any>([]);
  const [currentYearCharts, setCurrentYearCharts] = useState<any>([]);
  const [currentMonthCharts, setCurrentMonthCharts] = useState<any>([]);
  const [bestCategory, setBestCategory] = useState<any>([]);
  const [trigger, setTrigger] = useState<boolean>(true);

  const [selectedOption, setSelectedOption] = useState<number>(1);

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
    
    var expenses:any = await db.get("expenses");
    if(expenses!==null){
        setExpenseList(expenses);
        getTotalExpensesByCategory(expenses);
        getCurrentYearStats(expenses);
        getCurrentMonthStats(expenses);
      }else{
        setExpenseList([]);
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
    let max_value:number = 0;
    let max_category:string = "";
    expenses.map((expense:any)=>{
      let category = expense.category;
      newTotals[category] += expense.amount;
      if(expense.amount>max_value){
        max_value = expense.amount;
        max_category = expense.category;
      }
    });
    let data:any = [["Category","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([key,value, categoryColors[key], value]);
    }
    setCategoryCharts(data);
    setBestCategory({"category": max_category, "value": max_value});
  };

  const getCurrentYearStats = (expenses:any) => {
    const newTotals:any = {
      "Housing":0, 
      "Food":0, 
      "Bills":0, 
      "Clothes":0, 
      "Extra":0
    };
    let max:number = 0;
    expenses.map((expense:any)=>{
      let current_year:number = today.getFullYear();
      let category = expense.category;
      let date = expense.date.split("/");
      let year:any = date[2];
      if(year==current_year){
        newTotals[category] += expense.amount;
        max = expense.amount > max ? expense.amount:max;
      }
    }); 
    
    let data:any = [["Category","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([key,value, categoryColors[key], value]);
    }
    setCurrentYearCharts(data);
  }

  const getCurrentMonthStats = (expenses:any) => {
    const newTotals:any = {
      "Housing":0, 
      "Food":0, 
      "Bills":0, 
      "Clothes":0, 
      "Extra":0
    };
    let max:number = 0;
    expenses.map((expense:any)=>{
      let current_month:number = today.getMonth()+1;
      let category = expense.category;
      let date = expense.date.split("/");
      let month:any = date[0];
      if(month==current_month){
        newTotals[category] += expense.amount;
        max = expense.amount > max ? expense.amount:max;
      }
    }); 
    
    let data:any = [["Category","Amount", {role: "style"}, {role: "annotation"}]];
    for (const [key, value] of Object.entries(newTotals)) {
      data.push([key,value, categoryColors[key], value]);
    }
    setCurrentMonthCharts(data);
  }



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
          <IonItem id="select-period" lines="none">
            <IonSelect placeholder={"Select period..."} mode="ios" onIonChange={e=>{setSelectedOption(e.detail.value); setTrigger(!trigger);}}>
              <IonSelectOption value={1}>All-time</IonSelectOption>
              <IonSelectOption value={0}>Current year </IonSelectOption>
              <IonSelectOption value={2}>Current month </IonSelectOption>
            </IonSelect>
          </IonItem>
          <h1>Expenses by category</h1>
          { 
            selectedOption==1? 
              <Chart
              width={"100%"}
              height={250}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {categoryCharts}
              options = {categoryOptions}
              />: 
              selectedOption==0?
              <Chart
              width={"100%"}
              height={250}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {currentYearCharts}
              options = {categoryOptions}
              />: 
              <Chart
              width={"100%"}
              height={250}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {currentMonthCharts}
              options = {categoryOptions}
              />
          }
          {
            bestCategory.value !== null ? 
            (
              <IonCard mode="ios">

              </IonCard>
            )
            :
            "None"
          }
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ByCategoryTab;