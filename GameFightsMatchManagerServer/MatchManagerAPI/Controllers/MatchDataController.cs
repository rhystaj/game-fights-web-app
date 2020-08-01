using Microsoft.AspNetCore.Mvc;

using MatchManager;

namespace MatchManagerAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MatchDataController : ControllerBase
    {

        /// <summary>
        /// Retrieve the data for the match the user is currently involved in.
        /// </summary>
        [HttpGet]
        public IMatchData Get()
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Update the title the match is referred to by.
        /// </summary>
        /// <param name="title"></param>
        [HttpPut][Route("api/[controller]/updateTitle")]
        public IActionResult UpdateTitle(string title)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Updates the significant dates for the match.
        /// </summary>
        /// <param name="matchDates"></param>
        /// <returns></returns>
        [HttpPut][Route("api/[controller]/updateDates")]
        public IActionResult UpdateDates(IMatchDates matchDates)
        {
            throw new System.NotImplementedException();
        }

        /// <summary>
        /// Send invites for the match to a collection of fighters.
        /// </summary>
        /// <param name="fighters"></param>
        /// <returns></returns>
        [HttpPost][Route("api/[controller]/inviteFighters")]
        public IActionResult InviteFighters(IFighter[] fighters)
        {
            throw new System.NotImplementedException();
        }

    }

}
