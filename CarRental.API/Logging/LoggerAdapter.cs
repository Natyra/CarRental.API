using CarRental.API.Interfaces;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace CarRental.API.Logging
{
    public class LoggerAdapter<T> : IAppLogger<T>
    {
        private readonly ILogger<T> _logger;

        public LoggerAdapter(ILoggerFactory logger)
        {
            _logger = logger.CreateLogger<T>();

        }
        public void LogError(string message, params object[] args)
        {
            _logger.LogError(string.Format("Warning: {0} at: {1}", message, DateTime.Now), args);

        }

        public void LogInformation(string message, params object[] args)
        {
            _logger.LogInformation(string.Format("Warning: {0} at: {1}", message, DateTime.Now), args);

        }

        public void LogWarning(string message, params object[] args)
        {
            _logger.LogWarning(string.Format("Warning: {0} at: {1}", message, DateTime.Now), args);
        }
    }
}
