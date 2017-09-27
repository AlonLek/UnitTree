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

        [Route("AllData")]
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
            if (person == null)
                return null;

            return new PersonStats
            {
                Id = person.Id,
                Name = person.Name,
                Parent = person.ParentId
            };
        }

        [Route("DeleteData")]
        public void GetDeleteById(string id)
        {
            _dal.DeletePerson(id);
        }


        [Route("InsertData")]
        public void PutPerson(string name, string parentId)
        {

            _dal.InsertPerson(new Person {
                Id = Guid.NewGuid().ToString(),
                ParentId = parentId,
                Name = name
            });
        }

        [Route("UpdateData")]
        public void GetUpdatePerson(string id, string newPerentId)
        {
            _dal.ChangeParent(id, newPerentId);
        }
    }
}
