namespace MatchManager
{

    public interface IMatch : IMatchData
    {

        /// <summary>
        /// Information on the status of the match.
        /// </summary>
        public IMatchStatus Status { get; }
        
    }

}
