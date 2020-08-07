using Microsoft.AspNetCore.Mvc;

using MatchManager;

namespace MatchManagerAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class MatchDataController : ControllerBase
    {

        private IMatchManager _matchManager;

        public MatchDataController(IMatchManager matchManager)
        {
            _matchManager = matchManager;
        }

        /// <summary>
        /// Retrieve the data for the match the user is currently involved in.
        /// </summary>
        [HttpGet]
        public IMatchData Get()
        {
            return _matchManager.Match;
        }

        /// <summary>
        /// Update the title the match is referred to by.
        /// </summary>
        /// <param name="title"></param>
        [HttpPut][Route("updateTitle")]
        public IActionResult UpdateTitle([FromBody] string title)
        {
            _matchManager.Match.Title = title;
            return Ok();
        }

        /// <summary>
        /// Updates the significant dates for the match.
        /// </summary>
        /// <param name="matchDates"></param>
        /// <returns></returns>
        [HttpPut][Route("updateDates")]
        public IActionResult UpdateDates(MatchDates matchDates)
        {
            _matchManager.Match.Dates = matchDates;
            return Ok();
        }

        /// <summary>
        /// Send invites for the match to a collection of fighters.
        /// </summary>
        /// <param name="fighters"></param>
        /// <returns></returns>
        [HttpPost][Route("inviteFighters")]
        public IActionResult InviteFighters(IFighter[] fighters)
        {
            throw new System.NotImplementedException();
        }

    }

}
