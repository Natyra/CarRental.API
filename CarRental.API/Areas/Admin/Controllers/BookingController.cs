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

    public class BookingController : Controller
    {
        private IBookingService _bookingService;
        private IGenericRepository<Booking> _genericRepository;
        private ILocationService _locationService;

        public BookingController(IBookingService bookingService, IGenericRepository<Booking> genericRepository, ILocationService locationService)
        {
            _bookingService = bookingService;
            _genericRepository = genericRepository;
            _locationService = locationService;
        }

        [HttpGet]
        public async Task<IActionResult> GetBookings()
        {
            var model = new List<BookingForListDto>();
            var bookingsAsync = await _bookingService.GetBookingsAsync();
            var bookings = bookingsAsync.ToList();

            if (bookings == null || bookings.Count <= 0)
                return BadRequest("Booking not found");

            for (int i = 0; i < bookings.Count(); i++)
            {
                model.Add(new BookingForListDto
                {
                    Id = bookings[i].Id,
                    PickUpLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.PickLocationId),
                    ReturnLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.ReturnLocationId),
                    PickUpDate = (DateTime)bookings[i].PreBooking.PickDate,
                    ReturnDate = (DateTime)bookings[i].PreBooking.ReturnDate,

                    Car = new CarForListDto
                    {
                        Id = bookings[i].Car.Id,
                        CarNumber = bookings[i].Car.CarNumber
                    },

                    User = new UserDto
                    {
                        Id = bookings[i].User.Id,
                        FirstName = bookings[i].User.FirstName,
                        LastName = bookings[i].User.LastName,
                        Email = bookings[i].User.Email,
                        PhoneNumber = bookings[i].User.PhoneNumber
                    }
                });
            }

            return Ok(model);
        }

        [HttpGet("bookings")]
        public async Task<IActionResult> GetFilteredBookings([FromQuery]PaginationParams paginationParams)
        {
            var model = new List<BookingForListDto>();
            var bookingsAsync = await _bookingService.GetFilteredBookingsAsync(paginationParams);
            var bookings = bookingsAsync.ToList();

            if (bookings == null || bookings.Count <= 0)
                return BadRequest("Booking not found");

            for (int i = 0; i < bookings.Count(); i++)
            {
                model.Add(new BookingForListDto
                {
                    Id = bookings[i].Id,
                    PickUpLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.PickLocationId),
                    ReturnLocation = await _locationService.GetLocationAsync((int)bookings[i].PreBooking.ReturnLocationId),
                    PickUpDate = (DateTime)bookings[i].PreBooking.PickDate,
                    ReturnDate = (DateTime)bookings[i].PreBooking.ReturnDate,

                    Car = new CarForListDto
                    {
                        Id = bookings[i].Car.Id,
                        CarNumber = bookings[i].Car.CarNumber
                    },

                    User = new UserDto
                    {
                        Id = bookings[i].User.Id,
                        FirstName = bookings[i].User.FirstName,
                        LastName = bookings[i].User.LastName,
                        Email = bookings[i].User.Email,
                        PhoneNumber = bookings[i].User.PhoneNumber
                    }
                });
            }

            Response.AddPagination(bookingsAsync.CurrentPage, bookingsAsync.PageSize, bookingsAsync.TotalCount, bookingsAsync.TotalPages);


            return Ok(model);
        }



        [HttpDelete("delete/{id}")]
        public async Task<IActionResult> DeleteBooking(int id)
        {
            var booking = await _bookingService.GetBookingByIdAsync(id);

            if (booking == null)
                return BadRequest("Booking not found");

            await _bookingService.DeleteBookingAsync(booking);

            return Ok(new
            {
                status = 200,
                message = "Booking deleted successfully!"
            });

        }

        [HttpGet("GetBookingDetails/{id}")]
        public async Task<IActionResult> GetBookingDetails(int id)
        {
            var model = new BookingForListDto();
            var bookingsAsync = await _bookingService.GetBookingDetailsByIdAsync(id);
            var booking= bookingsAsync;

            if (booking == null )
                return BadRequest("Booking not found");




            model.Id = booking.Id;
            model.PickUpLocation = await _locationService.GetLocationAsync((int)booking.PreBooking.PickLocationId);
            model.ReturnLocation = await _locationService.GetLocationAsync((int)booking.PreBooking.ReturnLocationId);
            model.PickUpDate = (DateTime)booking.PreBooking.PickDate;
            model.ReturnDate = (DateTime)booking.PreBooking.ReturnDate;

            model.Car = new CarForListDto
            {
                Id = booking.Car.Id,
                CarNumber = booking.Car.CarNumber,
                BrandName = booking.Car.Brand.Name,
                ModelName = booking.Car.Model.Name
            };

            model.User = new UserDto
            {
                Id = booking.User.Id,
                FirstName = booking.User.FirstName,
                LastName = booking.User.LastName,
                Email = booking.User.Email,
                PhoneNumber = booking.User.PhoneNumber
            };
              
            

            return Ok(model);

        }

    }
}