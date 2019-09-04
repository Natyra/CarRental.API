using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Areas.Admin.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    //[Authorize(Roles = "Admin")]
    public class UserController : Controller
    {
        private IUserService _userService;
        private IGenericRepository<AspNetUsers> _genericRepository;

        public UserController(IUserService userService, IGenericRepository<AspNetUsers> genericRepository)
        {
            _userService = userService;
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var model = new List<UserDto>();
            var usersAsync = await _userService.GetUsersAsync();
            var users = usersAsync.ToList();

            if (users == null || users.Count <= 0)
                return BadRequest("Users not found");

            for (int i = 0; i < users.Count(); i++)
            {
                model.Add(new UserDto
                {
                   Id = users[i].Id,
                   UserName = users[i].UserName,
                   Email = users[i].Email,
                   FirstName = users[i].FirstName,
                   LastName = users[i].LastName,
                   PhoneNumber = users[i].PhoneNumber
                });
            }

            return Ok(model);
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteUser(string id)
        {
            var user = await _userService.GetUserByIdAsync(id);

            if (user == null)
                return BadRequest("User not found");

            await _userService.DeleteUserAsync(user);

            return Ok(new
            {
                status = 200,
                message = "User deleted successfully!"
            });

        }
    }
}