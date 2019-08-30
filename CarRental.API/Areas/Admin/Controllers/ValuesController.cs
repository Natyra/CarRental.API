using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        public class KeyValue {
            public int Key { get; set; }
            public string Value { get; set; }
        }

        // GET api/values
        [HttpGet]
        public IActionResult GetValues()
        {

            var values = new List<KeyValue>();

            values.Add(new KeyValue
            {
                Key = 1,
                Value = "Value 1"
            });

            values.Add(new KeyValue
            {
                Key = 2,
                Value = "Value 2"
            });

            return Ok(values);
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public ActionResult<string> Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
