using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface ICarService
    {
        Task<IEnumerable<Car>> GetCarsAsync();
        Task<PagedList<Car>> GetFilteredCarsAsync(PaginationParams carsParam);
        Task AddCarAsync(Car car);
        Task<Car> GetCarByIdAsync(int id);

        Task UpdateCarAsync(Car car);

        Task UploadImage(IFormFile image, int id);
        Task<IEnumerable<Car>> CarsFilterLocationAsync(Location location);
        Task<List<Booking>> GetPreBookingsAsync(int carId);

        Task<PagedList<Car>> GetCarsFromSearch(CarsFilterDtoOriginal filter);
    }
}
