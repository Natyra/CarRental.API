using CarRental.API.Dtos;
using CarRental.API.Helpers;
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
    public class PreBookingService: IPreBookingService
    {
        private IGenericRepository<PreBooking> _genericRepository;
        private IAppLogger<PreBookingService> _logger;
        private dbCarRentalContext _context;

        public PreBookingService(IGenericRepository<PreBooking> genericRepository, IAppLogger<PreBookingService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }

        public async Task<PagedList<PreBooking>> GetFilteredPreBookingsAsync(PaginationParams paginationParams)
        {
            try
            {
                var preBookings = _context.PreBooking.Where(x => x.IsDeleted != true);
                return await PagedList<PreBooking>.CreateAsync(preBookings, paginationParams.PageNumber, paginationParams.PageSize);

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting preBookings from db failed");
                return null;
            }
        }

        public async Task<IEnumerable<PreBooking>> GetPreBookingsAsync()
        {
            try
            {
                return await _context.PreBooking.Where(x => x.IsDeleted != true).ToListAsync();


            }
            catch (Exception ex)
            {
                Logger(ex, "Geting preBookings from db failed");
                return null;
            }
        }

        public async Task<PreBooking> GetPreBookingByIdAsync(int id)
        {
            try
            {
                var preBooking = await _genericRepository.GetById(id);
                return preBooking;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get preBooking by id failed");
                return null;
            }
        }

        public async Task AddPreBooking(PreBooking preBooking)
        {
            try
            {
                await _genericRepository.Add(preBooking);
            }
            catch (Exception ex)
            {
                Logger(ex, "Add preBooking in db failed");
            }
        }

        public async Task SaveChanges()
        {
            try
            {
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Save Changes in db failed");
            }
            }

            public async Task DeletePreBookingAsync(PreBooking preBooking)
        {
            try
            {
                _genericRepository.Remove(preBooking);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete preBooking from db failed");

            }
        }

        public async Task<PreBooking> GetPreBookingDetailsByIdAsync(int id)
        {
            try
            {
                var preBooking = await _context.PreBooking.Where(x => x.IsDeleted != true).FirstOrDefaultAsync(x => x.Id == id);
                return preBooking;

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting preBooking from db failed");
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

            _logger.LogError(message + errorMessage + "," + fullMethodName);
        }
    }
}
