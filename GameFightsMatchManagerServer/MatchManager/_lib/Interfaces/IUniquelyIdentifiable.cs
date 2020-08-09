using System.Text.Json.Serialization;

namespace MatchManager
{

    /// <summary>
    /// An object with a value that can be used to uniquely identify it from other objects of the same type.
    /// </summary>
    /// <typeparam name="I">Type of value used to uniquly identify the object.</typeparam>
    public interface IUniquelyIdentifiable<out I>
    {

        [JsonPropertyName("id")] I Id { get; }

    }

}
