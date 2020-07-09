using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class LayoutController : Controller
    {
        CMSEntities db = new CMSEntities();

        // GET: Layout
        public ActionResult Index()
        {
            return View();
        }

        //Header Top
        public ActionResult HeaderTop()
        {
            HeaderTopViewModel model = new HeaderTopViewModel();
            model.InfoCompany = db.InfoCompanies.Find(1);

            return PartialView("~/Views/Shared/_HeaderTop.cshtml", model);
        }

        //Footer
        public ActionResult Footer()
        {
            FooterViewModel model = new FooterViewModel();
            model.InfoCompany = db.InfoCompanies.Find(1);

            return PartialView("~/Views/Shared/_Footer.cshtml", model);
        }

        //Sidebar1
        public ActionResult Sidebar1()
        {
            Sidebar1ViewModel model = new Sidebar1ViewModel();

            return PartialView("~/Views/Shared/_Sidebar1.cshtml", model);
        }
    }
}