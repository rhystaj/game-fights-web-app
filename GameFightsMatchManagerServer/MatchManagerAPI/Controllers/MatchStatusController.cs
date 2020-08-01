using Microsoft.AspNetCore.Mvc;

using MatchManager;

namespace MatchManagerAPI.Controllers
{

    /// <summary>
    ///Provides access to data about a match.
    /// </summary>
    [Route("api/[controller]")]
    [ApiController]
    public class MatchStatusController : ControllerBase
    {

        /// <summary>
        /// Retrieve the status of the current match in relation to the user.
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public IMatchStatus Get()
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Create a new match to be judged.
        /// </summary>
        /// <returns></returns>
        [Route("api/[controller]/judgeNew")]
        [HttpPost]
        public IActionResult JudgeNew()
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Retrieve the matches that the user has been invited to.
        /// </summary>
        /// <returns></returns>
        [Route("api/[controller]/invitations")]
        [HttpGet]
        public IMatchData[] GetInvitations()
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Have a user accept an invitation to a match and participate in it.
        /// </summary>
        /// <param name="invitationId"></param>
        /// <returns></returns>
        [Route("api/[controller]/acceptInvitation")]
        [HttpPatch]
        public IActionResult AcceptInvitation(long invitationId)
        {
            throw new System.NotImplementedException();
        }

    }

}
