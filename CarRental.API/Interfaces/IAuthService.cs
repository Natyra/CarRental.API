using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IAuthService
    {
        Task<AspNetUsers> Login(string username, string password);
        Task<AspNetUsers> Register(AspNetUsers user, string password);
        Task<bool> UserExists(string username);
    }
}
