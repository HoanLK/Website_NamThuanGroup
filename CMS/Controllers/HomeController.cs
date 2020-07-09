using CMS.Models;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class HomeController : Controller
    {
        private CMSEntities db = new CMSEntities();

        public ActionResult Index()
        {
            // Set Title
            ViewBag.title = "Trang chủ";
            ViewBag.image = "";

            return View();
        }
    }
}
