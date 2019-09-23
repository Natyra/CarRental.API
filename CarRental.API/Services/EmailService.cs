using CarRental.API.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Mail;
using System.Net.Mime;
using System.Reflection;
using System.Threading.Tasks;

namespace CarRental.API.Services
{
    public class EmailService: IEmailService
    {
        private IAppLogger<EmailService> _logger;

        public EmailService(IAppLogger<EmailService> logger)
        {
            _logger = logger;
        }
        public Task SendEmailAsync(string email, string subject, string message, bool isContact)
        {
            try
            {
                string text = string.Format(subject, message);
                string emailFrom = "rentalcar53@gmail.com"; //your test email with gmail

                SmtpClient client = new SmtpClient("smtp.gmail.com", Convert.ToInt32(587));
                client.UseDefaultCredentials = false;


                //In next step we will do this in db, will add a table for app settings
                client.Credentials = new NetworkCredential(emailFrom, "P@ssword1234");

                MailMessage mailMessage = new MailMessage();
                if (isContact)
                {
                    mailMessage.From = new MailAddress(email);
                    mailMessage.To.Add(emailFrom);
                }
                else
                {
                    mailMessage.From = new MailAddress(emailFrom);
                    mailMessage.To.Add(email);
                }


                mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(text, null, MediaTypeNames.Text.Plain));
                mailMessage.AlternateViews.Add(AlternateView.CreateAlternateViewFromString(message, null, MediaTypeNames.Text.Html));

                mailMessage.Body = message;
                mailMessage.Subject = subject;
                client.EnableSsl = true;
                client.Send(mailMessage);

                return Task.CompletedTask;
            }
            catch (Exception ex)
            {
                Logger(ex,"Error while sending email");
                throw;
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
