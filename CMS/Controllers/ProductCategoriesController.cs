using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("product-categories")]
    public class ProductCategoriesController : BaseController
    {
        // GET: ProductCategories
        [Route()]
        public ActionResult Index()
        {
            ViewBag.currentMenu = "Products";

            return View();
        }
    }
}