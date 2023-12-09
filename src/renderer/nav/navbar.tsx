import './navbar.scss';
import { PButton } from "../common/pbutton";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useTabs } from "./tab.context";

export function Navbar() {
    const { tabs, currentTabIndex } = useTabs();

    return <div style={ {
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--theme-bc-d2)',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        gap: '10px',
    } }>

        <div style={ { display: 'block', flexGrow: 1, flexShrink: 1 } }>
            { tabs.map((tab, i, c) => {
                const classes = ['tab-button'];
                if (currentTabIndex == i)
                    classes.push('tab-button-active');
                return <button key={ i }
                               className={ classes.join(' ') }
                               style={ {
                                   width: `${ 100 / c.length }%`,
                                   height: '100%',
                                   outline: 'none',
                                   border: 'none',
                                   color: 'unset',
                                   backgroundColor: 'unset',
                               } }>{ tab.name }</button>;
            }) }
        </div>
        <div style={ { flexGrow: 0, flexShrink: 0, display: 'flex' } }>
            <PButton content="New tab"
                     icon={ faPlus }
                     action={ () => {} }/>
        </div>
    </div>
}