using MatchManager;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Razor.TagHelpers;
using System;
using System.Collections.Generic;

namespace MatchManagerAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class AnswerSubmissionsController : ControllerBase
    {

        IMatchManager _matchManager;

        public AnswerSubmissionsController(IMatchManager matchManager)
        {
            _matchManager = matchManager;
        }

        [HttpGet]
        public IEnumerable<IAnswerSubmission> Get()
        {
            return _matchManager.Match.AnswerSubmissions;
        }

        [HttpPatch][Route("updateAnswerToQuestion")]
        public IActionResult UpdateAnswerToQuestion([FromBody] long questionId, [FromBody] string answerText)
        {
            
            try
            {
                _matchManager.Match.UpdateAnswerToQuestion(questionId, answerText);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e);
            }

        }

    }

}
