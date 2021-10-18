import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState } from 'react';
import './charts.css';

const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

const initialTotals:{} = {
  "Housing":0, 
  "Food":0, 
  "Bills":0, 
  "Clothes":0, 
  "Extra":0
};

const ChartsTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);

  const [history, setHistory] = useState<any>([]);
  
  const [expenseList, setExpenseList] = useState<any>([]);
  const [totalsByCategory, setTotalsByCategory] = useState<{}>(initialTotals);

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
    console.log("Totals by category: ", newTotals);
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
      </IonContent>
    </IonPage>
  );
};

export default ChartsTab;
