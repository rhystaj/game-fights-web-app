using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatch : IMatch
    {
        public IMatchStatus Status => new MatchStatus(UserMatchStatus.JUDGING, MatchStage.ANSWERS_OPENED);

    }

}
