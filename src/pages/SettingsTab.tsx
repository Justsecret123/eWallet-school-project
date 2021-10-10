import { IonButton, IonContent, IonHeader, IonIcon, IonInput, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import {checkmarkCircle} from "ionicons/icons";
import "./settings.css";
import { currency_list } from "../currencies";
import { useState } from "react";

const currencies = currency_list;

const compareWith = (o1:any, o2:any) => {
    return o1 && o2 ? o1.code === o2.code : o1 === o2;
}

const SettingsTab: React.FC = () => {

    const [username, setUsername] = useState("Ibrahim Serouis");
    const [currency, setCurrency] = useState("MAD");

    const [selectedCurrency, setSelectedCurrency] = useState(currency);


    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Settings {currency}</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Settings {currency} </IonTitle>
                    </IonToolbar>
                </IonHeader>
                
                <div className="main-app">
                    <IonItem>
                        <IonLabel position="stacked" className="labels">Change username</IonLabel>
                        <IonInput type="text" placeholder="Username..."></IonInput>
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked" className="labels">Change currency</IonLabel>
                        <IonSelect onIonChange = {e => setSelectedCurrency(e.detail.value)}>
                            {
                                currencies.map(currency => (
                                    <IonSelectOption key={currency.code} value={currency.code}>
                                        {currency.code} - {currency.name}
                                    </IonSelectOption>
                                ))
                            }
                        </IonSelect>
                    </IonItem>
                    <IonButton expand="block" className="custom-button" onClick={()=>{setCurrency(selectedCurrency)}}>
                        Confirm
                        <IonIcon icon={checkmarkCircle}/>
                    </IonButton>

                </div>

            </IonContent>
        </IonPage>
    )
}

export default SettingsTab;