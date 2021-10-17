import { IonBadge, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItemOption, IonItemOptions, IonItemSliding, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonSelect, IonSelectOption, IonText, IonTitle, IonToolbar, useIonViewDidEnter } from '@ionic/react';
import { IonItem, IonLabel } from '@ionic/react';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from 'react-router';
import { checkmarkCircle, closeCircle, create, trash } from 'ionicons/icons';
import './expensesHist.css';


const store = new Storage(); 

var database:any = null;

store.create().then(function(result){
  database = result;
});

const ExpensesHistTab: React.FC = () => {

    const [expenseList, setExpenseList] = useState<any>([]);
    const[db, setDb] = useState<Database | null>(database);
    const [trigger, setTrigger] = useState<boolean>(true);

    const [currency, setCurrency] = useState<string>("");

    const routerHistory:any = useHistory();

    const ionList:any = useRef();

    const getExpenseListFromDB = async() => {
      const val = await db.get("expenses");
      if(val!==null){
        setExpenseList(val);
      }
    };

    const getCurrencyFromDB = async() => {
      const val = await db.get("currency");
        if(val!==null){
            setCurrency(val);
        }
    };

    useEffect(()=>{
      getExpenseListFromDB();
      getCurrencyFromDB();
    },[trigger]);

    useIonViewDidEnter(()=>{
      setTrigger(!trigger);
    });
    
    const redirectToAdd = () => {
        routerHistory.push("/tab2", {from: "expensesHist"});
    }

    const removeExpense = (idx:number) => {

      var newExpenseList = [...expenseList];
      newExpenseList.splice(idx,1);

      setExpenseList(newExpenseList);
      db.set("expenses",newExpenseList);

      ionList.current.closeSlidingItems();
      setTrigger(!trigger);

    }

    const toggleModifiersVisibility = (idx:string) => {
      let index:any = document.getElementById(idx);
      if(index!==null){
          index.classList.toggle("ion-hide");
          document.getElementById("button-"+idx)?.classList.toggle("ion-hide");
      }       
   }

   const getSlidingRatio = (e:any,idx:number) => {

     var amount:number = e.detail.amount;

     if(amount>158){
       removeExpense(idx);
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
            <IonSearchbar enterkeyhint="enter" placeholder={"Search..."} animated={true} input-mode="text" mode="ios"></IonSearchbar>
            <IonList mode="ios" lines="none" ref={ionList}>
            {
                expenseList.map((expense:any, index:any)=>(
                    <IonItemSliding key={index}  onIonDrag={(e)=>getSlidingRatio(e,index)}>
                        <IonItemOptions side="end">
                            <IonItemOption color="danger" onClick={()=>{removeExpense(index)}} expandable>Delete <IonIcon icon={trash}/></IonItemOption>
                        </IonItemOptions>
                        <IonItem>
                          <IonCard mode="ios">
                            <IonCardHeader>
                              <IonCardTitle>{expense.keywords}</IonCardTitle>
                              <IonCardSubtitle>{expense.date.toLocaleDateString()}</IonCardSubtitle>
                            </IonCardHeader>
                            <IonCardContent>
                              <IonText>{expense.amount + " " + currency}</IonText> 
                              <IonBadge color={setColor(expense.category)} mode="ios">{expense.category}</IonBadge> <br/> <br/>
                              <IonButton color="secondary" id={"button-"+index} onClick={()=>toggleModifiersVisibility(index)}>Edit <IonIcon icon={create}/></IonButton>
                              <div className="ion-hide" id={index}>
                                <IonLabel position="stacked">Modify date: </IonLabel>
                                <IonDatetime placeholder={expense.date.toLocaleDateString()}></IonDatetime>
                                <IonLabel position="stacked">Modify amount: </IonLabel>
                                <IonInput type="number" placeholder={expense.amount}></IonInput>
                                <IonLabel position="stacked">Category</IonLabel>
                                <IonSelect mode="ios" placeholder={expense.category}>
                                  <IonSelectOption value="Housing">Housing</IonSelectOption>
                                  <IonSelectOption value="Food">Food</IonSelectOption>
                                  <IonSelectOption value="Bills">Bills</IonSelectOption>
                                  <IonSelectOption value="Clothes">Clothes</IonSelectOption>
                                  <IonSelectOption value="Extra">Extra</IonSelectOption>
                              </IonSelect>
                              <IonLabel position="stacked">Keywords</IonLabel>
                              <IonInput placeholder={expense.keywords}></IonInput>
                              <IonButton  color="secondary">Confirm <IonIcon icon={checkmarkCircle}/> </IonButton>
                              <IonButton color="danger" onClick={()=>toggleModifiersVisibility(index)}>Close <IonIcon icon={closeCircle}/></IonButton>
                              </div>
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