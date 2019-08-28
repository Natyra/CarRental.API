using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class CarService:ICarService
    {

        protected readonly dbCarRentalContext _context;
        private readonly IAppLogger<CarService> _logger;

        public CarService(dbCarRentalContext context, IAppLogger<CarService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            try
            {
                return await _context.Car.Where(x => x.IsDeleted == true).Include(x => x.Model).Include(x => x.Brand).Include(x => x.CarLocation).ToListAsync();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting all cars faild");
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
