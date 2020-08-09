using System;

namespace MatchManager
{

    /// <inheritdoc/>
    public struct Fighter : IFighter
    {

        public Fighter(Guid id, string name, FighterMatchStatus status, string profileImageURL)
        {
            Id = id;
            Name = name;
            Status = status;
            ProfileImageURL = profileImageURL;
        }

        public Guid Id { get; }

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
