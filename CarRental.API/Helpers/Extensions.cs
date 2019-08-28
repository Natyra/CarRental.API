using CarRental.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Helpers
{
    public class Extensions<T> where T:class
    {
        private readonly IAppLogger<T> _logger;

        public Extensions(IAppLogger<T> logger)
        {
            _logger = logger;
        }

        public void Logger(Exception ex, string message)
        {
            var errorMessage = (ex.InnerException?.Message != null ? ex.InnerException.Message : ex.Message);

            _logger.LogError(message + errorMessage);
        }
    }
}
