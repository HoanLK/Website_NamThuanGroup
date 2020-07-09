using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("san-pham")]
    public class ProductsController : Controller
    {
        // GET: /san-pham
        [Route()]
        public ActionResult Index()
        {
            ViewBag.title = "Sản phẩm";

            return View();
        }

        
        // GET: /san-pham/{alias}-{id}
        [Route("{alias}-{id:int}")]
        public ActionResult List(string alias, int id)
        {
            ViewBag.title = "Sản phẩm";

            return View();
        }

        // GET: /san-pham/thang-may-gia-dinh
        [Route("thang-may-gia-dinh")]
        public ActionResult ThangMayGiaDinh()
        {
            ViewBag.title = "Thang máy gia đình";

            return View();
        }
        
    }
}