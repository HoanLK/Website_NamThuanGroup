using CMS.Models;
using CMS.Models.ViewModels;
using CMS.Services;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Helpers;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class LayoutController : Controller
    {
        private readonly CMSEntities _db = new CMSEntities();
        private CultureInfo _culture;

        // GET: Layout
        public ActionResult Index()
        {
            return View();
        }

        // GET: MenuProduct
        public ActionResult MenuProduct()
        {
            _culture = CultureInfo.CurrentCulture;

            List<ProductCategoryViewModel> model = _db.ProductCategories.Where(p => p.Published == true)
                                                        .OrderBy(p => p.SortOrder)
                                                        .Select(p => new ProductCategoryViewModel
                                                        {
                                                            Id = p.Id,
                                                            Name = (_culture.Name == "vi") ? p.VN_Name : p.EN_Name,
                                                            Image = p.Image,
                                                            Featured = p.Featured,
                                                            SortOrder = p.SortOrder
                                                        })
                                                        .AsNoTracking()
                                                        .ToList();

            return PartialView("~/Views/Shared/_MenuProduct.cshtml", model);
        }

        // GET: Footer
        public ActionResult Footer()
        {
            _culture = CultureInfo.CurrentCulture;

            FooterViewModel model = new FooterViewModel()
            {
                Categories = _db.ProductCategories.Where(p => p.Published == true)
                                                       .AsNoTracking()
                                                       .OrderBy(p => p.SortOrder)
                                                       .Select(p => new ProductCategoryViewModel
                                                       {
                                                           Id = p.Id,
                                                           Name = (_culture.Name == "vi") ? p.VN_Name : p.EN_Name
                                                       })
                                                       .ToList()
            };

            return PartialView("~/Views/Shared/_Footer.cshtml", model);
        }

    }
}