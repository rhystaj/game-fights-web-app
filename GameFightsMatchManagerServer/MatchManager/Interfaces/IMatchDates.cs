using System;
using System.Collections.Generic;
using System.Text;
using System.Text.Json.Serialization;

namespace MatchManager
{

    /// <summary>
    /// Significant dates in a match.
    /// </summary>
    public interface IMatchDates
    {

        /// <summary>
        /// The date the match will take place.
        /// </summary>
        [JsonPropertyName("match")] DateTime Match { get; }

        /// <summary>
        /// The date from which answers are open, i.e. users can submit thier answers to questions.
        /// </summary>
        [JsonPropertyName("open")] DateTime Open { get; }

        /// <summary>
        /// The date from which answers will be closed, i.e. users can no longer submit answers to them.
        /// </summary>
        [JsonPropertyName("close")] DateTime Close { get; }

    }
}
