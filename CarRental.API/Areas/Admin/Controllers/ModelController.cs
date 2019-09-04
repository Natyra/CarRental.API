using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Areas.Admin.Controllers
{

    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
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

        [HttpPost("add")]
        public async Task<IActionResult> AddModel([FromForm]ModelDto model)
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
        public async Task<IActionResult> EditModel(int id, [FromForm]ModelDto model)
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