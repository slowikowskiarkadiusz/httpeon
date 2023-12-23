import { TabSetup } from "../tab-setup";
import { EndpointTabContent } from "./endpoint.tab-content";
import { PButton } from "../../common/pbutton";
import { faClockRotateLeft, faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import { EndpointTextEditor, EndpointTextEditorData } from "./endpoint-text-editor";

const randomJson = [
    { key: "_id", value: "6585a941caa179a6189de75c" },
    { key: "guid", value: "2ec70d67-5305-4783-b488-417456755546" },
    { key: "balance", value: "$2,440.65" },
    { key: "picture", value: "http://placehold.it/32x32" },
    { key: "eyeColor", value: "blue" },
];

export function Endpoint(props: { setup: TabSetup<EndpointTabContent>, updateSetup: (setup: TabSetup<EndpointTabContent>) => void }) {
    props.setup.content.method = 'get';
    const [selectedMethod, setSelectedMethod] = useState(props.setup.content.method)
    const [inputs, setInputs] = useState<EndpointTextEditorData>({
        'Params': {
            content: JSON.stringify(randomJson)
        },
        'Body': {
            content: '',
            allowedDisplayModes: ['text']
        },
        'Headers': {
            content: '',
        },
    })
    const [outputs, setOutputs] = useState<EndpointTextEditorData>({
        'Request': {
            content: '',
            allowedDisplayModes: ['text']
        },
        'Response': {
            content: '',
            allowedDisplayModes: ['text']
        },
    })

    return <div style={ {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--app-gap)',
        height: '100%',
    } }>
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
                           paddingLeft: '1em',
                           border: 'none',
                           backgroundColor: 'var(--theme-bc-2)',
                           color: 'var(--theme-font-color)',
                           fontFamily: 'Menlo',
                           borderTopRightRadius: 'var(--cell-border-radius)',
                           borderBottomRightRadius: 'var(--cell-border-radius)',
                           lineHeight: '2.73em',
                           overflow: 'scroll',
                       } }
                       defaultValue={ props.setup.content.endpoint }
                       key={ props.setup.content.endpoint }
                       onChange={ e => {
                           console.log(e);
                           props.setup.content.endpoint = e.target.value;
                           props.updateSetup(props.setup);
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
        <div style={ {
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--app-gap)',
            height: '100%',
        } }>
            <div><EndpointTextEditor data={ inputs }/></div>
            <div><EndpointTextEditor data={ outputs }/></div>
        </div>
    </div>
}