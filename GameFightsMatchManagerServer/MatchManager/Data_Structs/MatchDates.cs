using System;

namespace MatchManager
{

    public struct MatchDates : IMatchDates
    {

        public DateTime Match { get; }

        public DateTime Open { get; }

        public DateTime Close { get; }

        public MatchDates(DateTime match, DateTime open, DateTime close)
        {
            Match = match;
            Open = open;
            Close = close;
        }

    }

}
