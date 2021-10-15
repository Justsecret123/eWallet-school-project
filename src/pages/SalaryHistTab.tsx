import { useEffect, useRef, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from 'react-router';
import './expensesHist.css';
import './salaryHist.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonSegment, IonSegmentButton, IonTitle, IonToolbar } from '@ionic/react';
import { calendar, checkmarkCircle, closeCircle, create, trash } from 'ionicons/icons';


const store = new Storage(); 

var database:any = null;

store.create().then(function(result){
  database = result;
});

const SalaryHistTab: React.FC = () => {

    const[db, setDb] = useState<Database | null>(database);
    const [salaryList, setSalaryList] = useState<any>([]);
    const [currency, setCurrency] = useState<string>("");

    const [updates, setUpdates] = useState<any>();

    const routerHistory = useHistory();

    const ionList:any = useRef();

    useEffect(()=>{
        getSalaryHistFromDB();
        getCurrencyFromDB();
    });

    const addUpateAmount = (idx:any, newAmount:string) => {
        var newUpdates:any = [...updates];
        var amount:number = parseInt(newAmount);
        newUpdates[idx].salary = amount;

        setUpdates(newUpdates);

    }

    const addUpdateDate = (idx:any, newDate:string) => {
        var newUpdates:any = [...updates];
        newUpdates[idx].date = newDate.toLocaleString();

        setUpdates(newUpdates);
        
    }

    const addUpdate = (idx:any) => {

        var newSalaryList = [...salaryList];
        const updatesList = updates;

        newSalaryList[idx] = updatesList[idx];
        
        setSalaryList(newSalaryList);
        
        db.set("salaries",newSalaryList);

    }
    
    const redirectToAdd = () => {
        routerHistory.push("/tab1");
    }

    const getSalaryHistFromDB = async() => {
        const val = await db.get("salaries");
        if(val!==null && updates==null){
            setSalaryList(val);
            setUpdates(val);
        }else if(val!==null && updates!==null){
            setSalaryList(val);
        }else{
            setSalaryList(null);
            setUpdates(null);
        }
    }

    const getCurrencyFromDB = async() => {
        const val = await db.get("currency");
        if(val!==null){
            setCurrency(val);
        }else{
            setCurrency("");
        }
    }

    const removeSalary = (idx:number) => {

        var newSalaryList = [...salaryList];
        var newUpdatesList = [...updates];


        newSalaryList.splice(idx,1);
        newUpdatesList.splice(idx,1);

        setSalaryList(newSalaryList);
        setUpdates(newUpdatesList);

        db.set("salaries",newSalaryList);

        ionList.current.closeSlidingItems();

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
   
        if(amount>200){
          removeSalary(idx);
        }
        
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
            <div className="main-app">
                <IonList mode="ios" lines="none" ref={ionList}>
                    {
                        salaryList.map((salary:any, index:any)=>(
                            <IonItemSliding key={index} onIonDrag={(e)=>getSlidingRatio(e,index)}>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" expandable onClick={()=>{removeSalary(index)}}>Delete <IonIcon icon={trash}/> </IonItemOption>                                  
                                </IonItemOptions>
                                <IonItem>
                                    <IonCard mode="ios">
                                        <IonCardHeader>
                                            <IonCardTitle>
                                                <IonIcon icon={calendar}/>
                                                Payday: {salary.date}
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            Amount : {salary.salary} {currency}<br/><br/>
                                            <IonButton color="secondary" id={"button-"+index} onClick={()=>toggleModifiersVisibility(index)}>Edit <IonIcon icon={create}/></IonButton>
                                            <div className="ion-hide" id={index}>
                                                <IonLabel position="stacked">Modify payday: </IonLabel>
                                                <IonDatetime id={"date-"+index} placeholder={salary.date} onIonChange={e=>addUpdateDate(index,new Date(e.detail.value!).toLocaleDateString())}></IonDatetime>
                                                <IonLabel position="stacked">Modify amount: </IonLabel>
                                                <IonInput id={"input-"+index} type="number" onIonChange={e=>addUpateAmount(index,e.detail.value!)} placeholder={salary.salary}></IonInput>
                                                <IonButton  color="secondary" onClick={()=>addUpdate(index)}>Confirm <IonIcon icon={checkmarkCircle}/> </IonButton>
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

export default SalaryHistTab;