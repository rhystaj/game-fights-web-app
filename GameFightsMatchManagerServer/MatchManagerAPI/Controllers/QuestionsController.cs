using System;
using System.Collections.Generic;

using Microsoft.AspNetCore.Mvc;

using MatchManager;

namespace MatchManagerAPI.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class QuestionsController : ControllerBase
    {
        private readonly IMatchManager _matchManager;

        public QuestionsController(IMatchManager matchManager)
        {
            _matchManager = matchManager;
        }

        [HttpGet]
        public IEnumerable<IQuestion> GetQuestions()
        {
            return _matchManager.Match.Questions;
        }

        [HttpPost][Route("submit")]
        public IActionResult SubmitQuestion([FromBody] string questionText)
        {
            
            try
            {
                _matchManager.Match.SubmitQuestion(questionText);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpDelete][Route("removeById")]
        public IActionResult DeleteQuestion([FromBody] long questionId)
        {

            try
            {
                _matchManager.Match.RemoveQuestion(questionId);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

    }

}
