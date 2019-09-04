using CarRental.API.Interfaces;
using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class ModelService:IModelService
    {
        private IGenericRepository<Model> _genericRepository;
        private IAppLogger<ModelService> _logger;
        private dbCarRentalContext _context;

        public ModelService(IGenericRepository<Model> genericRepository, IAppLogger<ModelService> logger, dbCarRentalContext context)
        {
            _genericRepository = genericRepository;
            _logger = logger;
            _context = context;
        }

        public async Task<string> GetModelNameAsync(int modelId)
        {
            try
            {
                var model = await _genericRepository.GetById(modelId);

                return model.Name;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get brand name faild");
                return "";
            }
        }

        public async Task<IEnumerable<Model>> GetModelsAsync(int brandId)
        {
            try
            {
                var models =  await _genericRepository.GetAll();

                return models.Where(x => x.BrandId == brandId);

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting models from db faild");
                return null;
            }
        }

        public async Task AddModelAsync(Model model)
        {

            try
            {
                await _genericRepository.Add(model);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add model to db faild");
            }
        }

        public async Task UpdateModelAsync(Model model)
        {
            try
            {
                _genericRepository.Update(model);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update brand to db faild");

            }
        }

        public async Task DeleteModelAsync(Model model)
        {
            try
            {
                _genericRepository.Remove(model);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Delete model from db faild");

            }
        }
        public async Task<Model> GetModellByIdAsync(int id)
        {
            try
            {
                var model = await _genericRepository.GetById(id);
                return model;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get model by id faild");
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
