using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("certificates")]
    public class CertificatesController : Controller
    {
        // GET: /certificates
        [Route()]
        public ActionResult Index()
        {
            ViewBag.currentMenu = "Certificate";

            return View();
        }
    }
}