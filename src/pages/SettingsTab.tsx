import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import {checkmarkCircle} from "ionicons/icons";
import "./settings.css";
import { currency_list } from "../currencies";
import { useEffect, useState } from "react";
import { Database, Storage } from "@ionic/storage";

const currencies = currency_list;
const store = new Storage();

var database:any = null;

store.create().then(function(result){
    database = result;
    console.log("Database: " , database);
});

const SettingsTab: React.FC = () => {

    const [username, setUsername] = useState<string>("Ibrahim Serouis");
    const [currency, setCurrency] = useState<string>("MAD");

    const [selectedCurrency, setSelectedCurrency] = useState<string>(currency);
    const [modifiedUsername, setModifiedUsername] = useState<string>(username);

    const [db, setDb] = useState<Database | null>(database);

    useEffect(() => {
        
        async function getUser(){
            const val = await db.get("username");
            if(val!==null){
                setUsername(val);
            }else{
                setUsername("username");
            }
        }

        async function getCurrency(){
            const val = await db.get("currency");
            if(val!==null){
                setCurrency(val);
            }else{
                setCurrency("MAD");
            }
        }

        getUser();
        getCurrency();

    });

    const ConfirmChanges = () => {
        if(modifiedUsername == ""){
            setCurrency(selectedCurrency);
        }else{

            setUsername(modifiedUsername);
            setCurrency(selectedCurrency);

            db.set("username",modifiedUsername);
            db.set("currency", selectedCurrency);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings</IonTitle>
                    </IonToolbar>
                </IonHeader>
                
                <div className="main-app">
                    <IonItem>
                        <IonLabel position="stacked" className="labels">Change username</IonLabel>
                        <IonInput type="text" placeholder={username + "..."}  onIonChange={e => setModifiedUsername(e.detail.value!)} minlength={4}></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="labels">Change currency</IonLabel>
                        <IonSelect onIonChange = {e => setSelectedCurrency(e.detail.value)} placeholder={currency}>
                            {
                                currencies.map(currency => (
                                    <IonSelectOption key={currency.code} value={currency.code}>
                                        {currency.code} - {currency.name}
                                    </IonSelectOption>
                                ))
                            }
                        </IonSelect>
                    </IonItem>
                    <IonButton expand="block" className="custom-button" mode="ios" onClick={()=>{ConfirmChanges()}}>
                        Confirm
                        <IonIcon icon={checkmarkCircle}/>
                    </IonButton>

                </div>

            </IonContent>
        </IonPage>
    )
}

export default SettingsTab;