import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillEnter } from '@ionic/react';
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
})

const today = new Date();

const SalaryTab: React.FC = () => {

  const [salaryList, setSalaryList] = useState<any>([]);

  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  const [trigger, setTrigger] = useState<boolean>(true);

  const [db, setDb] = useState<Database | null>(database);

  const routerHistory = useHistory();

  useEffect(()=>{
      getSalaryListFromDB();
  },[trigger]);

  useIonViewWillEnter(()=>{
    setTrigger(!trigger);
  });

  const getSalaryListFromDB = async() => {
      const val = await db.get("salaries");
      if(val!==null){
        setSalaryList(val);
      }else{
        setSalaryList([]);
      }
  }
  

  const addSalaryToDB = (newSalaryList:any) => {
    db.set("salaries",newSalaryList);
    setTrigger(!trigger);
  }

  const addSalary = () => {

    if(amount>0 && typeof(date)!=="undefined"){
      const newSalary:any = {"salary": amount, "date": date.toLocaleDateString()};
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

          <IonItem>
            <IonLabel position="stacked" className="labels">Amount</IonLabel>
            <IonInput id="amount" mode="ios" type="number" placeholder="Amount..." onIonChange={e => setAmount(parseFloat(e.detail.value!))} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Payday</IonLabel>
            <IonDatetime id="date" mode="ios" placeholder={today.toLocaleDateString()} onIonChange={e => setDate(new Date(e.detail.value!))}></IonDatetime>
          </IonItem>
          <IonButton expand="block" shape="round" className="custom-button" mode="ios" onClick={() => addSalary()}> Add salary <IonIcon icon={addCircle}></IonIcon> </IonButton>

        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default SalaryTab;
