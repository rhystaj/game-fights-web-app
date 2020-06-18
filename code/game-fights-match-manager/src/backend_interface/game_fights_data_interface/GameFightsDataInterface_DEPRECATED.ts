import { AnswerSubmissionData, MatchData, FighterData, Question, JudgeableQuestionData, ParticipantAnswerData } from '../../types/datatypes'
import { UserMatchStatus, MatchStage, AnswerSubmissionState } from '../../enums/statusEnums';
import { QueryCallback } from '../../types/functionTypes';

/**
 * [DES/PRE] A set of functions defining reponses to changes in GameFights data.
 */
type GameFightsDataEvents = {
    
    //Called when the judge updates the list of questions for the match.
    onQuestionUpdate: (questions: Question[]) => void;

    //Called when the state of an answer submission is changed outside of the user's session, be
    //it by a judge, or another participant.
    onExternalAnswerSubmissionStateChange: (submissions: AnswerSubmissionData[]) => void

    //Called when a participant makes a change to thier anwer submission.
    onParticipantAnswerSubmissionChange: (questionsAnswersJudgements: JudgeableQuestionData[]) => void;

}

/**
 * [DES/PRE] Used to get and post data, and assign events to repsonse to changes in data, using a provider of GameFights 
 * data.
 */
export default abstract class GameFightsDataInterface{
 
    public events: GameFightsDataEvents = {  
        onQuestionUpdate: (questions: Question[]) => { },
        onExternalAnswerSubmissionStateChange: (submissions: AnswerSubmissionData[]) => { },
        onParticipantAnswerSubmissionChange: (questionAnswersJudgements: JudgeableQuestionData[]) => { }
    }

    /**
     * [DES/PRE] Retrieve and respond to the current status of the user being managed as part of the data.
     * @param queryCallback Defines what is to be done with the user match status once it is retrieved.
     */
    public abstract queryUserMatchStatus(queryCallback: QueryCallback<UserMatchStatus>): void;

    /**
     * [DES/PRE] Retrieve and respond to the the stage the match being managed by the data is currently at.
     * @param queryCallback Defines what is to be done with the match stage once it is retrieved.
     */
    public abstract queryMatchStage(queryCallback: QueryCallback<MatchStage>): void;

    /**
     * [DES/PRE] Retrieve and respond to the collection of questions currently chosen to as being part of the match 
     * being managed as part of the data.
     * @param queryCallback Defines what it to be done with the collection of choosen questions once they have been
     * retrieved.  
     */
    public abstract queryQuestions(queryCallback: QueryCallback<Question[]>): void;

    /**
     * [DES/PRE] Retrieve and respond to the answers to each of the match's questions submitted by the users being managed by
     * the data.
     * @param queryCallback Defines what us to be done with the answers once they have been retrieved.
     */
    public abstract queryAnswerSubmissions(queryCallback : QueryCallback<AnswerSubmissionData[]>): void;

    /**
     * [DES/PRE] Retieve and respond to information about the match being managed by the data.
     * @param queryCallback 
     */
    public abstract queryMatchInfo(queryCallback: QueryCallback<MatchData>): void;

    /**
     * [DES/PRE] Retrieve and respond to a list of fighter whos name contains a specified string.
     * @param name The string being used to identifiy the desired fighters.
     */
    public abstract fetchFightersByName(name: string): (queryCallback: QueryCallback<FighterData[]>) => void;

    /**
     * 
     * @param queryCallback Retrieve and respond to information regarding the judgement of answers to questions.
     */
    public abstract queryAnswerJudgements(queryCallback: QueryCallback<JudgeableQuestionData[]>): void;

    /**
     * [DES/PRE] Specify a question that is to be added to the managed data.
     * @param question The question to be added to the data.
     * @param successCallback Defines the reponse to the question being successfully added.
     * @param failureCallback Defines the response the addition of the question failing in some way.
     */
    public abstract submitQuestion(question: string): Promise<Question[]>;

    /**
     * Sepecify that a question be deleted from the list of match questions.
     * @param question 
     */
    public abstract requestQuestionDeletion(question: Question): Promise<Question[]>

    /**
     * Specify a question that is to be added to questions that can be answered by participants as soon as it is submitted.
     * @param question 
     */
    public abstract submitImmediatelyAnswerableQuestion(question: string): Promise<JudgeableQuestionData[]>;

    /**
     * Specift that a question that can be answered by participants should be deleted.
     * @param question The question to be deleted.
     */
    public abstract requestAnswerableQuestionDeletion(question: JudgeableQuestionData): Promise<JudgeableQuestionData[]>;

    /**
     * [DES/PRE] Specify which participants are taking part in a match.
     * @param participants The collection of participants to be set as the partipants in a the match.
     * @param successCallback Defines the response to the collection of particpants being correctly set.
     * @param failureCallback Defines the response to the setting of the collection of participants failing in some way.
     */
    public abstract submitMatchParticipants(participants: FighterData[]): Promise<FighterData[]>;
    
    /**
     * [DES/PRE] Specify a title to be set as the title of the currently managed match.
     * @param title The title to be set as the tile of the match.
     * @param successCallback Defines the response to the setting of the match title being successful. 
     * @param failureCallback Defines the response to the setting of the match title failing in some way.
     */
    public abstract submitMatchTitle (title: string): Promise<string>;

    /**
     * Specify a new answer for an answer submission.
     * @param submission The AnswerSubmissionData having its answer updated.
     * @param updatedAnswer The answer the data will be updated to contain.
     * @returns A promise containing the updated collection of answer submissions.
     */
    public abstract submitAnswerUpdate (submission: AnswerSubmissionData, updatedAnswer: string): Promise<AnswerSubmissionData[]>

   /**
    * Specify a new state for the judgent of the answer to a question. 
    * @param questionsAnswersJudgement The judgements of the answer to the question.
    * @param answerIndex The index of the answer judgement thats state will be changed.
    * @param updateState The new value of the answer judgment.
    */
    public abstract submitAnswerJudgementStateUpdate(questionsAnswersJudgement: JudgeableQuestionData, 
        answerIndex: number, updateState: AnswerSubmissionState): Promise<JudgeableQuestionData[]>;
    
}