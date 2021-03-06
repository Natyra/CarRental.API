﻿using System;
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
    //[Authorize(Roles = "Admin")]
    public class LocationController : Controller
    {

        private ILocationService _locationService;
        private IGenericRepository<Location> _genericRepository;

        public LocationController(ILocationService locationService, IGenericRepository<Location> genericRepository)
        {
            _locationService = locationService;
            _genericRepository = genericRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetLocations()
        {
            var model = new List<LocationDto>();
            var locationsAsync = await _locationService.GetLocationsAsync();
            var locations = locationsAsync.ToList();

            if (locations == null || locations.Count <= 0)
                return BadRequest("Any location not found");

            for (int i = 0; i < locations.Count(); i++)
            {
                model.Add(new LocationDto
                {
                    Id = locations[i].Id,
                    StreetAddress = locations[i].StreetAddress,
                    Country = locations[i].Country,
                    City = locations[i].City,
                    ZipCode = locations[i].ZipCode
                });
            }

            
            return Ok(model);
        }

        [HttpGet("locations")]
        public async Task<IActionResult> GetFilteredLocations([FromQuery]PaginationParams paginationParams)
        {
            var model = new List<LocationDto>();
            var locationsAsync = await _locationService.GetFilteredLocationsAsync(paginationParams);
            var locations = locationsAsync.ToList();

            if (locations == null || locations.Count <= 0)
                return BadRequest("Any location not found");

            for (int i = 0; i < locations.Count(); i++)
            {
                model.Add(new LocationDto
                {
                    Id = locations[i].Id,
                 StreetAddress = locations[i].StreetAddress,
                 Country = locations[i].Country,
                 City =locations[i].City,
                 ZipCode = locations[i].ZipCode
                });
            }

            Response.AddPagination(locationsAsync.CurrentPage, locationsAsync.PageSize, locationsAsync.TotalCount, locationsAsync.TotalPages);


            return Ok(model);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetLocationById(int id)
        {
            var model = new LocationDto();
            var loaction = await _locationService.GetLocationByIdAsync(id);

            if (loaction == null)
                return BadRequest("Location not found");

            model.Id = loaction.Id;
            model.City = loaction.City;
            model.Country = loaction.Country;
            model.StreetAddress = loaction.StreetAddress;
            model.ZipCode = loaction.ZipCode;

            return Ok(model);

        }


        [HttpPost("add")]
        [Authorize("Bearer")]
        public async Task<IActionResult> AddLocation(LocationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while adding location");
            }

            var location = new Location
            {
               ZipCode = model.ZipCode,
               City = model.City,
               Country = model.Country,
               StreetAddress = model.StreetAddress
            };
            await _locationService.AddLocationAsync(location);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Location Added successfully!"
            });
        }

        [HttpPut("edit/{id}")]
        [Authorize("Bearer")]

        public async Task<IActionResult> EditLocation(int id, LocationDto model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("Something want wrong while updating location");
            }

            var locationToEdit = await _locationService.GetLocationByIdAsync(id);

            if (locationToEdit == null)
                return BadRequest("Location not found");

            locationToEdit.City = model.City;
            locationToEdit.Country = model.Country;
            locationToEdit.StreetAddress = model.StreetAddress;
            locationToEdit.ZipCode = model.ZipCode;

            await _locationService.UpdateLocationAsync(locationToEdit);
            await _genericRepository.SaveChangesAsync();

            return Ok(new
            {
                status = 200,
                message = "Location edited successfully"
            });
        }

        [HttpDelete("delete/{id}")]
        [Authorize("Bearer")]
        public async Task<IActionResult> DeleteLocation(int id)
        {
            var location = await _locationService.GetLocationByIdAsync(id);

            if (location == null)
                return BadRequest("Location not found");

            await _locationService.DeleteLocationAsync(location);

            return Ok(new
            {
                status = 200,
                message = "Location deleted successfully!"
            });

        }
    }
}