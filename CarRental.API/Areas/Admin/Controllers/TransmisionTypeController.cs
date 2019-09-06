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
    public class TransmisionTypeController : Controller
    {
        private ITransmisionTypeService _transmisionTypeService;
        private IGenericRepository<TransmisionType> _genericRepository;

        public TransmisionTypeController(ITransmisionTypeService transmisionTypeService, IGenericRepository<TransmisionType> genericRepository)
        {
            _transmisionTypeService = transmisionTypeService;
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetTransmisionTypes()
        {
            var model = new List<TransmisionTypeDto>();
            var transmisionTypesAsync = await _transmisionTypeService.GetTransmisionTypesAsync();
            var transmisionTypes = transmisionTypesAsync.ToList();

            if (transmisionTypes == null || transmisionTypes.Count <= 0)
                return BadRequest("Any Transmision Type not found");

            for (int i = 0; i < transmisionTypes.Count(); i++)
            {
                model.Add(new TransmisionTypeDto
                {
                    Id = transmisionTypes[i].Id,
                    Name = transmisionTypes[i].Name
                });
            }

          
            return Ok(model);
        }

        [HttpGet("transmisiontypes")]
        public async Task<IActionResult> GetFilteredTransmisionTypes([FromQuery]PaginationParams paginationParams)
        {
            var model = new List<TransmisionTypeDto>();
            var transmisionTypesAsync = await _transmisionTypeService.GetFilteredTransmisionTypes(paginationParams);
            var transmisionTypes = transmisionTypesAsync.ToList();

            if (transmisionTypes == null || transmisionTypes.Count <= 0)
                return BadRequest("Any Transmision Type not found");

            for (int i = 0; i < transmisionTypes.Count(); i++)
            {
                model.Add(new TransmisionTypeDto
                {
                    Id = transmisionTypes[i].Id,
                    Name = transmisionTypes[i].Name
                });
            }

            Response.AddPagination(transmisionTypesAsync.CurrentPage, transmisionTypesAsync.PageSize, transmisionTypesAsync.TotalCount, transmisionTypesAsync.TotalPages);


            return Ok(model);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddTransmisionType([FromForm]TransmisionTypeDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while adding fuel type");
            }

            var transmisionType = new TransmisionType
            {
                Name = model.Name
            };

            await _transmisionTypeService.AddTransmisionTypeAsync(transmisionType);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Transmision Type Added successfully!"
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditTransmisionType(int id, [FromForm]TransmisionTypeDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while updating fuel type");
            }

            var transmisionTypeToEdit = await _transmisionTypeService.GetTransmisionTypeByIdAsync(id);

            if (transmisionTypeToEdit == null)
                return BadRequest("Transmision Type not found");

            transmisionTypeToEdit.Name = model.Name;

            await _transmisionTypeService.UpdateTransmisionTypeAsync(transmisionTypeToEdit);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Transmision Type edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteTransmisionType(int id)
        {
            var transmisionType = await _transmisionTypeService.GetTransmisionTypeByIdAsync(id);

            if (transmisionType == null)
                return BadRequest("Transmision Type not found");

            await _transmisionTypeService.DeleteTransmisionTypeAsync(transmisionType);

            return Ok(new
            {
                status = 200,
                message = "Transmision Type deleted successfully!"
            });
        
        }
    }
}