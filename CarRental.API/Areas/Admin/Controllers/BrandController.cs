using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Dtos;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Controllers
{
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize("Bearer")]
    //[Authorize(Roles = "Admin")]

    public class BrandController : Controller
    {

        private IBrandService _brandService;
        private IGenericRepository<Brand> _genericRepository;

        public BrandController(IBrandService brandService, IGenericRepository<Brand> genericRepository)
        {
            _brandService = brandService;
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetBrands()
        {
            //if (!User.Identity.IsAuthenticated)
            //    return Unauthorized();

            //if (!User.IsInRole("Admin"))
            //    return Unauthorized();

            var model = new List<BrandDto>();
            var brandsAsync = await _brandService.GetBrandsAsync();
            var brands = brandsAsync.ToList();

            if (brands == null || brands.Count <= 0)
                return BadRequest("Any brand not found");

            for (int i = 0; i < brands.Count(); i++)
            {
                model.Add(new BrandDto
                {
                    Id = brands[i].Id,
                    Name = brands[i].Name
                });
            }

            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetBrandById(int id)
        {
            var model = new BrandDto();
            var brand = await _brandService.GetBrandByIdAsync(id);
            if (brand == null)
                return BadRequest("No brand founded");

            model.Id = brand.Id;
            model.Name = brand.Name;

            return Ok(model);
        }

        [HttpPost("add")]
        public async Task<IActionResult> AddBrand(BrandDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while adding brand");
            }

            var brand = new Brand
            {
                Name = model.Name
            };

            await _brandService.AddBrandAsync(brand);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Brand Added successfully!"
            });
        }

        [HttpPut("edit/{id}")]
        public async Task<IActionResult> EditBrand(int id, BrandDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while updating brand");
            }

            var brandToEdit = await _brandService.GetBrandByIdAsync(id);

            if (brandToEdit == null)
                return BadRequest("Brand not found");

            brandToEdit.Name = model.Name;

            await _brandService.UpdateBrandAsync(brandToEdit);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Brand edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBrand(int id)
        {
            var brand = await _brandService.GetBrandByIdAsync(id);

            if (brand == null)
                return BadRequest("Brand not found");

            await _brandService.DeleteBrandAsync(brand);

            return Ok(new
            {
                status = 200,
                message ="Brand deleted successfully!"
            });
        
        }

        [HttpGet("models/{id}")]
        public async Task<IActionResult> GetModelsByBrandId(int id)
        {
            var model = new List<ModelDto>();

            var modelsByBrand = await _brandService.GetModelsByBrandId(id);
            var modelsToReturn = modelsByBrand.ToList();

            if (modelsByBrand == null)
                return BadRequest();

            for (int i = 0; i < modelsToReturn.Count(); i++)
            {
                model.Add(new ModelDto
                {
                    Id = modelsToReturn[i].Id,
                     Name = modelsToReturn[i].Name,
                     BrandId = modelsToReturn[i].BrandId
                });
            }

            return Ok(model);
        }
    }
}