using System;

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
        
        public override bool Equals(object obj)
        {
            return obj is Fighter fighter &&
                   Name == fighter.Name &&
                   Status == fighter.Status &&
                   ProfileImageURL == fighter.ProfileImageURL;
        }

        public override int GetHashCode()
        {
            return HashCode.Combine(Name, Status, ProfileImageURL);
        }
    }

}
