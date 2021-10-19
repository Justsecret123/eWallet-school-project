import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { wallet, card, settings, barChart } from 'ionicons/icons';
import SalaryTab from './pages/SalaryTab';
import SettingsTab from "./pages/SettingsTab";
import ExpensesTab from './pages/ExpensesTab';
import ExpensesHistTab from './pages/ExpensesHistTab';


/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import SalaryHistTab from './pages/SalaryHistTab';
import ByCategoryTab from './pages/ByCategoryTab';
import ByPeriodTab from './pages/ByPeriodTab';

const App: React.FC = () => {
  
  return (
  <IonApp>
    <IonReactRouter>
      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/tab1">
            <SalaryTab />
          </Route>
          <Route exact path="/tab2">
            <ExpensesTab />
          </Route>
          <Route path="/tab3">
            <ByCategoryTab />
          </Route>
          <Route exact path="/tab4">
            <SettingsTab />
          </Route>
          <Route exact path="/tab5">
            <ByPeriodTab />
          </Route>        
          <Route exact path="/expensesHist">
            <ExpensesHistTab />
          </Route>
          <Route exact path="/salaryHist">
            <SalaryHistTab/>
          </Route>
          <Route exact path="/">
            <Redirect to="/tab1" />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom" mode="ios">
          <IonTabButton tab="tab1" href="/tab1">
            <IonIcon icon={wallet} />
            <IonLabel>Salary</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab2" href="/tab2">
            <IonIcon icon={card} />
            <IonLabel>Expenses</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab3" href="/tab3">
            <IonIcon icon={barChart} />
            <IonLabel>Charts</IonLabel>
          </IonTabButton>
          <IonTabButton tab="tab4" href="/tab4">
            <IonIcon icon={settings}/>
            <IonLabel>Settings</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
  </IonApp>
  );
};

export default App;
