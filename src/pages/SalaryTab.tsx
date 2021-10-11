import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from '@ionic/react';
import { IonDatetime } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import { useState } from 'react';
import './salary.css';

const today = new Date();

const SalaryTab: React.FC = () => {

  const [balance, setBalance] = useState<number>(5000);
  const [salaryList, setSalaryList] = useState<any>([]);

  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();

  const addSalary = () => {

    if(amount>0 && typeof(date)!=="undefined"){
      const newSalary:any = {"salary": amount, "date": date.toLocaleDateString()};
      const newSalaryList:any = [...salaryList];
      newSalaryList.push(newSalary);
      setSalaryList(newSalaryList);

      console.log("Salary list: ", newSalaryList);
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
          <IonButton expand="block" onClick={e => addSalary()}> Add salary <IonIcon icon={addCircle}></IonIcon> </IonButton>

        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default SalaryTab;
