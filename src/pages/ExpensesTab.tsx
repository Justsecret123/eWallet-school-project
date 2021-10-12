import { IonContent, IonDatetime, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { addCircle } from "ionicons/icons";
import { useState } from 'react';
import './expenses.css';

const today = new Date();

const ExpensesTab: React.FC = () => {

  const [balance, setBalance] = useState<number>();
  const [expenseList, setExpenseList] = useState<any>([]);
  const [amount, setAmount] = useState<number>(0);
  const [date, setDate] = useState<Date>();
  const [category, setCategory] = useState<string>();
  const [keywords, setKeywords] = useState<any>();

  const addExpense = () => {
    if(amount>0 && category!==""){
      console.log(expenseList);
      let newExpense:any = {"amount": amount, "date": date, "category": category, "keywords": keywords};
      let newExpenseList:any = [...expenseList];
      newExpenseList.push(newExpense);
      setExpenseList(newExpenseList);

      console.log(newExpenseList);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Manage your expenses</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Expenses manager</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="main-app">

          <IonItem>
            <IonLabel position="stacked" className="labels">Amount</IonLabel>
            <IonInput type="number" placeholder="Value..." onIonChange={e => setAmount(parseFloat(e.detail.value!))} required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Date</IonLabel>
            <IonDatetime placeholder={today.toLocaleDateString()} onIonChange={e => setDate(new Date(e.detail.value!))}></IonDatetime>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Category</IonLabel>
            <IonSelect placeholder="Select a category" onIonChange={e => setCategory(e.detail.value!)}>
              <IonSelectOption value="Housing">Housing</IonSelectOption>
              <IonSelectOption value="Food">Food</IonSelectOption>
              <IonSelectOption value="Clothes">Clothes</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Keywords</IonLabel>
            <IonInput placeholder="Keyword, Keyword..." onIonChange={e => setKeywords(e.detail.value!)} spellcheck={true} autoCorrect="on"></IonInput>
          </IonItem>

          <IonButton expand="block" className="custom-button" mode="ios" onClick={e => addExpense() }> 
            ADD <IonIcon icon={addCircle}></IonIcon>
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default ExpensesTab;
