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
    public class DashboardService : IDashboardService
    {

        private readonly IAppLogger<DashboardService> _logger;
        private readonly dbCarRentalContext _context;

        public DashboardService(IAppLogger<DashboardService> logger, dbCarRentalContext context)
        {
            _logger = logger;
            _context = context;
        }

        public async Task<IEnumerable<Car>> GetCarsInBookingAsync()
        {
            try
            {
                var cars = _context
                    .Booking
                    .Where(x => x.IsDeleted != true)
                    .Select(x => x.Car);
                    return await cars.ToListAsync();

            }
            catch (Exception ex)
            {

                Logger(ex, "Getting cars from db failed");
                return null;
            }


        }

        public async Task<IEnumerable<Brand>> GetBrandsInBookingAsync()
        {
            try
            {
                var brands = await _context
                     .Car
                     .Where(x => x.IsDeleted != true).Where(x=>x.Booking!=null)
                     .Select(x=>x.Brand)
                     .ToListAsync();
                return brands.Distinct();

            }
            catch (Exception ex)
            {
                Logger(ex, "Getting brands from db failed");
                return null;
            }
        }



        public async Task<int> BookingPerCarAsync(int carId)
        {
            try
            {
                var bookings = await _context
                    .Booking
                    .Where(x => x.CarId == carId).ToListAsync();

                return bookings.Count();


            }
            catch (Exception ex)
            {
                Logger(ex, "Getting bookings/car from db failed");
                return 0;
            }
        }

        public async Task<int> BookingPerBrandAsync(int brandId)
        {
            try
            {
                var bookings = await _context
                    .Booking
                    .Where(x => x.Car.BrandId == brandId)
                    
                    .ToListAsync();
                return bookings.Count();
            }
            catch (Exception ex)
            {

                Logger(ex, "Getting bookings/brand from db failed");
                return 0;
            }
        }

        public async Task<string> CarNameAsync(int id)
        {
            try
            {
                var model = await _context
                    .Car
                    .Where(x => x.IsDeleted != true)
                    .Include(x => x.Brand)
                    .Include(x=>x.Model)
                    .FirstOrDefaultAsync(x=>x.Id==id);
                var value = model.Model.Name + " " + model.Brand.Name;
                return value;

            }
            catch (Exception ex)
            {

                Logger(ex, "Getting car's name  from db failed");
                return null;
            }
        }

        public async Task<string> BrandNameAsync(int id)
        {
            try
            {
                var brandName = await _context
                    .Brand
                    .Where(x=>x.Id==id)
                    .Select(x => x.Name)
                    .FirstOrDefaultAsync();
                return brandName;
            }
            catch (Exception ex)
            {

                Logger(ex, "Getting brand's name  from db failed");
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

