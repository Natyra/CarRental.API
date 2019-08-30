using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IUserService
    {
        Task<string> GetUserNameAsync(string id);
        Task<IEnumerable<AspNetUsers>> GetUsersAsync();
        Task DeleteUserAsync(AspNetUsers user);
        Task<AspNetUsers> GetUserByIdAsync(string id);
    }
}
