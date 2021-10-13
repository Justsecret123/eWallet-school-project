import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { IonDatetime } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import { useEffect, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import './salary.css';

const store = new Storage();
var database:any = null; 

store.create().then(function(result){
  database = result;
  console.log("Database: ", database);
})

const today = new Date();

const SalaryTab: React.FC = () => {

  const [balance, setBalance] = useState<number>(5000);
  const [salaryList, setSalaryList] = useState<any>([]);

  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  const [db, setDb] = useState<Database | null>(database);

  useEffect(()=>{
    getSalaryListFromDB();
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
  }

  const addSalary = () => {

    if(amount>0 && typeof(date)!=="undefined"){
      const newSalary:any = {"salary": amount, "date": date.toLocaleDateString()};
      const newSalaryList:any = [...salaryList];
      newSalaryList.push(newSalary);

      setSalaryList(newSalaryList);
      addSalaryToDB(newSalaryList);

    }
    
  };




  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Salary management</IonTitle>
        </IonToolbar>
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
            <IonInput type="number" placeholder="Amount..." onIonChange={e => setAmount(parseFloat(e.detail.value!))} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Payday</IonLabel>
            <IonDatetime placeholder={today.toLocaleDateString()} onIonChange={e => setDate(new Date(e.detail.value!))}></IonDatetime>
          </IonItem>
          <IonButton expand="block" shape="round" className="custom-button" mode="ios" onClick={e => addSalary()}> Add salary <IonIcon icon={addCircle}></IonIcon> </IonButton>

        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default SalaryTab;
