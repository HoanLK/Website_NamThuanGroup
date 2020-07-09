using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using CMS.Models;
using CMS.Areas.Admin.Models;

namespace CMS.Areas.Admin.Controllers
{
    public class CategoryPostController : Controller
    {
        // GET: Admin/CategoryPost
        public ActionResult Index()
        {
            return View();
        }
    }
}