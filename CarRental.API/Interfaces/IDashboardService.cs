using CarRental.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public interface IDashboardService
    {
        Task<int> BookingPerCarAsync(int carId);
        Task<int> BookingPerBrandAsync(int brandId);
        Task<IEnumerable<Car>> GetCarsInBookingAsync();
        Task<IEnumerable<Brand>> GetBrandsInBookingAsync();
        Task<string> CarNameAsync(int id);
        Task<string> BrandNameAsync(int id);
    }
}