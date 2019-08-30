using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IBrandService
    {
        Task<string> GetBrandNameAsync(int brandId);
        Task<IEnumerable<Brand>> GetBrandsAsync();
        Task AddBrandAsync(Brand brand);
        Task UpdateBrandAsync(Brand brand);
        Task DeleteBrandAsync(Brand brand);
        Task<Brand> GetBrandByIdAsync(int id);
    }
}
