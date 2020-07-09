using CMS.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CMS.Areas.Admin.Controllers
{
    public class ImageProjectController : Controller
    {
        private CMSEntities db = new CMSEntities();

        // GET: Admin/ImageProject
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult AddList(ImageProject[] images)
        {
            if(images != null)
            {
                db.ImageProjects.AddRange(images);

                try
                {
                    db.SaveChanges();
                    return Json(images, JsonRequestBehavior.AllowGet);
                }
                catch (Exception)
                {

                    throw;
                }
            }

            return null;
        }
    }
}