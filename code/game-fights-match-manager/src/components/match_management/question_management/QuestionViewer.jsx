import QuestionsComponent from './QuestionsComponent'

import beInterface from './../../../backend_interface/interface'

/**
 * Displays an uneditable list of the chosen questions and listens for update to the list,
 * displaying changes automatically.
 */
class QuestionsViewer extends QuestionsComponent{

    onQuestionUpdate = questions => {
        this.setState({questions: questions})
    }

    constructor(props){
        super(props);
        beInterface.events.onQuestionUpdate = this.onQuestionUpdate;
    }

}

export default QuestionsViewer;
