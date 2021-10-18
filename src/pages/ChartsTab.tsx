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

const colors:any = {
  "Housing": "#3dc2ff",
  "Food": "#3dc2ff", 
  "Bills": "#2dd36f", 
  "Clothes": "#ffc409",
  "Extra": "#eb445a"
}

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
  charArea: {
    textStyle: {
      color: "white"
    }
  }, 
  legend: {position: "none"}
};

const ChartsTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);
  
  const [expenseList, setExpenseList] = useState<any>([]);
  const [totalsByCategory, setTotalsByCategory] = useState<{}>(initialTotals);
  const [categoryCharts, setCategoryCharts] = useState<any>([]);

  const [trigger, setTrigger] = useState<boolean>(true);

  useEffect(()=>{
    getExpenseListFromDB();
  },[trigger]);

  useIonViewDidEnter(()=>{
    getExpenseListFromDB();
  })

  const getExpenseListFromDB = async() => {
    const val = await db.get("expenses");
    if(val!==null){
      setExpenseList(val);
      getTotalExpensesByCategory(val);
      getTotalExpensesByMonth(val);
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
      data.push([key,value, colors[key], value]);
    }
    console.log(data);
    setCategoryCharts(data);
  };

  const getTotalExpensesByMonth = (expenses:any) => {
    const newTotals:any = {"0":0, "1":0, "2":0, "3":0, "4":0, "5": 0, "6": 0, "7": 0, "8": 0, "9": 0, "10": 0, "11": 0};
    expenses.map((expense:any)=>{
      let date:Date = new Date(expense.date);
      console.log("Month: ", date.getMonth());
    });
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
          <IonItem>
            <Chart
              width={"100%"}
              height={300}
              chartType="BarChart"
              loader={<div>Loading Chart</div>}
              data = {categoryCharts}
              options = {categoryOptions}

            >
            </Chart>
          </IonItem>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ChartsTab;
