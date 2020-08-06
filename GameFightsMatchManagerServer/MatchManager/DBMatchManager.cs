using System.Collections.Generic;

namespace MatchManager
{

    /// <summary>
    /// A Match Manager that retrieves match data stored in a database.
    /// </summary>
    public class DBMatchManager : IMatchManager
    {

        public DBMatchManager()
        {

        }

        public IMatch Match => throw new System.NotImplementedException();

        public IFighter User => throw new System.NotImplementedException();

        public IEnumerable<IMatchData> GetInvitationsForUser(string userId)
        {
            throw new System.NotImplementedException();
        }

        public IMatch LoadMatchForUser(string userId)
        {
            throw new System.NotImplementedException();
        }

    }

}
