using Microsoft.AspNetCore.Mvc;

using MatchManager;
using System.Collections.Generic;
using Microsoft.AspNetCore.Routing;

namespace MatchManagerAPI.Controllers
{

    /// <summary>
    ///Provides access to data about a match.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MatchStatusController : ControllerBase
    {

        private readonly IMatchManager _matchManager;

        public MatchStatusController(IMatchManager matchManager)
        {
            _matchManager = matchManager;
        }

        /// <summary>
        /// Retrieve the status of the current match in relation to the user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IMatchStatus Get()
        {
            return _matchManager.Match.Status;
        }

        /// <summary>
        /// Create a new match to be judged.
        /// </summary>
        /// <returns></returns>
        [HttpPost][Route("api/[controller]/judgeNew")]
        public IActionResult JudgeNew()
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Retrieve the matches that the user has been invited to.
        /// </summary>
        /// <returns></returns>
        [HttpGet][Route("invitations")]
        public IEnumerable<IMatchData> GetInvitations()
        {
            return _matchManager.GetInvitationsForUser("doesn't really matter about the id at this point.");
        }

        /// <summary>
        /// Have a user accept an invitation to a match and participate in it.
        /// </summary>
        /// <param name="invitationId"></param>
        /// <returns></returns>
        [HttpPatch][Route("api/[controller]/acceptInvitation")]
        public IActionResult AcceptInvitation(long invitationId)
        {
            throw new System.NotImplementedException();
        }

    }

}
