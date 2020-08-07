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

        [HttpGet]
        public IEnumerable<IQuestion> GetQuestions()
        {
            throw new NotImplementedException();
        }

        [HttpPost]
        public IActionResult PostQuestion(Question question)
        {
            throw new NotImplementedException();
        }

        [HttpDelete]
        public IActionResult DeleteQuestion(Question question)
        {
            throw new NotImplementedException();
        }

    }

}
