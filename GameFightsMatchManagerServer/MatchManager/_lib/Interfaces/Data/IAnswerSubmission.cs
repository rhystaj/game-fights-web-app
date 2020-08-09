using System.Text.Json.Serialization;

namespace MatchManager
{

    /// <summary>
    /// A submission for an answer a question.
    /// </summary>
    public interface IAnswerSubmission
    {

        /// <summary>
        /// The question the answer in the submission is answering.
        /// </summary>
        [JsonPropertyName("question")] string Question { get; }

        /// <summary>
        /// The answer to the question.
        /// </summary>
        [JsonPropertyName("answer")] string Answer { get; }

        /// <summary>
        /// The state of the answer submission in relation to the match.
        /// </summary>
        [JsonPropertyName("state")] AnswerSubmissionState State { get; }

        /// <summary>
        /// Whether the answer has been validated.
        /// </summary>
        [JsonPropertyName("validatedByUser")] bool ValidatedByUser { get; }

    }

}
