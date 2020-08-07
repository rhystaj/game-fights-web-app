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
        /// Invite fighters to participate in the match.
        /// </summary>
        /// <param name="fighters"></param>
        void InviteFighters(IEnumerable<IFighter> fighters);

        /// <summary>
        /// Uninvite fighters that have already been invited so they can no longer participate in the match.
        /// </summary>
        /// <param name="fighters"></param>
        void UninviteFighters(IEnumerable<IFighter> fighters);
    }

}
