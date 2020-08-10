using MatchManager;

namespace MatchManagerAPI.Internal.Mocks
{

    /// <summary>
    /// An AnswerSubmission for which the values can be edited.
    /// </summary>
    /// <inheritdoc/>
    internal struct EditableAnswerSubmission : IAnswerSubmission
    {

        public IQuestion Question { get; set; }

        public string Answer { get; set; }

        public AnswerSubmissionState State { get; set; }

        public bool ValidatedByUser { get; set; }

    }

}
