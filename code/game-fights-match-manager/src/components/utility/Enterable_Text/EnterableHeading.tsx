import React from 'react';

import EnterableStringText from "./EnterableStringText";

export default class EnterableHeading extends EnterableStringText{

    protected renderText(text: string){
        return <h1>{text}</h1>
    }

}