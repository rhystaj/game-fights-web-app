namespace MatchManager
{
    public struct Fighter : IFighter
    {

        public Fighter(string name, FighterMatchStatus status, string profileImageURL)
        {
            Name = name;
            Status = status;
            ProfileImageURL = profileImageURL;
        }

        public string Name { get; }

        public FighterMatchStatus Status { get; }

        public string ProfileImageURL { get; }

    }

}
