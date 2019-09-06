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
    public class FuelTypeService :  IFuelTypeService
    {
        private IGenericRepository<FuelType> _genericRepository;
        private IAppLogger<FuelTypeService> _logger;
        private dbCarRentalContext _context;

        public FuelTypeService(IGenericRepository<FuelType> genericRepository, IAppLogger<FuelTypeService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }

        public async Task<PagedList<FuelType>> GetFilteredFuelTypesAsync(PaginationParams paginationParams)
        {
            try
            {
                var fuelTypes = _context.FuelType;
                return await PagedList<FuelType>.CreateAsync(fuelTypes, paginationParams.PageNumber, paginationParams.PageSize);
            }
            catch (Exception ex)
            {

                Logger(ex, "Geting fuel types from db faild");
                return null;
            }
        }

        public async Task<string> GetFuelTypeNameAsync(int fuelTypeId)
        {
            try
            {
                var fuelType = await _genericRepository.GetById(fuelTypeId);

                return fuelType.Name;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get fuel type name faild");
                return "";
            }
        }

        public async Task<IEnumerable<FuelType>> GetFuelTypesAsync()
        {
            try
            {
                return await _genericRepository.GetAll();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting fuel types from db faild");
                return null;
            }
        }

        public async Task AddFuelTypeAsync(FuelType fuelType)
        {

            try
            {
                await _genericRepository.Add(fuelType);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add brand to db faild");
            }
        }

        public async Task UpdateFuelTypeAsync(FuelType fuelType)
        {
            try
            {
                _genericRepository.Update(fuelType);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update fuel type to db faild");

            }
        }

        public async Task DeleteFuelTypeAsync(FuelType fuelType)
        {
            try
            {
                _genericRepository.Remove(fuelType);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete fuel type from db faild");

            }
        }
        public async Task<FuelType> GetFuelTypeByIdAsync(int id)
        {
            try
            {
                var fuelType = await _genericRepository.GetById(id);
                return fuelType;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get fuel type by id faild");
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
