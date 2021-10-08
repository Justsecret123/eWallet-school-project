import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react';
import { IonDatetime } from '@ionic/react';
import { addCircle } from 'ionicons/icons';
import './salary.css';

const date = new Date();

const SalaryTab: React.FC = () => {
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
            <IonLabel position="stacked">Amount</IonLabel>
            <IonInput type="number" placeholder="Amount..." required></IonInput>
          </IonItem>
          <IonItem>
            <IonLabel position="stacked">Payday</IonLabel>
            <IonDatetime value={date.toString()}></IonDatetime>
          </IonItem>
          <IonButton expand="block"> Add salary <IonIcon icon={addCircle}></IonIcon> </IonButton>

        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default SalaryTab;
