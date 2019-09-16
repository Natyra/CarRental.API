using CarRental.API.Interfaces;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class CarUploadService: ICarUploadService 
    {
        private IGenericRepository<CarUpload> _genericRepository;
        private IAppLogger<CarUploadService> _logger;

        public CarUploadService(IGenericRepository<CarUpload> genericRepository, IAppLogger<CarUploadService> logger)
        {
            _genericRepository = genericRepository;
            _logger = logger;
        }

        public async Task AddCarUploadAsync(CarUpload upload)
        {

            try
            {
                await _genericRepository.Add(upload);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add car upload to db faild");
            }
        }

        public async Task UpdateCarUploadAsync(CarUpload upload)
        {
            try
            {
                _genericRepository.Update(upload);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update car upload to db faild");

            }
        }

        public async Task DeleteCarUploadAsync(CarUpload upload)
        {
            try
            {
                _genericRepository.Remove(upload);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete car upload from db faild");

            }
        }
        public async Task<CarUpload> GetCarUploadByCarIdAsync(int carId)
        {
            try
            {
                var upload = await _genericRepository.FindOne(x => x.CarId == carId);
                return upload;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get car upload by id faild");
                return null;
            }
        }

        public async Task<string> GetPathOfCarUploadAsync(int carId)
        {
            try
            {
                var upload = await _genericRepository.FindOne(x => x.CarId == carId);
                return upload.Path;
            }
            catch (Exception ex)
            {
                Logger(ex, "Get car upload by id faild");
                return "";
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
