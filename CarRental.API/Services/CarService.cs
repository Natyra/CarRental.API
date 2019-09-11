using CarRental.API.Dtos;
using CarRental.API.Helpers;
using CarRental.API.Interfaces;
using CarRental.API.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class CarService:ICarService
    {

        protected readonly dbCarRentalContext _context;
        private readonly IAppLogger<CarService> _logger;
        private readonly IGenericRepository<Car> _genericRepository;
        private readonly IHostingEnvironment _env;
        private readonly ICarUploadService _carUploadService;

        public CarService(dbCarRentalContext context, IAppLogger<CarService> logger, IGenericRepository<Car> genericRepository, 
            IHostingEnvironment env, ICarUploadService carUploadService)
        {
            _context = context;
            _logger = logger;
            _genericRepository = genericRepository;
            _env = env;
            _carUploadService = carUploadService;
        }

        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            try
            {
                return await _context.Car.Where(x => x.IsDeleted != true).Include(x => x.TransmisionType).Include(x => x.FuelType).Include(x => x.Model).Include(x => x.Brand).Include(x => x.CarLocation).Include(x=>x.Booking).ThenInclude(x=>x.PreBooking).ToListAsync();

                
            }
            catch (Exception ex)
            {
                Logger(ex, "Geting cars from db faild");
                return null;
            }
        }

        public async Task<PagedList<Car>> GetFilteredCarsAsync(PaginationParams carsParam)
        {
            try
            {
                var cars = _context.Car.Where(x => x.IsDeleted != true).Include(x => x.TransmisionType).Include(x => x.FuelType).Include(x => x.Model).Include(x => x.Brand).Include(x => x.CarLocation);

                return await PagedList<Car>.CreateAsync(cars, carsParam.PageNumber, carsParam.PageSize);
            }
            catch (Exception ex)
            {
                Logger(ex, "Geting cars from db faild");
                return null;
            }
        }

        public async Task<PagedList<Car>> GetCarsFromSearch(CarsFilterDto filter)
        {
            try
            {
                var carList = new List<Car>();
                var carsAsync = await GetCarsAsync();
                var cars = carsAsync.ToList();
                if(filter.PickUpDate >= DateTime.Now)
                {
                    if (filter.PickUpLocationId.HasValue)
                    {
                        cars = cars.Where(x => x.CarLocation.Id == filter.PickUpLocationId).ToList();
                        carList.AddRange(cars);
                    }

                    if(filter.PickUpDate != null && filter.ReturnDate != null)
                    {
                        for (int i = 0; i < carList.Count(); i++)
                        {
                            var carBooking = from booking in cars[i].Booking where booking.CarId == cars[i].Id select booking.PreBooking;

                            if (carBooking != null && carBooking.Count() > 0)
                            {
                                foreach (var item in carBooking)
                                {
                                    if (filter.PickUpDate <= item.ReturnDate && filter.ReturnDate >= item.PickDate)
                                    {
                                        carList.Remove(cars[i]);
                                    }
                                }
                            }
                        }
                    }
                }

                //var finalList = carList.AsQueryable();

                return PagedList<Car>.CreateLitAsync(carList, filter.paginationParams.PageNumber, filter.paginationParams.PageSize);

            }
            catch (Exception ex)
            {
                Logger(ex, "Geting cars from db faild");
                return null;
            }
        }

        public async Task AddCarAsync(Car car)
        {

            try
            {
                await _genericRepository.Add(car);

                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Add car to db faild");
            }
        }

        public async Task UpdateCarAsync(Car car)
        {
            try
            {
                _genericRepository.Update(car);
                await _genericRepository.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                Logger(ex, "Update car to db faild");
               
            }
        }
        public async Task<Car> GetCarByIdAsync(int id)
        {
            try
            {
                var car = await _genericRepository.GetById(id);
                return car;
            }
            catch (Exception ex)
            {

                Logger(ex, "Get Car by id faild");
                return null;
            }
        }


        public async Task UploadImage(IFormFile image, int id)
        {
            try
            {

                var uploadPath = $"~/uploads/cars/{id}/Image/{image.FileName}";
                try
                {
                    SaveFile(image, "cars", id.ToString());
                }
                catch (Exception ex)
                {
                    throw ex;

                }

                var carUpload = await _carUploadService.GetCarUploadByCarIdAsync(id);

                if (carUpload != null && carUpload.Path.Count() > 0)
                {
                    carUpload.Path = uploadPath;
                   await _carUploadService.UpdateCarUploadAsync(carUpload);
                   await _genericRepository.SaveChangesAsync();

                }

                else
                {
                    var carPhoto = new CarUpload
                    {
                        CarId = id,
                        Name = Path.GetFileName(image.FileName),
                        Path = uploadPath
                    };
                   await _carUploadService.AddCarUploadAsync(carPhoto);
                   await _genericRepository.SaveChangesAsync();
                }
            }
            catch (Exception ex)
            {
                Logger(ex, "Error adding car upload in db");
            }
        }


        public void SaveFile(IFormFile file, string folderName, string id)
        {
            try
            {
                var filePath = Path.Combine(_env.WebRootPath, "uploads", folderName, id, "Image");
                if (!Directory.Exists(filePath))
                {
                    Directory.CreateDirectory(filePath);
                }
           (new FileInfo(filePath)).Directory.Create();

                using (var fileStream = new FileStream(Path.Combine(filePath, file.FileName), FileMode.Create))
                {
                    file.CopyTo(fileStream);

                    fileStream.Close();
                }
            }
            catch (Exception ex)
            {
                Logger(ex, "Error adding save image in folder");
            }
        }


         public async Task<IEnumerable<Car>> CarsFilterLocationAsync(Location location)
         {
            try
            {
                return await _context
                    .Car
                    .Where(x => x.IsDeleted != true)
                    .Where(x=> x.CarLocationId==location.Id)
                    .Include(x=>x.Booking)
                    .Include(x => x.Brand)
                    .Include(x => x.Model)
                    .Include(x => x.FuelType)
                    .Include(x => x.TransmisionType)
                    .Include(x => x.CarUpload)
                    .ToListAsync();
              
            }
            catch (Exception ex)
            {

                Logger(ex, "Getting cars from db failed");
                return null; 
            }
            
         }


        public async Task<List<Booking>> GetPreBookingsAsync(int carId)
        {
            try
            {
                return await _context
                    .Booking
                    .Where(x => x.CarId == carId)
                    .ToListAsync();
            }
            catch (Exception ex)
            {

                Logger(ex, "Getting cars from db failed");
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
