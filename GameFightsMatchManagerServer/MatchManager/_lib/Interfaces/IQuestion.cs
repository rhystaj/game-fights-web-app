using System.Text.Json.Serialization;

namespace MatchManager
{

    public interface IQuestion : IUniquelyIdentifiable<long>
    {

        [JsonPropertyName("text")] string Text { get; }

    }

}
