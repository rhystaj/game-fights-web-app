using MatchManager;
using System.Collections.Generic;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatch : IMatch
    {
        public IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

        public string Title { get; set; }

        public IMatchDates Dates { get; set; }

        public IFighter Judge { get; }

        public IEnumerable<IFighter> InvitedFighters { get; }
    }

}
