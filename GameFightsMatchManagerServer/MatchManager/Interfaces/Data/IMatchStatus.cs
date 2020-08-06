using System.Text.Json.Serialization;

namespace MatchManager
{
    public interface IMatchStatus
    {

        /// <summary>
        /// Describes how the user is involved in the match.
        /// </summary>
        [JsonPropertyName("userMatchStatus")] UserMatchStatus UserMatchStatus { get; }

        /// <summary>
        /// The stage the match is currently in.
        /// </summary>
        [JsonPropertyName("matchStage")] MatchStage MatchStage { get; }

    } 
}
