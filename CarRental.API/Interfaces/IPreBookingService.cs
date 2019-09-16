using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IPreBookingService
    {
        Task<PagedList<PreBooking>> GetFilteredPreBookingsAsync(PaginationParams paginationParams);
        Task<IEnumerable<PreBooking>> GetPreBookingsAsync();
        Task<PreBooking> GetPreBookingByIdAsync(int id);
        Task DeletePreBookingAsync(PreBooking preBooking);
        Task<PreBooking> GetPreBookingDetailsByIdAsync(int id);
        Task AddPreBooking(PreBooking preBooking);
        Task SaveChanges();
    }
}
