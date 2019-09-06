using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class LocationService: ILocationService
    {
        private IGenericRepository<Location> _genericRepository;
        private IAppLogger<LocationService> _logger;
        private dbCarRentalContext _context;

        public LocationService(IGenericRepository<Location> genericRepository, IAppLogger<LocationService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }
        public async Task<string> GetLocationAsync(int locationId)
        {
            try
            {
                var locationObj = await _genericRepository.GetById(locationId);

                var location = locationObj.StreetAddress + ", " + locationObj.ZipCode + ", " + locationObj.City + ", " + locationObj.Country;

                return location;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get location faild");
                return "";
            }
        }

        public async Task<PagedList<Location>> GetFilteredLocationsAsync(PaginationParams paginationParams)
        {
            try
            {
                var locations = _context.Location;

                return await PagedList<Location>.CreateAsync(locations, paginationParams.PageNumber, paginationParams.PageSize);
            }
            catch (Exception ex)
            {

                Logger(ex, "Geting locations from db faild");
                return null;
            }
        }

        public async Task<IEnumerable<Location>> GetLocationsAsync()
        {
            try
            {
                return await _genericRepository.GetAll();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting locations from db faild");
                return null;
            }
        }

        public async Task AddLocationAsync(Location location)
        {

            try
            {
                await _genericRepository.Add(location);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add location to db faild");
            }
        }

        public async Task UpdateLocationAsync(Location location)
        {
            try
            {
                _genericRepository.Update(location);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update location to db faild");

            }
        }

        public async Task DeleteLocationAsync(Location location)
        {
            try
            {
                _genericRepository.Remove(location);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete location from db faild");

            }
        }
        public async Task<Location> GetLocationByIdAsync(int id)
        {
            try
            {
                var location = await _genericRepository.GetById(id);
                return location;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get location by id faild");
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
