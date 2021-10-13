import { IonBadge, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonSegment, IonSegmentButton, IonText, IonTitle, IonToolbar } from '@ionic/react';
import { IonItem, IonLabel } from '@ionic/react';
import { useEffect, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from 'react-router';
import './expensesHist.css';


const store = new Storage(); 

var database:any = null;

store.create().then(function(result){
  database = result;
});

const ExpensesHistTab: React.FC = () => {

    const [expenseList, setExpenseList] = useState<any>([]);
    const[db, setDb] = useState<Database | null>(database);

    const [currency, setCurrency] = useState<string>("MAD");

    const routerHistory = useHistory();

    useEffect(()=>{
        getExpenseListFromDB();
        getCurrencyFromDB();
    });
    
    const redirectToAdd = () => {
        routerHistory.push("/tab2");
    }

    const getExpenseListFromDB = async() => {
        const val = await db.get("expenses");
        if(val!==null){
          setExpenseList(val);
        }else{
          setExpenseList([]);
        }
    }

    const getCurrencyFromDB = async() => {
        const val = await db.get("currency");
        if(val!==null){
            setCurrency(val);
        }else{
            setCurrency("MAD");
        }
    }

    const setColor = (category:string) => {
      switch(category){
        case "Food": 
          return "secondary";
        case "Bills":
          return "success"; 
        case "Housing": 
          return "primary"; 
        case "Clothes":
          return "warning";
        case "Extra": 
          return "danger";
        default: 
          return "medium";
      }
    }

    return(
        <IonPage>
        <IonHeader>
            <IonToolbar>
            <IonTitle>Expenses history</IonTitle>
            </IonToolbar>
            <IonSegment mode="ios">
                <IonSegmentButton disabled={true}>
                    <IonLabel>History</IonLabel>
                </IonSegmentButton>                
                <IonSegmentButton onClick={()=> redirectToAdd()}>
                    <IonLabel>Add an expense</IonLabel>
                </IonSegmentButton>
            </IonSegment>
        </IonHeader>

      <IonContent fullscreen>
        
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Expenses: history</IonTitle>
          </IonToolbar>
        </IonHeader>

        <div className="main-app">
            <IonList mode="ios" lines="none">
            {
                expenseList.map((expense:any, index:any)=>(
                    <IonItemSliding key={index}>
                        <IonItemOptions side="end">
                            <IonItemOption color="primary" expandable>Edit</IonItemOption>
                            <IonItemOption color="danger" expandable>Delete</IonItemOption>
                        </IonItemOptions>
                        <IonItem>
                          <IonCard mode="ios">
                            <IonCardHeader>
                              <IonCardTitle>{expense.keywords}</IonCardTitle>
                              <IonCardSubtitle>{expense.date.toLocaleDateString()}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonText>{expense.amount + " " + currency}</IonText>
                              <IonBadge color={setColor(expense.category)} mode="ios">{expense.category}</IonBadge>
                            </IonCardContent>
                          </IonCard>
                        </IonItem>
                    </IonItemSliding>
                ))
            }
            </IonList>
        </div>

      </IonContent>
    </IonPage>
    )
}

export default ExpensesHistTab;