using CMS.Models;
using CMS.Models.ViewModels;
using CMS.Services;
using System.IO;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("contact-us")]
    public class ContactUsController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();

        [Route()]
        // GET: ContactUs
        public ActionResult Index()
        {
            var info = _db.Infoes.Find(1);

            ViewBag.currentMenu = "Contact";
            // SEO
            ViewBag.title = Resources.Contact;
            ViewBag.keywords = info.Keywords;
            ViewBag.description = info.Description;
            ViewBag.url = info.URL + "/contact-us";
            ViewBag.image = info.URL + info.Image;

            return View();
        }

        // POST: EmailContact
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> EmailContact(SendEmailContactViewModel model)
        {
            if (ModelState.IsValid)
            {
                // Get Template Email
                string template;
                using (var sr = new StreamReader(Server.MapPath("\\Content\\Email\\") + "Contact.html"))
                {
                    template = await sr.ReadToEndAsync();

                    string bodyEmail = string.Format(template, model.Name, model.Email, model.PhoneNumber, model.Company, model.Content);

                    // Send Email
                    EmailService emailService = new EmailService();
                    var result = await emailService.SendEmailAsync(Resources.CompanyEmail, "Thông tin khách liên hệ", bodyEmail);

                    if (result == true)
                    {
                        return Json(new { result = 1 });
                    }
                }
            }

            return Json(new { result = 0 });
        }

    }
}