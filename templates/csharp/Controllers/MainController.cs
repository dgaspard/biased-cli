using Microsoft.AspNetCore.Mvc;

namespace App.Controllers;

[ApiController]
[Route("/")]
public class MainController : ControllerBase
{
    [HttpGet]
    public IActionResult Index()
    {
        return Ok(new
        {
            message = "Welcome to {{PROJECT_NAME}}",
            problem = "{{PROJECT_PROBLEM}}",
            personas = "{{USER_PERSONAS}}"
        });
    }

    [HttpGet("health")]
    public IActionResult Health()
    {
        return Ok(new
        {
            status = "healthy",
            service = "{{PROJECT_NAME}}"
        });
    }
}
