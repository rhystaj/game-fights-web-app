namespace MatchManager.Mocks
{
    public class MockMatch : IMatch
    {
        public IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

    }

}
