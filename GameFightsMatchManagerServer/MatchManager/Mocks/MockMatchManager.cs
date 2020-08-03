namespace MatchManager.Mocks
{
    public class MockMatchManager : IMatchManager
    {
        public IMatch Match => throw new System.NotImplementedException();

        public IMatch LoadMatchForUser(string userId)
        {
            throw new System.NotImplementedException();
        }

    }

}
