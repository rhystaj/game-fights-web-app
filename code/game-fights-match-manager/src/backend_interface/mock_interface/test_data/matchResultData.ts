import { MatchResultData } from "../../../types/datatypes";
import testFighterDatabase from "./testFighterDatabase";
import { AnswerSubmissionState } from "../../../enums/statusEnums";

const matchResults: MatchResultData[] = [
    {
        id: 1,
        question: "What it the best wireframing software?",
        answers: [
            {
                participant: testFighterDatabase.retrieveElementWithId(6),
                answer: "Not XD",
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(7),
                answer: "I don't know, Figma's pretty good I guess...",
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(8),
                answer: "By hand - THE OLD FASHIONED WAY!!!",
                state: AnswerSubmissionState.ACCEPTED
            }
        ],
        chosenAnswerIndex: 0
    },
    {
        id: 2,
        question: "What's a good placeholder question?",
        answers: [
            {
                participant: testFighterDatabase.retrieveElementWithId(6),
                answer: "A Generic One",
                state: AnswerSubmissionState.AWAITING_VALIDATION
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(7),
                answer: "A Humerous One",
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(8),
                answer: "I DON'T USE PLACEHOLDERS!!!",
                state: AnswerSubmissionState.ACCEPTED
            }
        ],
        chosenAnswerIndex: 1
    },
    {
        id: 3,
        question: "Best Template?",
        answers: [
            {
                participant: testFighterDatabase.retrieveElementWithId(6),
                answer: "One in which most of the work has been done for you.",
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(7),
                answer: "The one with the most diverse types of examples",
                state: AnswerSubmissionState.ACCEPTED
            },
            {
                participant: testFighterDatabase.retrieveElementWithId(8),
                answer: "Blank",
                state: AnswerSubmissionState.ACCEPTED
            }
        ],
        chosenAnswerIndex: undefined
    }
]

export default matchResults;