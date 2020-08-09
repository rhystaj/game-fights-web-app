using Microsoft.Win32.SafeHandles;
using System.Collections.Generic;

namespace MatchManager
{

    public interface IMatch : IEditableMatchData
    {

        /// <summary>
        /// Information on the status of the match.
        /// </summary>
        IMatchStatus Status { get; }

        /// <summary>
        /// The collections of questions being posed for the match.
        /// </summary>
        IEnumerable<IQuestion> Questions { get; }

        /// <summary>
        /// Invite fighters to participate in the match.
        /// </summary>
        /// <param name="fighters"></param>
        void InviteFighters(IEnumerable<IFighter> fighters);

        /// <summary>
        /// Uninvite fighters that have already been invited so they can no longer participate in the match.
        /// </summary>
        /// <param name="fighters"></param>
        void UninviteFighters(IEnumerable<IFighter> fighters);

        /// <summary>
        /// Submit a question that will be asked as part of the match.
        /// </summary>
        /// <param name="questionText">The text for the question to be added to the match.</param>
        /// <returns>True iif the question was successfully added, false otherwise.</returns>
        void SubmitQuestion(string questionText);

        /// <summary>
        /// Remove the question from the match with the given id.
        /// </summary>
        /// <param name="id">The id of the question to remove from the match.</param>
        /// <returns>True iif the question was successfully removed.</returns>
        void RemoveQuestion(long id);

    }

}
