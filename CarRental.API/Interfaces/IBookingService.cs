using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IBookingService
    {
        Task<IEnumerable<Booking>> GetBookingsAsync();
        Task<PagedList<Booking>> GetFilteredBookingsAsync(PaginationParams paginationParams);
        Task<Booking> GetBookingByIdAsync(int id);
        Task DeleteBookingAsync(Booking booking);
        Task<Booking> GetBookingDetailsByIdAsync(int id);
        Task<Booking> GetBookingAndDependenciesById(int id);
    }
}
