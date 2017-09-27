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
        private DAL _dal;
        const string ip = "10.10.247.133";
        const string port = "8080";

        public MainController()
        {
             _dal = new DAL(ip, port);
        }

        [Route("Data")]
        public Tree GetTree()
        {
            var people = _dal.GetAllPeople();
            var nodes = new List<Node>();
            var edges = new List<Edge>();
            foreach (var person in people)
            {
                nodes.Add(new Node(person.Id, person.Name, person.ParentId));
                if(person.ParentId != null)
                    edges.Add(new Edge(person.ParentId,person.Id));
            }

            return new Tree
            {
                Nodes = nodes,
                Edges = edges
            };
        }

        [Route("DataById")]
        public PersonStats GetById(string id)
        {
            var person = _dal.GetPerson(id);

            return new PersonStats
            {
                Id = person.Id,
                Name = person.Name
            };
        }

        [Route("DeleteData")]
        public void GetDeleteById(string id)
        {
            _dal.deletePerson(id);
        }

    }
}
