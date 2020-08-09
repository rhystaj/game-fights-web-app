using System;
using System.Text.Json.Serialization;

namespace MatchManager
{

    /// <summary>
    /// Information on users that can participate in matches.
    /// </summary>
    public interface IFighter : IUniquelyIdentifiable<Guid>
    {
        /// <summary>
        /// The name this fighter is referred to by.
        /// </summary>
        [JsonPropertyName("name")] string Name { get; }

        /// <summary>
        /// The fighter's status in relation to a match.
        /// </summary>
        [JsonPropertyName("status")] FighterMatchStatus Status { get; }

        /// <summary>
        /// The URL that links to the fighter's profile image.
        /// </summary>
        [JsonPropertyName("profileImageURL")] string ProfileImageURL { get; }

    }
}
