import { useEffect, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from 'react-router';
import './expensesHist.css';
import { IonContent, IonHeader, IonLabel, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';


const store = new Storage(); 

var database:any = null;

store.create().then(function(result){
  database = result;
});

const SalaryHistTab: React.FC = () => {


    const[db, setDb] = useState<Database | null>(database);

    const routerHistory = useHistory();
    
    const redirectToAdd = () => {
        routerHistory.push("/tab1");
    }


    return(
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Salary history</IonTitle>
            </IonToolbar>
            <IonSegment mode="ios">
                <IonSegmentButton disabled={true}>
                    <IonLabel>History</IonLabel>
                </IonSegmentButton>                
                <IonSegmentButton onClick={()=> redirectToAdd()}>
                    <IonLabel>Add a salary</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonHeader>

      <IonContent fullscreen>
            <IonHeader collapse="condense">
                <IonToolbar>
                    <IonTitle size="large">Salary: history</IonTitle>
                </IonToolbar>
            </IonHeader>
      </IonContent>
    </IonPage>
    )
}

export default SalaryHistTab;