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
    public class TransmisionTypeService : ITransmisionTypeService
    {
        private IGenericRepository<TransmisionType> _genericRepository;
        private IAppLogger<TransmisionTypeService> _logger;
        private dbCarRentalContext _context;

        public TransmisionTypeService(IGenericRepository<TransmisionType> genericRepository, IAppLogger<TransmisionTypeService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }
        public async Task<string> TransmisionTypeNameAsync(int transmisionTypeId)
        {
            try
            {
                var transmisionType = await _genericRepository.GetById(transmisionTypeId);

                return transmisionType.Name;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get Transmision Type name faild");
                return "";
            }
        }

        public async Task<PagedList<TransmisionType>> GetFilteredTransmisionTypes(PaginationParams paginationParams)
        {
            try
            {
                var tTypes = _context.TransmisionType;

                return await PagedList<TransmisionType>.CreateAsync(tTypes, paginationParams.PageNumber, paginationParams.PageSize);
            }
            catch (Exception ex)
            {

                Logger(ex, "Geting Transmision Type from db faild");
                return null;
            }
        }

        public async Task<IEnumerable<TransmisionType>> GetTransmisionTypesAsync()
        {
            try
            {
                return await _genericRepository.GetAll();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting Transmision Type from db faild");
                return null;
            }
        }

        public async Task AddTransmisionTypeAsync(TransmisionType transmisionType)
        {

            try
            {
                await _genericRepository.Add(transmisionType);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add Transmision Type to db faild");
            }
        }

        public async Task UpdateTransmisionTypeAsync(TransmisionType transmisionType)
        {
            try
            {
                _genericRepository.Update(transmisionType);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update Transmision Type to db faild");

            }
        }

        public async Task DeleteTransmisionTypeAsync(TransmisionType transmisionType)
        {
            try
            {
                _genericRepository.Remove(transmisionType);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete Transmision Type from db faild");

            }
        }
        public async Task<TransmisionType> GetTransmisionTypeByIdAsync(int id)
        {
            try
            {
                var transmisionType = await _genericRepository.GetById(id);
                return transmisionType;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get Transmision Type by id faild");
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
