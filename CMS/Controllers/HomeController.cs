using CMS.Helpers;
using CMS.Models;
using System;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class HomeController : BaseController
    {
        private CMSEntities db = new CMSEntities();

        [HttpGet]
        public ActionResult Index()
        {
            // Set Title
            ViewBag.title = "Trang chủ";
            ViewBag.currentMenu = "Home";

            return View();
        }


        // Set Culture
        public ActionResult SetCulture(string culture)
        {
            // Validate input
            culture = CultureHelper.GetImplementedCulture(culture);
            // Save culture in a cookie
            HttpCookie cookie = Request.Cookies["_culture"];
            if (cookie != null)
                cookie.Value = culture;   // update cookie value
            else
            {
                cookie = new HttpCookie("_culture");
                cookie.Value = culture;
                cookie.Expires = DateTime.Now.AddYears(1);
            }
            Response.Cookies.Add(cookie);

            return Json(culture, JsonRequestBehavior.AllowGet);
        }
    }
}
