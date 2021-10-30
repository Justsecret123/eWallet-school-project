import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSlides, IonSlide, IonItem, IonText, IonIcon, useIonViewDidEnter, IonCard, IonCardContent, IonCardTitle, IonGrid, IonRow, IonLabel, IonList, IonAvatar, IonCardSubtitle, IonCardHeader } from "@ionic/react";
import { Storage, Database } from "@ionic/storage";
import { accessibility, arrowForward, barChart, card, cash, lockClosed, person, rocket, settingsSharp } from "ionicons/icons";
import { useState } from "react";
import { useHistory } from "react-router";
import './welcome.css';

const store = new Storage();

var database:any = null;

store.create().then(function(result){
    database = result;
});


const WelcomeTab: React.FC = () => {

    const [db, setDb] = useState<Database | null>(database);
    const [username, setUsername] = useState<string>("");
    
    var history = useHistory();

    useIonViewDidEnter(()=>{
        getUser();
    });

    const getUser = async() => {
        const val = await db.get("username");
        if(val!==null){
            setUsername(val);
        }
    }

    const redirectToCharts = () => {
        history.push("/tab3");
    }

    const redirectToSalary = () => {
        history.push("/tab1");
    }

    const redirectToExpenses = () => {
        history.push("/tab2");
    }

    const redirectToSettings = () => {
        history.push("/tab4");
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
                        <IonSlide>
                            <IonItem lines="none">
                                <IonGrid style={{"left": "5%!important"}}>
                                    <IonRow style={{"left": "5%!important"}}>
                                        <IonText>
                                            <h1> Hi, {username===""? "User": username} ! <IonIcon icon={accessibility}></IonIcon></h1>
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
                                            <IonItem mode="ios">
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={barChart}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Interactive visualizations</h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios">
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={accessibility}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Friendly UI</h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios">
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
                            <IonItem mode="ios" lines="none">
                                <IonGrid style={{"left": "5%!important"}}>
                                    <IonRow style={{"left": "5%!important"}}>
                                        <IonText>
                                            <h1> Customizable options  <IonIcon icon={settingsSharp}></IonIcon> </h1>
                                        </IonText>
                                    </IonRow>
                                    <IonRow>
                                        <IonCard mode="ios">
                                            <IonCardHeader>
                                                <IonCardTitle>E-wallet</IonCardTitle>
                                                <IonCardSubtitle> Tips</IonCardSubtitle>
                                            </IonCardHeader>
                                            <IonCardContent>With the first version, you can configure the displayed currency and username. A secure password and a category color configuration are coming soon. </IonCardContent>
                                        </IonCard>
                                    </IonRow>
                                    <IonRow>
                                        <IonList>
                                            <IonItem mode="ios">
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={person}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Username </h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios">
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={cash}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Displayed currency </h2>
                                                </IonLabel>
                                            </IonItem>
                                        </IonList>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonSlide>
                        <IonSlide>
                            <IonItem mode="ios" lines="none">
                                <IonGrid style={{"left": "5%!important"}}>
                                    <IonRow style={{"left": "5%!important"}}>
                                        <IonText>
                                            <h1> Now, let's get started ! <IonIcon icon={rocket}></IonIcon></h1>
                                        </IonText>
                                    </IonRow>
                                    <IonRow>
                                        <IonCard mode="ios">
                                            <IonCardHeader>
                                                <IonCardTitle>E-wallet</IonCardTitle>
                                                <IonCardSubtitle> Welcome </IonCardSubtitle>
                                            </IonCardHeader>
                                            <IonCardContent>We wish you a wonderful experience :-)</IonCardContent>
                                        </IonCard>
                                    </IonRow>
                                    <IonRow>
                                        <IonList>
                                            <IonItem mode="ios" onClick={()=>redirectToSettings()}>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={settingsSharp}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Setup your preferences <IonIcon icon={arrowForward} style={{"position":"relative", "top":"5px"}}/> </h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios" onClick={()=>redirectToSalary()}>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={card}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Manage your income <IonIcon icon={arrowForward} style={{"position":"relative", "top":"5px"}}/> </h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios" onClick={()=>redirectToExpenses()}>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={cash}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Manage your expenses <IonIcon icon={arrowForward} style={{"position":"relative", "top":"5px"}}/> </h2>
                                                </IonLabel>
                                            </IonItem>
                                            <IonItem mode="ios" onClick={()=>redirectToCharts()}>
                                                <IonAvatar slot="start">
                                                    <IonIcon icon={barChart}></IonIcon>
                                                </IonAvatar>
                                                <IonLabel>
                                                    <h2> Visualize your trends <IonIcon icon={arrowForward} style={{"position":"relative", "top":"5px"}}/>  </h2>
                                                </IonLabel>
                                            </IonItem>
                                        </IonList>
                                    </IonRow>
                                </IonGrid>
                            </IonItem>
                        </IonSlide>
                    </IonSlides>
                </div>
            </IonContent>
        </IonPage>
    )
}

export default WelcomeTab;