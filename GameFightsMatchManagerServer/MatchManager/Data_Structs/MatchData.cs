using System.Collections.Generic;

namespace MatchManager
{
    public class MatchData : IMatchData
    {

        public MatchData(string title, IMatchDates dates, IFighter judge, IEnumerable<IFighter> invitedFighters)
        {
            Title = title;
            Dates = dates;
            Judge = judge;
            InvitedFighters = invitedFighters;
        }

        public string Title { get; }

        public IMatchDates Dates { get; }

        public IFighter Judge { get; }

        public IEnumerable<IFighter> InvitedFighters { get; }
    }

}
