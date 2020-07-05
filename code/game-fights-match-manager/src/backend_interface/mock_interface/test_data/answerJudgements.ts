import testFighterDatabase from "./testFighterDatabase";
import { AnswerSubmissionState } from "../../../enums/statusEnums";
import { FighterData } from "../../../types/datatypes";

const EARLIEST_GENERATED_DATE = 1420070400;
const DATE_RANGE_SIZE = Date.now() - EARLIEST_GENERATED_DATE;

const answerJudgements =  [

    {
        id: 1,
        text: "What is the best placeholder question?",
        answerJudgements: [
            {
                participant: testFighterDatabase.retrieveElementWithId(1) as FighterData,
                answer: "",
                timeSubmitted: new Date(Math.random() * DATE_RANGE_SIZE + EARLIEST_GENERATED_DATE),
                state: AnswerSubmissionState.NO_ANSWER
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(2) as FighterData,
                answer: "A Generic One",
                timeSubmitted: new Date(Math.random() * DATE_RANGE_SIZE + EARLIEST_GENERATED_DATE),
                state: AnswerSubmissionState.PENDING_JUDGE_APPROVAL
            }
        ]
    },

    {
        id: 2,
        text: "If you had to use wireframing software, which one would you use.",
        answerJudgements: [
            {
                participant: testFighterDatabase.retrieveElementWithId(1) as FighterData,
                answer: "Not Adobe XD",
                timeSubmitted: new Date(Math.random() * DATE_RANGE_SIZE + EARLIEST_GENERATED_DATE),
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(2) as FighterData,
                answer: "Figma's pretty good.",
                timeSubmitted: new Date(Math.random() * DATE_RANGE_SIZE + EARLIEST_GENERATED_DATE),
                state: AnswerSubmissionState.DECLINED
            }
        ]
    }

]

export default answerJudgements;