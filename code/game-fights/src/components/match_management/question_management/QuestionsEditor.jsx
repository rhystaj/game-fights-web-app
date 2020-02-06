import React from 'react';
import QuestionsComponent from './QuestionsComponent';

class QuestionsEditor extends QuestionsComponent{

    constructor(props){
        super(props);
    }

    renderLoaded(){
        return(
            <div>
                {super.renderLoaded()}
                <button>Add Question</button>
            </div>
        )
    }

}

export default QuestionsEditor