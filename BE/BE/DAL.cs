using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Raven;
using Raven.Client;
using Raven.Client.Document;
using Raven.Abstractions.Data;
using Raven.Json.Linq;

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

        public void InsertPeople()
        {
            Person root = new Person()
            {
                Id = "-1",
                Name = Guid.NewGuid().ToString()
            };

            InsertPerson(root);


            for (int i = 0; i < 5; i++)
            {
                Person raan = new Person()
                {
                    Id = i.ToString(),
                    Name = Guid.NewGuid().ToString(),
                    ParentId = "-1"
                };
                InsertPerson(raan);

                for (int j = 0; j < 5; j++)
                {

                    Person ramad = new Person()
                    {
                        Id = i.ToString() + j.ToString(),
                        Name = Guid.NewGuid().ToString(),
                        ParentId = i.ToString()
                    };

                    InsertPerson(ramad);

                    for (int k = 0; k < 5; k++)
                    {

                        Person rashach = new Person()
                        {
                            Id = i.ToString() + j.ToString() + k.ToString(),
                            Name = Guid.NewGuid().ToString(),
                            ParentId = i.ToString() + j.ToString()
                        };

                        InsertPerson(rashach);
                        for (int l = 0; l < 5; l++)
                        {
                            Person haial = new Person()
                            {
                                Id = i.ToString() + j.ToString() + k.ToString() + l.ToString(),
                                Name = Guid.NewGuid().ToString(),
                                ParentId = i.ToString() + j.ToString() + k.ToString()
                            };
                            InsertPerson(haial);
                        }
                    }
                }


            }
        }

        public void InsertPerson(Person person)
        {
            using (IDocumentStore store = new DocumentStore
            {
                Url = $"http://{_ip}:{_port}/",
                DefaultDatabase = "UnitTree"
            })
            {
                store.Initialize();

                using (IDocumentSession session = store.OpenSession())
                {
                    session.Store(person);
                    session.SaveChanges();
                    if (person.ParentId != person.Id)
                    {
                        session.Store(person);
                        session.SaveChanges();
                    }
                }
            }
        }

        public void DeletePerson(string id)
        {
            using (IDocumentStore store = new DocumentStore
            {
                Url = $"http://{_ip}:{_port}/",
                DefaultDatabase = "UnitTree"
            })
            {
                store.Initialize();

                using (IDocumentSession session = store.OpenSession())
                {
                    session.Delete(id);
                    session.SaveChanges();
                }
            }
        }

        public void ChangeParent(string id, string newdParentId)
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
                    Person person =  GetPerson(id);
                    Person parent = GetPerson(newdParentId);
                    if(person != null && parent!=null)
                    {
                        person.ParentId = newdParentId;
                        DeletePerson(person.Id);
                        InsertPerson(person);
                        
                    }
                }
            }
        }
    }
}
