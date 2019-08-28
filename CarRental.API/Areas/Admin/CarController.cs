using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CarRental.API.Areas.Admin
{
    [Route("api/admin/[controller]")]
    [ApiController]
    [Authorize]
    public class CarController : Controller
    {
        private ICarService _carService;

        public CarController(ICarService carService)
        {
            _carService = carService;
        }
        public IActionResult Index()
        {
            return View();
        }

        [HttpGet]
        public async Task<IActionResult> GetCars()
        {
            if (!User.Identity.IsAuthenticated)
                return Unauthorized();

            var cars = await _carService.GetCarsAsync();

            if (cars == null)
                return BadRequest();

            return Ok(cars);
        }

    
    }
}