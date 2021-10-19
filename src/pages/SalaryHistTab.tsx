import { useEffect, useRef, useState } from 'react';
import { Database, Storage } from "@ionic/storage";
import { useHistory } from 'react-router';
import './expensesHist.css';
import './salaryHist.css';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardTitle, IonContent, IonDatetime, IonHeader, IonIcon, IonInput, IonItem, IonItemOption, IonItemOptions, IonItemSliding, IonLabel, IonList, IonPage, IonSearchbar, IonSegment, IonSegmentButton, IonTitle, IonToolbar, useIonViewDidEnter} from '@ionic/react';
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
    const [trigger, setTrigger] = useState<boolean>(true);
    const [updates, setUpdates] = useState<any>(null);

    var routerHistory:any = useHistory();

    var refs:any = useRef([]);


    useEffect(()=>{
        getSalaryHistFromDB();
        getCurrencyFromDB();
    },[trigger]);

    useIonViewDidEnter(()=>{
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
        setTrigger(!trigger);

    }
    
    const redirectToAdd = () => {
        setTrigger(!trigger);
        routerHistory.push("/tab1",{from: "salaryHist"});
    }

    const getSalaryHistFromDB = async() => {
        const val = await db.get("salaries");
        if(val!==null && updates==null){
            setSalaryList(val);
            setUpdates(val);
        }
    };

    const getCurrencyFromDB = async() => {
        const val = await db.get("currency");
        if(val!==null){
            setCurrency(val);
        }
    };

    const removeSalary = (idx:number) => {
        var newSalaryList = [...salaryList];
        var newUpdatesList = [...updates];

        newSalaryList.splice(idx,1);
        newUpdatesList.splice(idx,1);
       
        setSalaryList(newSalaryList);
        setUpdates(newUpdatesList);
        db.set("salaries",newSalaryList);
        setTrigger(!trigger);
    }

    const toggleModifiersVisibility = (idx:string) => {
       refs.current[idx].classList.toggle("ion-hide");
    }

    const getSlidingRatio = (e:any,idx:number) => {
        var amount:number = e.detail.amount;
        if(amount>158){
          removeSalary(idx);
          if(!refs.current.slider){
              refs.current.slider.closeSlidingItems();
          }
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
                <IonSearchbar enterkeyhint="enter" placeholder={"Search..."} animated={true} input-mode="text" mode="ios"></IonSearchbar>
                <IonList ref={(e)=> {refs.current.slider=e}} inset={true} mode="ios" lines="none">
                    {
                        salaryList.map((salary:any, index:any)=>(
                            <IonItemSliding key={index} onIonDrag={(e)=>getSlidingRatio(e,index)}>
                                <IonItemOptions side="end">
                                    <IonItemOption color="danger" expandable onClick={()=>{removeSalary(index)}}>Delete <IonIcon icon={trash}/> </IonItemOption>                                  
                                </IonItemOptions>
                                <IonItem button>
                                    <IonCard mode="ios">
                                        <IonCardHeader>
                                            <IonCardTitle>
                                                <IonIcon icon={calendar}/>
                                                Payday: {salary.date}
                                            </IonCardTitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            Amount : {salary.salary} {currency}
                                            <IonButton type="button" color="secondary" id={"button-"+index} onClick={()=>toggleModifiersVisibility(index)}> Edit <IonIcon slot="end" icon={create}/></IonButton>
                                            <div ref={(e)=> refs.current[index]=e} className="ion-hide" id={index}>
                                                <IonLabel position="stacked">Modify payday: </IonLabel>
                                                <IonDatetime id={"date-"+index} placeholder={salary.date} onIonChange={e=>addUpdateDate(index,new Date(e.detail.value!).toLocaleDateString("en"))}></IonDatetime>
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