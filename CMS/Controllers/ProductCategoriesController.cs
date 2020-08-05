using CMS.Models;
using CMS.Models.ViewModels;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http.OData.Query;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("product-categories")]
    public class ProductCategoriesController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private CultureInfo _culture;

        // GET: /product-categories
        [Route()]
        public async Task<ActionResult> Index()
        {
            _culture = CultureInfo.CurrentCulture;

            ViewBag.currentMenu = "Products";

            List<ProductCategoryViewModel> model = await _db.ProductCategories.Where(p => p.Published == true)
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
                                                                                   .ToListAsync();

            return View(model);
        }

        // GET: /product-categories/5
        [Route("{id}")]
        public async Task<ActionResult> Detail(int id)
        {
            var category = await _db.ProductCategories.FindAsync(id);

            if (category == null)
            {
                return View("~/Views/Shared/_NotFound.cshtml");
            }

            _culture = CultureInfo.CurrentCulture;
            ViewBag.currentMenu = "Products";

            DetailProductCategoryViewModel model = new DetailProductCategoryViewModel()
            {
                Category = new ProductCategoryViewModel()
                {
                    Id = category.Id,
                    Name = (_culture.Name == "vi") ? category.VN_Name : category.EN_Name,
                    Description = (_culture.Name == "vi") ? category.VN_Description : category.EN_Description,
                    Featured = category.Featured,
                    Image = category.Image,
                    ImageBanner = category.ImageBanner,
                    SortOrder = category.SortOrder
                },
                Products = await _db.Products.Where(p => p.CategoryId == id && p.Published == true)
                                             .AsNoTracking()
                                             .OrderBy(p => p.SortOrder)
                                             .Select(p => new ProductViewModel
                                             {
                                                 Id = p.Id,
                                                 CategoryId = p.CategoryId,
                                                 Image = p.Image,
                                                 Name = (_culture.Name == "vi") ? p.VN_Name : p.EN_Name,
                                                 SortOrder = p.SortOrder
                                             })
                                             .ToListAsync()
            };

            return View(model);
        }
    }
}