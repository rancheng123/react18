import React from 'react';
import { createRoot } from 'react-dom/client';
import Layer from '@/system/widgets/layer';

export default class TemplateControler extends React.Component {
    
    constructor(){
        super();
    }

    static template(){
        const element = document.querySelector('#function-modal');
        const root = createRoot(element);

        this.prototype.close = ()=> root.unmount()

        root.render(
            <Layer.open
                titles={[this.title]}
                area={this.area}
                // close={true}
                close={this.close}
                draggable={this.draggable}
                skin="em-function-resource"
                cancel={this.cancel}
                ensure={this.ensure}
            >
               
                <div id="message_page_box">
                <div className="message_page">
                    {/* {_state.totalPages ? <Pagecontainer controler={this.controler} data={_state} /> : null} */}
                </div>
                <div className="sysBot">
                    <p>{window.public.lang["instructionsForUse"]}</p>
                </div>
                </div>
            </Layer.open>
        )
    }
}