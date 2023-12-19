import { TabSetup } from "../tab-setup";
import { EndpointTabContent } from "./endpoint.tab-content";
import { PButton } from "../../common/pbutton";
import { faClockRotateLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

export function Endpoint(props: { setup: TabSetup<EndpointTabContent> }) {
    props.setup.content.method = 'get';
    const [selectedMethod, setSelectedMethod] = useState(props.setup.content.method)

    return <>
        <div style={ {
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
        } }>
            <div style={ { backgroundColor: 'var(--theme-bc-2)', width: '85%', display: 'flex', borderRadius: 'var(--cell-border-radius)' } }>
                <select style={ {
                    height: '100%',
                    borderTopLeftRadius: 'var(--cell-border-radius)',
                    borderBottomLeftRadius: 'var(--cell-border-radius)',
                    border: 'none',
                    fontWeight: 'bold',
                    backgroundColor: `var(--http-${ selectedMethod }-bc)`,
                    color: 'var(--theme-bc)',
                    padding: '0em 0.5em',
                    textAlign: 'center',
                } }
                        onChange={ (e) => {
                            setSelectedMethod(Object.keys(e.nativeEvent.target)
                                .filter(key => (e.nativeEvent.target as any)[key].selected)
                                .map(key => (e.nativeEvent.target as any)[key])[0].value);
                        } }>
                    <option value="get">GET</option>
                    <option value="post">POST</option>
                    <option value="put">PUT</option>
                    <option value="delete">DELETE</option>
                    <option value="patch">PATCH</option>
                    <option value="options">OPTIONS</option>
                    <option value="head">HEAD</option>
                </select>
                <input type="text"
                       style={ {
                           flex: '1 1 auto',
                           border: 'none',
                           backgroundColor: 'transparent',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                       } }/>
            </div>

            <PButton action={ () => {} }
                     content="GO"
                     color="green"
                     icon={ faPaperPlane }/>

            <PButton action={ () => {} }
                     color="gray"
                     icon={ faClockRotateLeft }/>
        </div>
    </>
}