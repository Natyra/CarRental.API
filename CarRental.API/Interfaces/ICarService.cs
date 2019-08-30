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
        Task AddCarAsync(Car car);
        Task<Car> GetCarByIdAsync(int id);

        Task UpdateCarAsync(Car car);

        Task UploadImage(IFormFile image, int id);
    }
}
