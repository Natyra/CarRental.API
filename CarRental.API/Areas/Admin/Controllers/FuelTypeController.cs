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
    public class FuelTypeController : Controller
    {
        private IFuelTypeService _fuelTypeService;
        private IGenericRepository<FuelType> _genericRepository;

        public FuelTypeController(IFuelTypeService fuelTypeService, IGenericRepository<FuelType> genericRepository)
        {
            _fuelTypeService = fuelTypeService;
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetFuelTypes()
        {
            var model = new List<FuelTypeDto>();
            var fuelTypesAsync = await _fuelTypeService.GetFuelTypesAsync();
            var fuelTypes = fuelTypesAsync.ToList();

            if (fuelTypes == null || fuelTypes.Count <= 0)
                return BadRequest("Any fuel type not found");

            for (int i = 0; i < fuelTypes.Count(); i++)
            {
                model.Add(new FuelTypeDto
                {
                    Id = fuelTypes[i].Id,
                    Name = fuelTypes[i].Name
                });
            }

            return Ok(model);
        }

        [HttpGet("fueltypes")]
        public async Task<IActionResult> GetFilteredFuelTypes([FromQuery]PaginationParams paginationParams)
        {
            var model = new List<FuelTypeDto>();
            var fuelTypesAsync = await _fuelTypeService.GetFilteredFuelTypesAsync(paginationParams);
            var fuelTypes = fuelTypesAsync.ToList();

            if (fuelTypes == null || fuelTypes.Count <= 0)
                return BadRequest("Any fuel type not found");

            for (int i = 0; i < fuelTypes.Count(); i++)
            {
                model.Add(new FuelTypeDto
                {
                    Id = fuelTypes[i].Id,
                    Name = fuelTypes[i].Name
                });
            }

            Response.AddPagination(fuelTypesAsync.CurrentPage, fuelTypesAsync.PageSize, fuelTypesAsync.TotalCount, fuelTypesAsync.TotalPages);

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetFuelTypeById(int id)
        {
            var model = new FuelTypeDto();
            var fuel = await _fuelTypeService.GetFuelTypeByIdAsync(id);

            if (fuel == null)
                return BadRequest("Location not found");

            model.Id = fuel.Id;
            model.Name = fuel.Name;

            return Ok(model);

        }

        [HttpPost("add")]
        public async Task<IActionResult> AddFuelType(FuelTypeDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while adding fuel type");
            }

            var fuelType = new FuelType
            {
                Name = model.Name
            };

            await _fuelTypeService.AddFuelTypeAsync(fuelType);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Fuel Type Added successfully!"
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditFuelType(int id, FuelTypeDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while updating fuel type");
            }

            var fuelTypeToEdit = await _fuelTypeService.GetFuelTypeByIdAsync(id);

            if (fuelTypeToEdit == null)
                return BadRequest("Fuel Type not found");

            fuelTypeToEdit.Name = model.Name;

            await _fuelTypeService.UpdateFuelTypeAsync(fuelTypeToEdit);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Brand edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteFuelType(int id)
        {
            var fuelType = await _fuelTypeService.GetFuelTypeByIdAsync(id);

            if (fuelType == null)
                return BadRequest("Fuel Type not found");

            await _fuelTypeService.DeleteFuelTypeAsync(fuelType);

            return Ok(new
            {
                status = 200,
                message ="Fuel Type deleted successfully!"
            });
        
        }
    }
}