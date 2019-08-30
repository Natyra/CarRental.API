﻿using CarRental.API.Interfaces;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class UserService: IUserService
    {
        private IGenericRepository<AspNetUsers> _genericRepository;
        private IAppLogger<UserService> _logger;
        private dbCarRentalContext _context;

        public UserService(IGenericRepository<AspNetUsers> genericRepository, IAppLogger<UserService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }

        public async Task<string> GetUserNameAsync(string id)
        {
            try
            {
                var user = await _genericRepository.FindOne(x=>x.Id == id);

                return user.FirstName + " " + user.LastName;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get user name faild");
                return "";
            }
        }

        public async Task<IEnumerable<AspNetUsers>> GetUsersAsync()
        {
            try
            {
                return await _genericRepository.GetAll();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting users from db faild");
                return null;
            }
        }

        public async Task DeleteUserAsync(AspNetUsers user)
        {
            try
            {
                _genericRepository.Remove(user);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete user from db faild");

            }
        }
        public async Task<AspNetUsers> GetUserByIdAsync(string id)
        {
            try
            {
                var user = await _genericRepository.FindOne(x=>x.Id == id);
                return user;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get User by id faild");
                return null;
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