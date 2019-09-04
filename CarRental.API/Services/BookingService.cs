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
    public class BookingService:IBookingService
    {
        private IGenericRepository<Booking> _genericRepository;
        private IAppLogger<BookingService> _logger;
        private dbCarRentalContext _context;

        public BookingService(IGenericRepository<Booking> genericRepository, IAppLogger<BookingService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }

        public async Task<IEnumerable<Booking>> GetBookingsAsync()
        {
            try
            {
                var bookings = await _context.Booking.Where(x => x.IsDeleted != true).Include(x => x.PreBooking).Include(x => x.User).Include(x => x.Car).ToListAsync();
                return bookings;

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting bookings from db failed");
                return null;
            }
        }

        public async Task<Booking> GetBookingByIdAsync(int id)
        {
            try
            {
                var booking = await _genericRepository.GetById(id);
                return booking;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get booking by id failed");
                return null;
            }
        }


        public async Task DeleteBookingAsync(Booking booking)
        {
            try
            {
                _genericRepository.Remove(booking);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete booking from db failed");

            }
        }

        public async Task<Booking> GetBookingDetailsByIdAsync(int id)
        {
            try
            {
                var booking = await  _context.Booking.Where(x => x.IsDeleted != true).Include(x => x.PreBooking).Include(x => x.User).Include(x => x.Car).ThenInclude(x=>x.Model).Include(x=>x.Car).ThenInclude(x=>x.Brand).FirstOrDefaultAsync(x=>x.Id==id);
                return booking;

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting booking from db failed");
                return null;
            }

        }


        public async Task<Booking> GetBookingAndDependenciesById(int id)
        {
            var bookingWithDependencys = await _context.Booking.Where(x => x.IsDeleted == false).Include(x => x.Car).ThenInclude(x => x.Model).Include(x => x.Car).ThenInclude(x => x.Brand).Include(x => x.User).Include(x=>x.PreBooking).FirstOrDefaultAsync(x=>x.Id==id);
            return bookingWithDependencys;
        }

        private void Logger(Exception ex, string message)
        {
            var errorMessage = (ex.InnerException?.Message != null ? ex.InnerException.Message : ex.Message);

            var className = this.GetType().Name;

            MethodBase method = MethodBase.GetCurrentMethod();
            string methodName = method.ReflectedType.Name;
            string fullMethodName = className + " " + methodName;

            _logger.LogError(message + errorMessage + "," + fullMethodName);
        }


    }
}