using System;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace CMS.Services
{
    public class EmailService
    {
        public async Task<bool> SendEmailAsync(string email, string subject, string body)
        {
            try
            {
                MailMessage mail = new MailMessage
                {
                    From = new MailAddress("noreply@namthuangroup.com"),
                    Subject = subject,
                    Body = body,
                    IsBodyHtml = true
                };
                mail.To.Add(new MailAddress(email));

                SmtpClient smtp = new SmtpClient
                {
                    Host = "mail.namthuangroup.com",
                    Port = 587,
                    Credentials = new NetworkCredential(
                        userName: "noreply@namthuangroup.com",
                        password: "Abcd@1234"),
                    EnableSsl = false,
                    
                };
                await smtp.SendMailAsync(mail);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}