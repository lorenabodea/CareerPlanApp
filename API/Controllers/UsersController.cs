using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using RestClient.Net;

namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
        private readonly DataContext _context;
        public UsersController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public System.IO.Stream GetUsers()
        {
            // var url = "https://careerplan.eu.auth0.com/api/v2/users?q=email%3A%22lorenabodea%40gmail.com%22&search_engine=v3";

            // var request = WebRequest.Create(url);
            // request.Method = "GET";
            // using var webResponse = request.GetResponse();
            // //using var webStream = webResponse.GetResponseStream();

            // Console.WriteLine(webResponse);
            // return webResponse;

            string sURL;
            sURL = "https://careerplan.eu.auth0.com/api/v2/users?q=email%3A%22jane%40exampleco.com%22&search_engine=v3";
            WebRequest wrGETURL;
            wrGETURL = WebRequest.Create(sURL);
            wrGETURL.Headers.Add("Authorization", "Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IlNENEVMUVhnNWxFaThUZnoyZm1naiJ9.eyJpc3MiOiJodHRwczovL2NhcmVlcnBsYW4uZXUuYXV0aDAuY29tLyIsInN1YiI6ImF1dGgwfDYwODAwZDMwODQyMTljMDA2ODIyZmM5MyIsImF1ZCI6WyJodHRwOi8vbG9jYWxob3N0OjUwMDAiLCJodHRwczovL2NhcmVlcnBsYW4uZXUuYXV0aDAuY29tL3VzZXJpbmZvIl0sImlhdCI6MTYyMzU4NjU1NCwiZXhwIjoxNjIzNjcyOTU0LCJhenAiOiIyS1VWdmMzSUM2QWpIUHdqSlR0UWY5QjhZaGRxaUxnaiIsInNjb3BlIjoib3BlbmlkIHByb2ZpbGUgZW1haWwiLCJwZXJtaXNzaW9ucyI6WyJyZWFkOmNwIiwicmVhZDp1c2VycyJdfQ.a-phKvhV0MzANvnAgucBunh0yee_NM3rUEZ00cYi_53BuGbrsbT7IrWSvDILpPLcn6fqb67Kp6adDKetZdRgje8tuZZ_vhhI9t9PwsFcTS7fP6V5lDwlNiFprlLeW47M-9hbjXvHuBW3zS4-Q_0iTdUeU9MeTExMeKOt8lsGZmdNtlJnJiz9kLKcRv-g-8FbQLS-oQs0E9l3cp-vtwaAsKkBCzVXDyNvnYBsfFeDBXHkVPXHa8sQWY4R0Pn8IrDLG6bmvYNPsPG1FWsk6aNcxe7g77kPDAeNUxilcXy6OiLJOLOsWEZRsXH8sjWKNWE-a8lkUCPyqHKpEpkZjCO-hg");

            Stream objStream;
            objStream = wrGETURL.GetResponse().GetResponseStream();
            Console.WriteLine(objStream);

            return objStream;

            // using var reader = new StreamReader(webStream);
            // var data = reader.ReadToEnd();
        }
        //api/users/3
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUser(int id)
        {
            return await _context.Users.FindAsync(id);
        }
    }
}