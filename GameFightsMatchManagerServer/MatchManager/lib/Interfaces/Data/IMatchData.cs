using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace MatchManager
{
    public interface IMatchData
    {

        [JsonPropertyName("title")] string Title { get; }

        [JsonPropertyName("dates")] IMatchDates Dates { get; }

        [JsonPropertyName("judge")] IFighter Judge { get; }

        [JsonPropertyName("invitedFighters")] IEnumerable<IFighter> InvitedFighters { get; }

    }

}
