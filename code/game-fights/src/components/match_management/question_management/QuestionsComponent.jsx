import React from 'react';
import LoadingComponent from '../../LoadingComponent';

import beInterface from '../../../backend_interface/interface';

class Questions extends LoadingComponent{

    constructor(props){
        super(props, beInterface.queryQuestions)
    }

    renderQuestion(question, number){
        return (<p key={number}>{question}</p>);
    }

    renderLoaded(){
        let questionNumber = 0;
        return(
            <div>
                {this.state.questions.map(this.renderQuestion, questionNumber++)}
            </div>
        ) 
    }

}

export default Questions;