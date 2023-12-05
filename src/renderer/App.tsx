import './index.scss';
import { PButton } from "./common/PButton";
import { faArrowsRotate, faArrowTurnDown, faPlus, faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { TabProvider } from './nav/tab.context';
import { Sidebar } from './sidebar/Sidebar';

export function App() {
    return (
        <TabProvider>
            <div className="app">
                <div className="barleft"><Sidebar/></div>
                <div className="content">
                    <div style={ { margin: '1em', display: 'flex', maxWidth: '100%', flexDirection: 'row', justifyContent: 'space-between' } }>
                        <PButton content='Refresh'
                                 icon={ faArrowsRotate }
                                 priority={ 2 }
                                 action={ () => console.log('dummy clicked') }></PButton>
                        <PButton content='Fetch all'
                                 icon={ faArrowTurnDown }
                                 iconTransform="scaleX(-1)"
                                 priority={ 1 }
                                 action={ () => console.log('dummy clicked') }></PButton>
                        <PButton content='Commit'
                                 icon={ faPlusCircle }
                                 priority={ 1 }
                                 action={ () => console.log('dummy clicked') }></PButton>
                        <PButton icon={ faPlus }
                                 priority={ 1 }
                                 action={ () => console.log('dummy clicked') }></PButton>
                    </div>
                </div>
            </div>
        </TabProvider>
    );
}