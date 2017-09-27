using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raven;
using Raven.Client;
using Raven.Client.Document;

namespace BE
{
    
    public class DAL
    {
        private string _ip;
        private string _port;

        public DAL(string ip, string port)
        {
            _ip = ip;
            _port = port;
        }

        public List<Person> GetAllPeople()
        {
            using (IDocumentStore store = new DocumentStore
            {
                Url = $"http://{_ip}:{_port}/", // server URL
                DefaultDatabase = "UnitTree"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    //Person person = new Person
                    //{
                    //    Id = "yael",
                    //    Name = "",
                    //    ParentId = "3"
                    //};

                    //session.Store(person); // stores employee in session, assigning it to a collection `Employees`
                    //string employeeId = person.Id; // Session.Store will assign Id to employee, if it is not set

                    //session.SaveChanges(); // sends all changes to server

                    // Session implements Unit of Work pattern,
                    // therefore employee instance would be the same and no server call will be made

                    return session.Query<Person>().ToList();
                    

                }
            }
        }

        public Person GetPerson(string id)
        {
            using (IDocumentStore store = new DocumentStore
            {
                Url = $"http://{_ip}:{_port}/", // server URL
                DefaultDatabase = "UnitTree"   // default database
            })
            {
                store.Initialize(); // initializes document store, by connecting to server and downloading various configurations

                using (IDocumentSession session = store.OpenSession()) // opens a session that will work in context of 'DefaultDatabase'
                {
                    return session.Load<Person>(id);
                }
            }
        }
    }
}
