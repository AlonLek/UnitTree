using MicroService4Net;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Newtonsoft.Json.Serialization;

namespace BE
{
    class Program
    {
        static void Main(string[] args)
        {
            var microService = new MicroService(configure: conf =>
            {
                conf.Formatters.JsonFormatter.SerializerSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
                conf.Formatters.JsonFormatter.UseDataContractJsonSerializer = false;

            });
            microService.Run(args);


        }
    }
}
