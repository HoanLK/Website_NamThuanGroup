using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("about-us")]
    public class AboutController : BaseController
    {
        // GET: /about-us
        [Route()]
        public ActionResult Index()
        {
            ViewBag.currentMenu = "AboutUs";

            return View();
        }

        // GET: /about-us/development-history
        [Route("development-history")]
        public ActionResult DevelopmentHistory()
        {
            ViewBag.currentMenu = "AboutUs";

            return View();
        }
    }
}