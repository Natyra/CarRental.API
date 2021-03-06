﻿using CarRental.API.Dtos;
using CarRental.API.Helpers;
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
        Task<PagedList<Brand>> GetFilteredBrandsAsync(PaginationParams paginationParams);
        Task AddBrandAsync(Brand brand);
        Task UpdateBrandAsync(Brand brand);
        Task DeleteBrandAsync(Brand brand);
        Task<Brand> GetBrandByIdAsync(int id);
        Task<IEnumerable<Model>> GetModelsByBrandId(int brandId);
    }
}
