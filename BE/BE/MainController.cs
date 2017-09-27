using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using BE.Model;

namespace BE
{
    public class MainController : ApiController
    {
        [Route("Data")]
        public Tree GetData()
        {
            return new Tree
            {
                Nodes = new List<Node>() { new Node("a"), new Node("b"), new Node("c") },
                Edges = new List<Edge>() { new Edge() { From = "a", To = "b" }, new Edge() { From = "a", To = "c" } }
            };
        }
    }
}
