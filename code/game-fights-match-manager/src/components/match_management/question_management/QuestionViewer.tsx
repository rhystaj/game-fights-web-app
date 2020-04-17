import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';
import QuestionsComponent from './QuestionsComponent'

import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';

import { Question } from '../../../types/datatypes';
import { QuestionsEditorState } from './QuestionsEditor';

//Some type aliases to make declarations more digestable.
type QuestionCollection = UniquelyIdentifiableCollection<Question>;
type QuestionsViewerState = LoadingComponentState<QuestionCollection>;
type QuestionsViewerProps = LoadingComponentProps<GameFightsDataInterface>;


/**
 * [DES/PRE] Displays an uneditable list of the chosen questions and listens for update to the list,
 * displaying changes automatically.
 */
class QuestionsViewer extends QuestionsComponent<QuestionsViewerState>{
    
    constructor(props: QuestionsViewerProps){
        super(props);
        props.dataInterface.events.onQuestionUpdate = this.onQuestionUpdate;
    }

    determineInitialState(initialLoadingValue: boolean, initialQuestionCollection: QuestionCollection){
        return new LoadingComponentState<QuestionCollection>(initialLoadingValue, initialQuestionCollection);
    }

    onQuestionUpdate = (questions: Question[]) => {
        this.setState(this.state.setData(this.state.data.addAll(questions)))
    }

    protected instantiateNewState(loading: boolean, data: QuestionCollection): QuestionsViewerState {
        throw new Error("Method not implemented.");
    }

}

export default QuestionsViewer;
