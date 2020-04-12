import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';
import QuestionsComponent from './QuestionsComponent'

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';

//Some type aliases to make declarations more digestable.
type QuestionsViewerState = LoadingComponentState<UniquelyIdentifiableCollection<Question>>
type QuestionsViewerProps = LoadingComponentProps<GameFightsDataInterface>


/**
 * [DES/PRE] Displays an uneditable list of the chosen questions and listens for update to the list,
 * displaying changes automatically.
 */
class QuestionsViewer extends QuestionsComponent<QuestionsViewerState>{
    
    constructor(props: QuestionsViewerProps){
        super(props);
        props.dataInterface.events.onQuestionUpdate = this.onQuestionUpdate;
    }

    onQuestionUpdate = (questions: Question[]) => {
        this.setState(this.state.setData(this.state.data.addAll(questions)))
    }

    protected instantiateState(loading: boolean, data: UniquelyIdentifiableCollection<Question>): QuestionsViewerState {
        throw new Error("Method not implemented.");
    }

}

export default QuestionsViewer;
