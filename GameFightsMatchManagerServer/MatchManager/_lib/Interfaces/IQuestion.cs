using System.Text.Json.Serialization;

namespace MatchManager
{

    public interface IQuestion
    {

        [JsonPropertyName("id")] long Id { get; }

        [JsonPropertyName("text")] string Text { get; }

    }

}
