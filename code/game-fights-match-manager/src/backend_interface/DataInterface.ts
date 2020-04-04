import { QuestionSubmission, SoloMatchData, FighterData } from '../types/datatypes'
import { UserMatchStatus, MatchStage } from '../enums/statusEnums';
import { QueryCallback } from '../types/functionTypes';

/**
 * [DES/PRE] A set of functions defining reponses to changes in GameFights data.
 */
type GameFightsDataEvents = {
    onQuestionUpdate: (mockParam: string[]) => void;
}

/**
 * [DES/PRE] Used to get and post data, and assign events to repsonse to changes in data, using a provider of GameFights 
 * data.
 */
export default abstract class GameFightsDataInterface{
 
    public events: GameFightsDataEvents = {
        onQuestionUpdate: (mockParam: string[]) => { }
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
    public abstract queryQuestions(queryCallback: QueryCallback<string[]>): void;

    /**
     * [DES/PRE] Retrieve and respond to the answers to each of the match's questions submitted by the users being managed by
     * the data.
     * @param queryCallback Defines what us to be done with the answers once they have been retrieved.
     */
    public abstract queryAnswerSubmissions(queryCallback : QueryCallback<QuestionSubmission[]>): void;

    /**
     * [DES/PRE] Retieve and respond to information about the match being managed by the data.
     * @param queryCallback 
     */
    public abstract queryMatchInfo(queryCallback: QueryCallback<SoloMatchData>): void;

    /**
     * [DES/PRE] Retrieve and respond to a list of fighter whos name contains a specified string.
     * @param name The string being used to identifiy the desired fighters.
     */
    public abstract fetchFightersByName(name: string): (queryCallback: QueryCallback<FighterData>) => void;

    /**
     * [DES/PRE] Specify a question that is to be added to the managed data.
     * @param question The question to be added to the data.
     * @param successCallback Defines the reponse to the question being successfully added.
     * @param failureCallback Defines the response the addition of the question failing in some way.
     */
    public abstract submitQuestion (question: string, successCallback: () => void, failureCallback: () => void): void
    
    /**
     * [DES/PRE] Specify a title to be set as the title of the currently managed match.
     * @param title The title to be set as the tile of the match.
     * @param successCallback Defines the response to the setting of the match title being successful. 
     * @param failureCallback Defines the response to the setting of the match title failing in some way.
     */
    public abstract submitMatchTitle (title: string, successCallback: () => void, failureCallback: () => void): void;
    
}