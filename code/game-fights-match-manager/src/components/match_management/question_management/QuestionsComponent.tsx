import React from 'react';
import LoadingComponent, { LoadingComponentState, LoadingComponentProps } from '../../utility/LoadingComponent';

import GameFightsDataInterface from '../../../backend_interface/GameFightsDataInterface';

import { Question } from '../../../types/datatypes';
import { QueryCallback } from "../../../types/functionTypes";
import UniquelyIdentifiableCollection from '../../../utility/UniquelyIdentifiableCollection';
import QuestionEquator from '../../../types/equators/UniquelyIndentifiableEquators';
import { NullQuestion } from '../../../types/nullTypes';

//Some type aliases to hopefully make type references more digestable.
type QuestionCollection = UniquelyIdentifiableCollection<Question>;
type QuestionComponentState = LoadingComponentState<QuestionCollection>;
type QuestionComponentProps = LoadingComponentProps<GameFightsDataInterface>;


export default abstract class Questions<S extends QuestionComponentState> extends 
    LoadingComponent<GameFightsDataInterface, QuestionCollection, QuestionComponentProps, S>{
    
    protected loadData(dataInterface: GameFightsDataInterface): (loadCallback: QueryCallback<QuestionCollection>) => void {
        return loadCallback => {
            dataInterface.queryQuestions((data: Question[]) => {
                loadCallback(this.determineInitalData().addAll(data));
            });
        }
    }

    protected determineInitalData(): UniquelyIdentifiableCollection<Question> {
        return new UniquelyIdentifiableCollection([], new QuestionEquator(), new NullQuestion());
    }

    protected renderQuestion(question: Question){
        return <p key={question.id}>{question.id}</p>;
    }

    protected renderLoaded(dataInterface: GameFightsDataInterface, questions: UniquelyIdentifiableCollection<Question>){
        return(
            <div>
                {questions.asArray().map(this.renderQuestion)}
            </div>
        ) 
    }

}