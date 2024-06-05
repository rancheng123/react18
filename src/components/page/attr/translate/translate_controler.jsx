import React from 'react';
import { createRoot } from 'react-dom/client';
import TranslatePopup from '@/components/publicComponents/TranslatePopup/TranslatePopup';

export default class TranslateControler extends React.Component {
    constructor(props) {
        super(props); //组件挂载前的初始化方法，整个生命周期内只执行一次
    }

    static translate(opts) {
        const element = document.querySelector('#translate-modal');
        const root = createRoot(element)
        root.render(<TranslatePopup close={() => { root.unmount() }} opts={opts} />)
    }
}