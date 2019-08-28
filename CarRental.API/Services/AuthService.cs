using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class AuthService:IAuthService
    {
        private readonly IGenericRepository<AspNetUsers> _genericRepository;
        private readonly IAppLogger<AuthService> _logger;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;

        public AuthService(IGenericRepository<AspNetUsers> genericRepository, IAppLogger<AuthService> logger, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _userManager = userManager;
            _signInManager = signInManager;
        }

        public async Task<AspNetUsers> Login(string username, string password)
        {
            try
            {
                var user = await _genericRepository.FindOne(x => x.UserName.ToLower() == username.ToLower());

                if (user == null)
                    return null;

                var result = await _signInManager.PasswordSignInAsync(user.Email, password, false, lockoutOnFailure: true);
                if (result.Succeeded)
                {
                    return user;
                }
                else
                {
                    return null;
                }

            }
            catch (Exception ex)
            {

                Logger(ex, "Login user faild");


                return null;
            }
  
        }

        public async Task<AspNetUsers> Register(AspNetUsers user, string password)
        {

            try
            {
                var userIdentity = new IdentityUser { UserName = user.UserName, Email = user.UserName };
                var result = await _userManager.CreateAsync(userIdentity, password);

                if (result.Succeeded)
                {
                    var userToReturn = await _genericRepository.FindOne(x=>x.UserName.ToLower() == userIdentity.UserName);
                    return userToReturn;
                }
                else
                {
                    return null;

                }
              
            }
            catch (Exception ex)
            {

                Logger(ex, "Register user faild");

                return null;
            }
           
        }

        public async Task<bool> UserExists(string username)
        {
            try
            {
                var users = await _genericRepository.GetAll();

                if (users.Any(x => x.UserName == username))
                    return true;
                else
                    return false;
            }
            catch (Exception ex)
            {

                Logger(ex, "User exist method faild");
                return false;
            }
          
        }
        private void Logger(Exception ex, string message)
        {
            var errorMessage = (ex.InnerException?.Message != null ? ex.InnerException.Message : ex.Message);

            var className = this.GetType().Name;

            MethodBase method = MethodBase.GetCurrentMethod();
            string methodName = method.ReflectedType.Name;
            string fullMethodName = className + " " + methodName;

            _logger.LogError(message + errorMessage + ", " + fullMethodName);
        }
    }
}
