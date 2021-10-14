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
    const [currency, setCurrency] = useState<string>("MAD");

    const routerHistory = useHistory();
    const [modifiersHidden, setModifiersHidden] = useState<boolean>(true);

    const ionList:any = useRef();

    useEffect(()=>{
        getSalaryHistFromDB();
        getCurrencyFromDB();
    });
    
    const redirectToAdd = () => {
        routerHistory.push("/tab1");
    }

    const getSalaryHistFromDB = async() => {
        const val = await db.get("salaries");
        if(val!==null){
            setSalaryList(val);
        }else{
            setSalaryList(null);
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

    const removeSalary = (idx:number) => {
        var newSalaryList = [...salaryList];
        const index = newSalaryList.indexOf(idx);
        newSalaryList.splice(idx,1);

        setSalaryList(newSalaryList);
        db.set("salaries",newSalaryList);

        ionList.current.closeSlidingItems();

    }

    const toggleModifiersVisibility = (idx:string) => {
       let index:any = document.getElementById(idx);
       if(index!==null){
           index.classList.toggle("ion-hide");
           document.getElementById("button-"+idx)?.classList.toggle("ion-hide");
       }       
       setModifiersHidden(true);
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
                            <IonItemSliding key={index}>
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
                                                <IonDatetime placeholder={salary.date}></IonDatetime>
                                                <IonLabel position="stacked">Modify amount: </IonLabel>
                                                <IonInput type="number" placeholder={salary.salary}></IonInput>
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

export default SalaryHistTab;