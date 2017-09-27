using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace BE
{
    public class MainController : ApiController
    {
        [Route("Example")]
        public string GetExample()
        {
            return "Example";
        }
    }
}
