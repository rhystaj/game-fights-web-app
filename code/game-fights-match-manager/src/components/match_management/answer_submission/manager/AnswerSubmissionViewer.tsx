import React from 'react';

import AnswerSubmissionComponent from "./AnswerSubmissionComponent";

import AnswerSubmission from "./AnswerSubmission";

import { AnswerSubmissionData } from "../../../../types/datatypes";

export default class AnswerSubmissionViewer extends AnswerSubmissionComponent{
    
    protected renderAnswerSubmission(answerSubmission: AnswerSubmissionData): JSX.Element {
        return (
            <AnswerSubmission
                key={answerSubmission.id}
                submission={answerSubmission}
            />
        );
    }

}