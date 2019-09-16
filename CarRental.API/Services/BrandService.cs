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
    public class BrandService:IBrandService
    {
        private IGenericRepository<Brand> _genericRepository;
        private IAppLogger<BrandService> _logger;
        private dbCarRentalContext _context;

        public BrandService(IGenericRepository<Brand> genericRepository, IAppLogger<BrandService> logger,dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }
        public async Task<string> GetBrandNameAsync(int brandId)
        {
            try
            {
                var brand = await _genericRepository.GetById(brandId);

                return brand.Name;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get brand name faild");
                return "";
            }
        }

        public async Task<PagedList<Brand>> GetFilteredBrandsAsync(PaginationParams paginationParams)
        {
            try
            {
                var brands = _context.Brand;

                return await PagedList<Brand>.CreateAsync(brands, paginationParams.PageNumber, paginationParams.PageSize);
            }
            catch (Exception ex)
            {

                Logger(ex, "Geting brands from db faild");
                return null;
            }
        }

        public async Task<IEnumerable<Brand>> GetBrandsAsync()
        {
            try
            {
                return await _genericRepository.GetAll();

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting brands from db faild");
                return null;
            }
        }

        public async Task AddBrandAsync(Brand brand)
        {

            try
            {
                await _genericRepository.Add(brand);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add brand to db faild");
            }
        }

        public async Task UpdateBrandAsync(Brand brand)
        {
            try
            {
                _genericRepository.Update(brand);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update brand to db faild");

            }
        }

        public async Task DeleteBrandAsync(Brand brand)
        {
            try
            {
                _genericRepository.Remove(brand);
                await _genericRepository.SaveChangesAsync();
            }
            catch(Exception ex)
            {
                Logger(ex, "Delete brand from db faild");

            }
        }
        public async Task<Brand> GetBrandByIdAsync(int id)
        {
            try
            {
                var brand = await _genericRepository.GetById(id);
                return brand;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get Car by id faild");
                return null;
            }
        }

        public async Task<IEnumerable<Model>> GetModelsByBrandId(int brandId)
        {
            try
            {
                var models = await _context.Model.Where(x => x.BrandId == brandId).ToListAsync();
                return models;
            }
            catch (Exception ex)
            {
                Logger(ex, "Error geting models by brandId");
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

            _logger.LogError(message + errorMessage + ", " + fullMethodName);
        }
    }
}
