using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using CarRental.API.Helpers;

namespace CarRental.API.Areas.Admin.Controllers
{

    [Route("api/admin/[controller]")]
    [ApiController]
    //[Authorize("Bearer")]
    //[Authorize(Roles = "Admin")]
    public class ModelController : Controller
    {
        private IModelService _modelService;
        private IGenericRepository<Model> _genericRepository;

        public ModelController(IModelService modelService, IGenericRepository<Model> genericRepository)
        {
            _modelService = modelService;
            _genericRepository = genericRepository;
        }

        [HttpGet("list/{id}")]
        public async Task<IActionResult> GetModels(int id)
        {
            var model = new List<ModelDto>();
            var modelsAsync = await _modelService.GetModelsAsync(id);
            var models = modelsAsync.ToList();

            if (models == null || models.Count <= 0)
                return BadRequest("Any brand not found");

            for (int i = 0; i < models.Count(); i++)
            {
                model.Add(new ModelDto
                {
                    BrandId = models[i].BrandId,
                    Name = models[i].Name
                });
            }

            return Ok(model);
        }

        [HttpGet("models/{id}")]
        public async Task<IActionResult> GetFilteredModels(int id, [FromQuery]PaginationParams paginationParams)
        {
            var model = new List<ModelDto>();
            var modelsAsync = await _modelService.GetFilteredModelsAsync(paginationParams,id);
            var models = modelsAsync.ToList();

            if (models == null || models.Count <= 0)
                return BadRequest("Any brand not found");

            for (int i = 0; i < models.Count(); i++)
            {
                model.Add(new ModelDto
                {
                    Id = models[i].Id,
                    BrandId = models[i].BrandId,
                    Name = models[i].Name
                });
            }

            Response.AddPagination(modelsAsync.CurrentPage, modelsAsync.PageSize, modelsAsync.TotalCount, modelsAsync.TotalPages);


            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetModelById(int id)
        {
            var model = new ModelDto();
            var modelById = await _modelService.GetModellByIdAsync(id);

            if (modelById == null)
                return BadRequest("Model not found");

            model.Id = modelById.Id;
            model.BrandId = modelById.BrandId;
            model.Name = modelById.Name;

            return Ok(model);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddModel(ModelDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while adding model");
            }

            var modelToAdd = new Model
            {
                BrandId = model.BrandId,
                Name = model.Name
            };

            await _modelService.AddModelAsync(modelToAdd);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Model Added successfully!"
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditModel(int id, ModelDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while updating model");
            }

            var modelToEdit = await _modelService.GetModellByIdAsync(id);

            if (modelToEdit == null)
                return BadRequest("Brand not found");

            modelToEdit.Name = model.Name;
            modelToEdit.BrandId = model.BrandId;

            await _modelService.UpdateModelAsync(modelToEdit);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Model edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteModel(int id)
        {
            var model = await _modelService.GetModellByIdAsync(id);

            if (model == null)
                return BadRequest("Model not found");

            await _modelService.DeleteModelAsync(model);

            return Ok(new
            {
                status = 200,
                message = "Model deleted successfully!"
            });

        }
    }
}