using ERMS.Models;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;

namespace ERMS.Controllers
{
    [Route("[controller]")]
    public class SupplyController
    {
        [HttpGet()]
        public List<Supply> Get()
        {
            return Data.Supplies;
        }
    }
}