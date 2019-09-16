using CarRental.API.Dtos;
using CarRental.API.Helpers;
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
        Task<PagedList<AspNetUsers>> GetFilteredUsersAsync(PaginationParams userParams);
        Task DeleteUserAsync(AspNetUsers user);
        Task<AspNetUsers> GetUserByIdAsync(string id);
        Task<AspNetUsers> GetUserIdByEmail(string email);
    }
}
