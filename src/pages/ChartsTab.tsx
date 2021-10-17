import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { Database, Storage } from '@ionic/storage';
import { useEffect, useState, useCallback } from 'react';
import { useHistory } from 'react-router';
import './charts.css';

const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});


const ChartsTab: React.FC = () => {
  
  const [db, setDb] = useState<Database | null>(database);

  const routerHistory = useHistory();
  const [history, setHistory] = useState<any>([]);
  
  const [expenseList, setExpenseList] = useState<any>([]);
  const [totalsByCategory, setTotalsByCategory] = useState<any>({"Housing":0, "Food":0, "Bills":0, "Clothes":0, "Extra":0});

  const [trigger, setTrigger] = useState<boolean>(true);

  useEffect(()=>{
    getExpenseListFromDB();
  },[trigger]);

  useIonViewDidEnter(()=>{
    setTrigger(!trigger);
  })




  const getExpenseListFromDB = async() => {
    const val = await db.get("expenses");
    if(val!==null){
      setExpenseList(val);
      getTotalExpensesByCategory(val);
      setHistory(routerHistory);
    }
  };

  const getTotalExpensesByCategory = async(expenses:any) => {
    console.log("Expenses: ", expenses);
    var newTotals:any = totalsByCategory;
    expenses.map((expense:any)=>{
      let category = expense.category;
      newTotals[category] += expense.amount;
    });
    setTotalsByCategory(newTotals);
    console.log("Totals by category: ", newTotals);
  };



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
