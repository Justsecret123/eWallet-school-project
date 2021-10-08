import { IonContent, IonHeader, IonIcon, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonInput, IonItem, IonLabel } from '@ionic/react';
import { IonSelect, IonSelectOption, IonButton } from '@ionic/react';
import { addCircle } from "ionicons/icons";
import './expenses.css';

const ExpensesTab: React.FC = () => {
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
            <IonTitle size="large">Expenses</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="main-app">

          <IonItem>
            <IonLabel position="stacked" className="labels">Amount</IonLabel>
            <IonInput type="number" placeholder="Value..." required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Category</IonLabel>
            <IonSelect placeholder="Select a category">
              <IonSelectOption value="Housing">Housing</IonSelectOption>
              <IonSelectOption value="Food">Food</IonSelectOption>
              <IonSelectOption value="Clothes">Clothes</IonSelectOption>
            </IonSelect>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked" className="labels">Keywords</IonLabel>
            <IonInput placeholder="Keyword, Keyword..." spellcheck={true} autoCorrect="on"></IonInput>
          </IonItem>

          <IonButton expand="block" className="custom-button"> 
            Add
            <IonIcon icon={addCircle}></IonIcon>
          </IonButton>

        </div>

      </IonContent>
    </IonPage>
  );
};

export default ExpensesTab;
