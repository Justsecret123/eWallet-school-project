import { IonContent, IonHeader, IonItem, IonLabel, IonPage, IonSelect, IonSelectOption, IonTitle, IonToolbar } from "@ionic/react";
import "./settings.css";

const SettingsTab: React.FC = () => {
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
                        <IonLabel position="stacked" className="labels">Change currency</IonLabel>
                        <IonSelect>
                            <IonSelectOption>

                            </IonSelectOption>
                        </IonSelect>
                    </IonItem>

                </div>

            </IonContent>
        </IonPage>
    )
}

export default SettingsTab;