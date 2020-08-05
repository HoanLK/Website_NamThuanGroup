using System.Net.Mail;

namespace CMS
{
    public class EmailerOLD
    {
        public void sendEmail(string email, string subject, string body)
        {
            MailMessage mail = new MailMessage();
            mail.To.Add(new MailAddress(email));
            mail.From = new MailAddress("myowebco@gmail.com");
            mail.Subject = subject;
            mail.Body = body;
            mail.IsBodyHtml = true;
            SmtpClient smtp = new SmtpClient();
            smtp.Host = "smtp.gmail.com";
            smtp.Port = 587;
            smtp.UseDefaultCredentials = false;
            smtp.Credentials = new System.Net.NetworkCredential("myowebco@gmail.com", "hoanlk93@");
            smtp.EnableSsl = true;
            smtp.Send(mail);
        }
    }
}