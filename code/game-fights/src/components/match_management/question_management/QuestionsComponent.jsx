import React from 'react';
import LoadingComponent from '../../LoadingComponent';

import beInterface from '../../../backend_interface/interface';

class Questions extends LoadingComponent{

    constructor(props){
        super(props, beInterface.queryQuestions)
    }

    renderQuestion(question, number){
        //It may be the case that this method is not being called directy from the map
        //function as below, in which case it will not need a key, so do not give it a
        //key if no question number has been passed.
        return <p key={number === undefined ? null : number}>{question}</p>;
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