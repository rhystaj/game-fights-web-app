import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';
import QuestionsComponent from './QuestionsComponent'

import { Question } from '../../../types/datatypes';
import { QueryCallback } from '../../../types/functionTypes';

//Some type aliases to make declarations more digestable.
type QuestionsViewerState = LoadingComponentState<Question[]>;
type QuestionsViewerProps = LoadingComponentProps<GameFightsDataInterface>;


/**
 * [DES/PRE] Displays an uneditable list of the chosen questions and listens for update to the list,
 * displaying changes automatically.
 */
class QuestionsViewer extends QuestionsComponent<Question, QuestionsViewerState>{
    
    constructor(props: QuestionsViewerProps){
        super(props);
        props.dataInterface.events.onQuestionUpdate = this.onQuestionUpdate;
    }

    protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<Question[]>) => void {
        return (loadCallback) => dataInterface.queryQuestions(loadCallback);
    }    

    determineInitialState(initialLoadingValue: boolean, initialQuestionCollection: Question[]){
        return {
            loading: initialLoadingValue,
            data: initialQuestionCollection
        }
    }

    protected determineNewStateFromData(data: Question[]): QuestionsViewerState {
        return{
            loading: this.state.loading,
            data: data
        }
    }

    onQuestionUpdate = (questions: Question[]) => {
        this.updateQuestionDisplay(questions);
    }

    protected updateQuestionDisplay(questions: Question[]): void{
        this.setState({
            data: questions
        });
    }

}

export default QuestionsViewer;
