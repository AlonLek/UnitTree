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
            DAL dal = new DAL("10.10.247.133", "8080");
            //dal.insertPeople();
            var people = dal.GetAllPeople();
            var nodes = new List<Node>();
            var edges = new List<Edge>();
            foreach (var person in people)
            {
                nodes.Add(new Node(person.Id));
                if (person.ParentId != null)
                    edges.Add(new Edge(person.ParentId, person.Id));
            }

            return new Tree
            {
                Nodes = nodes,
                Edges = edges
            };
        }
    }
}
