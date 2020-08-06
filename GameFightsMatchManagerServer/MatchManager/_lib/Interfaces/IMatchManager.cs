using System.Collections.Generic;

namespace MatchManager
{
    /// <summary>
    /// Mananges the match the is currently being edited.
    /// </summary>
    public interface IMatchManager
    {

        /// <summary>
        /// Retrive the Match that is currently loaded into the match manager.
        /// </summary>
        IMatch Match { get; }

        /// <summary>
        /// The user that match curretly loaded into the MatchManager was loaded for.
        /// </summary>
        IFighter User { get; }

        /// <summary>
        /// Load the match the user with the specified id is participating in into the MatchManager.
        /// </summary>
        /// <param name="userId">The id of the user participating in the match to be loaded into the MatchManager.</param>
        /// <returns>The match that is loaded in to the match manager.</returns>
        IMatch LoadMatchForUser(string userId);

        /// <param name="userId">The user to recieve the match data for.</param>
        /// <returns>The data on all matches the given user has been invited to.</returns>
        IEnumerable<IMatchData> GetInvitationsForUser(string userId);

    }

}
