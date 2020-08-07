using System.Collections.Generic;
using System.Linq;

using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatch : IMatch
    {

        private HashSet<IFighter> _invitedFighters = new HashSet<IFighter>();

        public IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

        public string Title { get; set; }

        public IMatchDates Dates { get; set; }

        public IFighter Judge { get; }

        public IEnumerable<IFighter> InvitedFighters => _invitedFighters;

        public void InviteFighters(IEnumerable<IFighter> fighters)
        {
            foreach (IFighter fighter in fighters)
                _invitedFighters.Add(fighter);
        }

        public void UninviteFighters(IEnumerable<IFighter> fighters)
        {
            _invitedFighters.RemoveWhere(f => fighters.Contains(f));
        }

    }

}
