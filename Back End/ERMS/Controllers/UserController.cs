using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ERMS.Controllers
{
    [Route("[controller]")]
    public class UserController
    {
        [HttpGet()]
        public List<User> Get()
        {
            return Data.Users;
        }
    }
}