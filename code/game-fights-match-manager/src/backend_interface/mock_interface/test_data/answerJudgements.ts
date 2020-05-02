import testFighterDatabase from "./testFighterDatabase";
import { AnswerSubmissionState } from "../../../enums/statusEnums";
import { FighterData } from "../../../types/datatypes";

const answerJudgements =  [

    {
        id: 1,
        text: "What is the best placeholder question?",
        answerJudgements: [
            {
                participant: testFighterDatabase.retrieveElementWithId(1) as FighterData,
                answer: "",
                state: AnswerSubmissionState.NO_ANSWER
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(2) as FighterData,
                answer: "A Generic One",
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
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(2) as FighterData,
                answer: "Figma's pretty good.",
                state: AnswerSubmissionState.DECLINED
            }
        ]
    }

]

export default answerJudgements;