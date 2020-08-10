using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;

namespace MatchManager
{

    /// <summary>
    /// 
    /// </summary>
    /// <inheritdoc/>
    public abstract class AbstractMatch : IMatch
    {

        public abstract string Title { get; set; }

        public abstract IMatchDates Dates { get; set; }

        public abstract IMatchStatus Status { get; }

        public abstract IFighter Judge { get; }

        public abstract IEnumerable<IFighter> InvitedFighters { get; }

        public abstract IEnumerable<IQuestion> Questions { get; }

        public abstract IEnumerable<IAnswerSubmission> AnswerSubmissions { get; }

        public abstract void InviteFighters(IEnumerable<IFighter> fighters);

        public abstract void UninviteFighters(IEnumerable<IFighter> fighters);

        public void SubmitQuestion(string questionText)
        {

            //TODO: When it comes time to implement logins, make this method generate an answer submission for each question for each user.

            IQuestion newQuestion = GenerateAndStoreNewQuestion(questionText);
            
            Debug.Assert(Questions.Where(q => q.Id == newQuestion.Id).Count() == 1,
                "Assertion Fail: There should only be one question with the id of '" + newQuestion.Id + "'." );


            GenerateAndStoreAnswerSubmissionsForQuestion(newQuestion);

        }

        /// <summary>
        /// Create a new Question object that has the specified text, store it with the rest of the questions, and return a reference.
        /// </summary>
        /// <param name="questionText">The text the new question object will have.</param>
        /// <returns>A reference to the newly created question.</returns>
        protected abstract IQuestion GenerateAndStoreNewQuestion(string questionText);

        /// <summary>
        /// Create new AnswerSubmission objects that particpants can use to store their anwers to a question and store them with the
        /// rest of the answer submissions.
        /// </summary>
        /// <param name="question">The question to create the answer submissions for.</param>
        protected abstract void GenerateAndStoreAnswerSubmissionsForQuestion(IQuestion question);

        public void RemoveQuestion(long questionId)
        {

            //Preconditions
            if (!Questions.Any(q => q.Id == questionId))
                throw new ArgumentException("There is no question with the id '" + questionId + "' in the match.");


            RemoveStoredQuestionWithId(questionId);
            RemoveStoredAnswerSubmissionsForQuestionWithId(questionId);


            //Postconditions
            Debug.Assert(!Questions.Any(q => q.Id == questionId),
                "Postcondition: There should no longer be any question with a id of '" + questionId + "' in the match.");
            Debug.Assert(!AnswerSubmissions.Any(s => s.Question.Id == questionId),
                "Postcondition Fail: There should no longer be any answer submissions for questions with the id '" + questionId + "' " +
                "in the match.");

        }

        /// <summary>
        /// Remove the question with the specified id from where it is being stored.
        /// </summary>
        /// <param name="id">The id of the question to be removed.</param>
        protected abstract void RemoveStoredQuestionWithId(long id);

        /// <summary>
        /// Remove all answer submissions for a question with a given id from there they are being stored.
        /// </summary>
        /// <param name="id">The id of the question for which to remove the answer submissions.</param>
        protected abstract void RemoveStoredAnswerSubmissionsForQuestionWithId(long id);
        
        public abstract void UpdateAnswerToQuestion(long questionId, string answerText);
    }

}
