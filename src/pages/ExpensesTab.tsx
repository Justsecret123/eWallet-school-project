import { IonContent, IonDatetime, IonHeader, IonIcon, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { addCircle } from "ionicons/icons";
import { useEffect, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from "react-router";
import './expenses.css';

const store = new Storage(); 

var database:any = null;

store.create().then(function(result){
  database = result;
});

const today = new Date();

const ExpensesTab: React.FC = () => {

  const [expenseList, setExpenseList] = useState<any>([]);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [balance, setBalance] = useState<number>(Infinity);
  const [currency, setCurrency] = useState<string>("");
  const [category, setCategory] = useState<string>();
  const [keywords, setKeywords] = useState<any>();
  const [trigger, setTrigger] = useState<boolean>(true);

  const[db, setDb] = useState<Database | null>(database);

  const routerHistory = useHistory();

  useIonViewWillEnter(()=>{
    getExpenseListAndBalance();
  });

  useEffect(()=>{
    getExpenseListAndBalance();
  },[trigger]);

  const getExpenseListAndBalance = async() => {

    const expenses = await db.get("expenses");
    const salaries = await db.get("salaries");
    const current_currency = await db.get("currency");
    if(expenses!==null && salaries!==null){
      setExpenseList(salaries);
      let cmSalaries = getCurrentMonthSalaries(salaries);
      let cmExpenses = getCurrentMonthExpenses(expenses);
      console.log("Balance: ", cmSalaries-cmExpenses);
      setBalance(cmSalaries-cmExpenses);
      setCurrency(current_currency==null ? "":current_currency);
    }
    
  }

  const getCurrentMonthSalaries = (salaries:any) => {
    let total:number = 0;
    let current_month:number = today.getMonth()+1;
    let current_day:number = today.getDate();
    let current_year:number = today.getFullYear();
    salaries.map((salary:any)=>{
      let date:any = salary.date.split("/");
      let month:number = parseInt(date[0]);
      let day:number = parseInt(date[1]);
      let year:number = parseInt(date[2]);
      if(year===current_year && month===current_month && day<=current_day){
        total+=salary.salary;
      }
    });
    console.log("Salaries: ", total);
    return total;
  };

  const getCurrentMonthExpenses = (expenses:any) => {
    let total:number = 0;
    let current_month:number = today.getMonth()+1;
    let current_day:number = today.getDate();
    let current_year:number = today.getFullYear();
    expenses.map((expense:any)=>{
      let date:any = expense.date.split("/");
      let month:number = parseInt(date[0]);
      let day:number = parseInt(date[1]);
      let year:number = parseInt(date[2]);
      if(year===current_year && month===current_month && day<=current_day){
        total+=expense.amount;
      }
    });
    console.log("Expenses: ", total); 
    return total;
  };

  const getExpenseListFromDB = async() => {
    const val = await db.get("expenses");
    if(val!==null){
      setExpenseList(val);
    }else{
      setExpenseList([]);
    }
  }

  const addExpenseToDB = (newExpenseList:any) => {
    db.set("expenses",newExpenseList);
    setTrigger(!trigger);
  }

  const addExpense = () => {
    if(amount>0 && category!==""){
      let newExpense:any = {"amount": amount, "date": date?.toLocaleDateString("en"), "category": category, "keywords": keywords};
      let newExpenseList:any = [...expenseList];

      newExpenseList.push(newExpense);
      
      setExpenseList(newExpenseList);
      addExpenseToDB(newExpenseList);

    }
  }

  const redirectToHistory = () => {
    routerHistory.push("/expensesHist", {from: "expensesHist"});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Expenses manager</IonTitle>
        </IonToolbar>
        <IonSegment scrollable={true} mode="ios">
            <IonSegmentButton disabled={true}>
              <IonLabel>Add an expense</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=> redirectToHistory()}>
              <IonLabel>History</IonLabel>
            </IonSegmentButton>
        </IonSegment>
      </IonHeader>

      <IonContent fullscreen>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Expenses manager</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="main-app">
          <IonItem lines="none">
            <IonText id="balance" color={balance <0 ? "danger": "secondary"}> 
              {
                balance===Infinity ? 
                "": 
                `Current balance: ${balance} ${currency}`
              } 
            </IonText>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Amount</IonLabel>
            <IonInput type="number" placeholder="Value..." onIonChange={e => setAmount(parseFloat(e.detail.value!))} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Date</IonLabel>
            <IonDatetime mode="ios" placeholder={today.toLocaleDateString("en")} onIonChange={e => setDate(new Date(e.detail.value!))}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Category</IonLabel>
            <IonSelect mode="ios" placeholder="Select a category" onIonChange={e => setCategory(e.detail.value!)}>
              <IonSelectOption value="Housing">Housing</IonSelectOption>
              <IonSelectOption value="Food">Food</IonSelectOption>
              <IonSelectOption value="Bills">Bills</IonSelectOption>
              <IonSelectOption value="Clothes">Clothes</IonSelectOption>
              <IonSelectOption value="Extra">Extra</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Keywords</IonLabel>
            <IonInput placeholder="Keyword, Keyword..." onIonChange={e => setKeywords(e.detail.value!)}></IonInput>
          </IonItem>

          <IonButton expand="block" className="custom-button" shape="round" mode="ios" onClick={e => addExpense() }> 
            Add <IonIcon icon={addCircle}></IonIcon>
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default ExpensesTab;
