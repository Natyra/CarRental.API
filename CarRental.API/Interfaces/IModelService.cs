using CarRental.API.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Interfaces
{
    public interface IModelService
    {
        Task<string> GetModelNameAsync(int modelId);
        Task<IEnumerable<Model>> GetModelsAsync(int brandId);
        Task AddModelAsync(Model model);
        Task UpdateModelAsync(Model model);
        Task DeleteModelAsync(Model model);
        Task<Model> GetModellByIdAsync(int id);
    }
}
