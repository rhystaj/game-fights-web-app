namespace MatchManager
{
    public struct MatchStatus : IMatchStatus
    {
        public UserMatchStatus UserMatchStatus { get; }

        public MatchStage MatchStage { get; }

        public MatchStatus(UserMatchStatus userMatchStatus, MatchStage matchStage)
        {
            UserMatchStatus = userMatchStatus;
            MatchStage = matchStage;
        }

    }

}
