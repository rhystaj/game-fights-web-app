import React from 'react';
import LoadingComponent from '../../LoadingComponent';

import beInterface from '../../../backend_interface/interface';

class Questions extends LoadingComponent{

    constructor(props){
        super(props, beInterface.queryQuestions)
    }

    renderQuestion(question){
        return (<p>{question}</p>);
    }

    renderLoaded(){
        return(
            <div>
                {this.state.questions.map(this.renderQuestion)}
            </div>
        ) 
    }

}

export default Questions;