using System;
using System.Collections.Generic;
using System.Linq;

using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{

    /// <inheritdoc/>
    internal class MockMatch : AbstractMatch
    {

        private readonly HashSet<IFighter> _invitedFighters = new HashSet<IFighter>();

        private readonly HashSet<IQuestion> _questions = new HashSet<IQuestion>();

        private readonly HashSet<EditableAnswerSubmission> _answerSubmissions = new HashSet<EditableAnswerSubmission>();

        public override IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

        public override string Title { get; set; }

        public override IMatchDates Dates { get; set; }

        public override IFighter Judge { get; }

        public override IEnumerable<IFighter> InvitedFighters => _invitedFighters;

        public override IEnumerable<IQuestion> Questions => _questions;

        public override IEnumerable<IAnswerSubmission> AnswerSubmissions => _answerSubmissions.OfType<IAnswerSubmission>();

        public override void InviteFighters(IEnumerable<IFighter> fighters)
        {
            foreach (IFighter fighter in fighters)
                _invitedFighters.Add(fighter);
        }

        public override void UninviteFighters(IEnumerable<IFighter> fighters)
        {
            _invitedFighters.RemoveWhere(f => fighters.Contains(f));
        }

        
        protected override IQuestion GenerateAndStoreNewQuestion(string questionText)
        {

            IQuestion newQuestion = new Question(questionText.GetHashCode(), questionText);
            _questions.Add(newQuestion);

            return newQuestion;

        }

        protected override void GenerateAndStoreAnswerSubmissionsForQuestion(IQuestion question)
        {

            //TODO: When it comes time to implement logins, make this method generate an answer submission for each method for each user.

            EditableAnswerSubmission newAnswerSubmission = new EditableAnswerSubmission { 
                Question = question,
                Answer = null,
                State = AnswerSubmissionState.NO_ANSWER,
                ValidatedByUser = false
            };

            _answerSubmissions.Add(newAnswerSubmission);

        }

        protected override void RemoveStoredQuestionWithId(long questionId)
        {
            _questions.RemoveWhere(q => q.Id == questionId);
        }

        protected override void RemoveStoredAnswerSubmissionsForQuestionWithId(long questionId)
        {
            _answerSubmissions.RemoveWhere(q => q.Question.Id == questionId);
        }

        public override void UpdateAnswerToQuestion(long questionId, string answerText)
        {

            bool submissionHasQuestionWithProvidedId(EditableAnswerSubmission s) => s.Question.Id == questionId;


            if (!_answerSubmissions.Any(submissionHasQuestionWithProvidedId))
                throw new ArgumentException("A submission for a question with id '" + questionId + "' could not be found.");

            if(_answerSubmissions.Where(submissionHasQuestionWithProvidedId).Count() > 1)
                throw new Exception("There are multiple submissions for a question with id '" + questionId + "'.");


            EditableAnswerSubmission answerSubmission = _answerSubmissions.First(submissionHasQuestionWithProvidedId);
            answerSubmission.Answer = answerText;
            answerSubmission.State = AnswerSubmissionState.PENDING_JUDGE_APPROVAL;

        }

       
    }

}
