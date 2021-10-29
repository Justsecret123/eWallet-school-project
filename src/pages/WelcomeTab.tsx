import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonItem, IonText, IonIcon, useIonViewDidEnter, IonCard, IonCardContent, IonCardTitle, IonGrid, IonRow, IonCol, IonLabel, IonList, IonAvatar, IonCardSubtitle, IonCardHeader } from "@ionic/react";
import { Storage, Database } from "@ionic/storage";
import { accessibility, barChart, lockClosed, wallet, walletOutline } from "ionicons/icons";
import { useState } from "react";
import './welcome.css';

const store = new Storage();

var database:any = null;

store.create().then(function(result){
    database = result;
});


const WelcomeTab: React.FC = () => {

    const [db, setDb] = useState<Database | null>(database);
    const [username, setUsername] = useState<string>("");

    useIonViewDidEnter(()=>{
        getUser();
    });

    const getUser = async() => {
        const val = await db.get("username");
        if(val!==null){
            setUsername(val);
        }
    }

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Welcome</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen>
                <IonHeader collapse="condense">
                    <IonToolbar>
                        <IonTitle size="large">Welcome</IonTitle>
                    </IonToolbar>
                </IonHeader>
                <div className="welcome-app">
                    <IonSlides mode="ios" pager={true}>
                        <IonSlide id="slide1">
                            <IonItem lines="none">
                                <IonGrid style={{"left": "5%!important"}}>
                                    <IonRow style={{"left": "5%!important"}}>
                                        <IonText>
                                            <h1> Hi, {username===""? "User": username} ! </h1>
                                        </IonText>
                                    </IonRow>
                                    <IonRow>
                                        <IonCard mode="ios">
                                            <IonCardHeader>
                                                <IonCardTitle>E-wallet</IonCardTitle>
                                                <IonCardSubtitle> Message from the author</IonCardSubtitle>
                                            </IonCardHeader>
                                            <IonCardContent>With e-wallet, you can easily manage your expenses, income, and visualize your trends with visual charts and a friendly user interface.</IonCardContent>
                                        </IonCard>
                                    </IonRow>
                                    <IonRow>
                                        <IonList>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={barChart}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Interactive visualizations</h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={accessibility}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Friendly UI</h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={lockClosed}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Your data will not be shared</h2>
                                                </IonLabel>
                                            </IonItem>
                                        </IonList>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonSlide>
                        <IonSlide>
                            <h1>Slide 2</h1>
                        </IonSlide>
                        <IonSlide>
                            <h1>Slide 3</h1>
                        </IonSlide>
                    </IonSlides>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default WelcomeTab;