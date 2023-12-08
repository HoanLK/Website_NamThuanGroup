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
                MailMessage mail = new MailMessage();

                mail.To.Add(new MailAddress(email));

                mail.From = new MailAddress("myowebco@gmail.com", "Nam Thuận Website");

                // Subject and Multipart/alternative Body
                mail.Subject = subject;
                mail.Body = body;
                mail.IsBodyHtml = true;

                // Init SmtpClient and send
                SmtpClient smtpClient = new SmtpClient("smtp.gmail.com", 587);
                NetworkCredential credentials = new NetworkCredential("myowebco@gmail.com", "apuk alzt wkfi azdh");
                smtpClient.Credentials = credentials;
                smtpClient.EnableSsl = true;

                await smtpClient.SendMailAsync(mail);

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }
    }
}