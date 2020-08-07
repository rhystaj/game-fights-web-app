using MatchManager;
using System.Collections.Generic;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatchData : IMatchData
    {

        public MockMatchData(string title, IMatchDates dates, IFighter judge, IEnumerable<IFighter> invitedFighters)
        {
            Title = title;
            Dates = dates;
            Judge = judge;
            InvitedFighters = invitedFighters;
        }

        public string Title { get; set; }

        public IMatchDates Dates { get; set; }

        public IFighter Judge { get; }

        public IEnumerable<IFighter> InvitedFighters { get; }

    }

}
