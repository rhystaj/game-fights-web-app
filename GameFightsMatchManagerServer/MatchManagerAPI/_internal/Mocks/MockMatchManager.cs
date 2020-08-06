using System;
using System.Collections.Generic;

using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{
    internal class MockMatchManager : IMatchManager
    {

        private static readonly IFighter[] MOCK_FIGHTERS = new IFighter[]
        {
            new Fighter("Rhys", FighterMatchStatus.PARTICIPATING, "dfjwebfhw"),
            new Fighter("Saylor", FighterMatchStatus.DECLINED, "sksn dhfsf"),
            new Fighter("Brett", FighterMatchStatus.AVALIABLE, "sufhwejkfbnwekjfbweif"),
            new Fighter("Cameron", FighterMatchStatus.PARTICIPATING, "mfngkgwbnegkweg"),
            new Fighter("Vaughan", FighterMatchStatus.ENGAGED, "qoweijngng")
        };
        
        public IMatch Match { get; private set; }

        public IFighter User => throw new System.NotImplementedException();

        public MockMatchManager()
        {
            Match = new MockMatch();
        }

        public IMatch LoadMatchForUser(string userId)
        {
            throw new System.NotImplementedException("For now, testing the match management doesn't require testing user logins; " +
                "I will probably need to provide a mock implementation for this method when I get to the point that I will need to " +
                "test logging in.");
        }

        public IEnumerable<IMatchData> GetInvitationsForUser(string userId)
        {
            return new IMatchData[]
            {

                new MatchData(
                    title: "The Best Match Ever!",
                    dates: new MatchDates(
                                match: new DateTime(2017, 3, 5, 17, 30, 20),
                                open: new DateTime(2017, 4, 1, 4, 45, 43),
                                close: new DateTime(2017, 4, 23, 11, 27, 3)
                           ),
                    judge: MOCK_FIGHTERS[0],
                    invitedFighters: new IFighter[]
                    {
                        MOCK_FIGHTERS[1],
                        MOCK_FIGHTERS[2],
                        MOCK_FIGHTERS[3],
                    }
                ),

                new MatchData(
                    title: "The ACTUAL Best Match Ever!",
                    dates: new MatchDates(
                                match: new DateTime(1997, 12, 3, 15, 25, 7),
                                open: new DateTime(1998, 10, 17, 12, 2, 1),
                                close: new DateTime(1998, 12, 4, 6, 7, 8)
                           ),
                    judge: MOCK_FIGHTERS[2],
                    invitedFighters: new IFighter[]
                    {
                        MOCK_FIGHTERS[4]
                    }
                )

            };
        }
    }

}
