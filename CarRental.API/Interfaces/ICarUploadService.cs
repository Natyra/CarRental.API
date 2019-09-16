using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface ICarUploadService
    {
        Task AddCarUploadAsync(CarUpload upload);
        Task UpdateCarUploadAsync(CarUpload upload);
        Task DeleteCarUploadAsync(CarUpload upload);
        Task<CarUpload> GetCarUploadByCarIdAsync(int carId);
        Task<string> GetPathOfCarUploadAsync(int carId);
    }
}
