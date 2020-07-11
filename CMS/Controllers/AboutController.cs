using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("about-us")]
    public class AboutController : Controller
    {
        // GET: /about-us
        [Route()]
        public ActionResult Index()
        {
            return View();
        }
    }
}