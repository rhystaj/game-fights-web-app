using System.Text.Json.Serialization;

namespace MatchManager
{
    public interface IMatchStatus
    {

        [JsonPropertyName("userMatchStatus")] UserMatchStatus UserMatchStatus { get; }

        [JsonPropertyName("matchStage")] MatchStage MatchStage { get; }

    } 
}
