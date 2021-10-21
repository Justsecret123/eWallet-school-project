import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar, useIonViewWillEnter } from '@ionic/react';
import { IonDatetime } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import './salary.css';
import { useHistory } from 'react-router';

const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
});

const today = new Date();

const SalaryTab: React.FC = () => {

  const [salaryList, setSalaryList] = useState<any>([]);  
  const [balance, setBalance] = useState<number>(Infinity);
  const [currency, setCurrency] = useState<string>("");

  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  const [trigger, setTrigger] = useState<boolean>(true);

  const [db, setDb] = useState<Database | null>(database);

  const routerHistory = useHistory();

  useIonViewWillEnter(()=>{
    getSalaryListAndBalance();
  });
  
  useEffect(()=>{
    getSalaryListAndBalance();
  },[trigger]);

  const getSalaryListAndBalance = async() => {
    const salaries = await db.get("salaries");
    const expenses = await db.get("expenses");
    const current_currency =  await db.get("currency");
    if(salaries!==null && expenses!==null){
      setSalaryList(salaries);
      let cmSalaries = getCurrentMonthSalaries(salaries);
      let cmExpenses = getCurrentMonthExpenses(expenses);
      console.log("Balance: ", cmSalaries-cmExpenses);
      setBalance(cmSalaries-cmExpenses);
      setCurrency(current_currency==null ? "":current_currency);
    }else{
      setSalaryList([]);
    }
}

  const getCurrentMonthSalaries = (salaries:any) => {
    let total:number = 0;
    let current_month:number = today.getMonth()+1;
    let current_day:number = today.getDate();
    let current_year:number = today.getFullYear();
    salaries.map((salary:any)=>{
      let month:number = parseInt(salary.date.split("/")[0]);
      let day:number = parseInt(salary.date.split("/")[1]);
      let year:number = parseInt(salary.date.split("/")[2]);
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
  
  const addSalaryToDB = (newSalaryList:any) => {
    db.set("salaries",newSalaryList);
    setTrigger(!trigger);
  }

  const addSalary = () => {

    if(amount>0 && typeof(date)!=="undefined"){
      const newSalary:any = {"salary": amount, "date": date.toLocaleDateString("en")};
      const newSalaryList:any = [...salaryList];
      newSalaryList.push(newSalary);

      setSalaryList(newSalaryList);
      addSalaryToDB(newSalaryList);
      
      document.getElementById("amount")?.setAttribute("value","");
      document.getElementById("date")?.setAttribute("value","");

      setTrigger(!trigger);

    }

  }

  const redirectToHistory = () => {
    routerHistory.push("/salaryHist",{from: "salary"});
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Salary management</IonTitle>
        </IonToolbar>
        <IonSegment scrollable={true} mode="ios">
            <IonSegmentButton disabled={true}>
              <IonLabel>Add a salary</IonLabel>
            </IonSegmentButton>
            <IonSegmentButton onClick={()=> redirectToHistory()}>
              <IonLabel>History</IonLabel>
            </IonSegmentButton>
        </IonSegment>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Salary management</IonTitle>
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
            <IonInput id="amount" mode="ios" type="number" placeholder="Amount..." onIonChange={e => setAmount(parseFloat(e.detail.value!))} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Payday</IonLabel>
            <IonDatetime id="date" mode="ios" placeholder={today.toLocaleDateString("en")} onIonChange={e => setDate(new Date(e.detail.value!))}></IonDatetime>
          </IonItem>
          <IonButton expand="block" shape="round" className="custom-button" mode="ios" onClick={() => addSalary()}> Add salary <IonIcon icon={addCircle}></IonIcon> </IonButton>

        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default SalaryTab;
