using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IFuelTypeService
    {

        Task<string> GetFuelTypeNameAsync(int fuelTypeId);
        Task<IEnumerable<FuelType>> GetFuelTypesAsync();
        Task<PagedList<FuelType>> GetFilteredFuelTypesAsync(PaginationParams paginationParams);
        Task AddFuelTypeAsync(FuelType fuelType);
        Task UpdateFuelTypeAsync(FuelType fuelType);
        Task DeleteFuelTypeAsync(FuelType fuelType);
        Task<FuelType> GetFuelTypeByIdAsync(int id);
    }
}
