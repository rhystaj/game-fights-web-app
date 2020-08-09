using System;
using System.Collections.Generic;
using System.Linq;

using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatch : IMatch
    {

        private readonly HashSet<IFighter> _invitedFighters = new HashSet<IFighter>();

        private readonly HashSet<IQuestion> _questions = new HashSet<IQuestion>();

        public IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

        public string Title { get; set; }

        public IMatchDates Dates { get; set; }

        public IFighter Judge { get; }

        public IEnumerable<IFighter> InvitedFighters => _invitedFighters;

        public IEnumerable<IQuestion> Questions => _questions;

        public void InviteFighters(IEnumerable<IFighter> fighters)
        {
            foreach (IFighter fighter in fighters)
                _invitedFighters.Add(fighter);
        }

        public void UninviteFighters(IEnumerable<IFighter> fighters)
        {
            _invitedFighters.RemoveWhere(f => fighters.Contains(f));
        }

        public void SubmitQuestion(string questionText)
        {
            //Add the question with any id - for mock purposes it doesn't matter. In this case make it the hash code so it is
            //at least consistent.
            if (!_questions.Add(new Question(questionText.GetHashCode(), questionText)))
            {
                throw new Exception("The question '" + questionText + "' could not be added to the match.");
            };
        }

        public void RemoveQuestion(long questionId)
        {

            if(_questions.FirstOrDefault(q => q.Id == questionId) == null)
            {
                throw new ArgumentException("There is no question with id '" + questionId + "' that has been added to the match.");
            }

            if(_questions.RemoveWhere(q => q.Id == questionId) <= 0)
            {
                throw new Exception("The question with id '" + questionId + "' could not be removed from the match.");
            }

        }

    }

}
