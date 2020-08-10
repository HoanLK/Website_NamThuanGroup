using CMS.Models;
using CMS.Models.ViewModels;
using System.Collections.Generic;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
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
            var info = _db.Infoes.Find(1);

            ViewBag.currentMenu = "Products";
            // SEO
            ViewBag.title = Resources.MenuProduct;
            ViewBag.keywords = info.Keywords;
            ViewBag.description = info.Description;
            ViewBag.url = info.URL + "/product-categories";
            ViewBag.image = info.URL + info.Image;

            _culture = CultureInfo.CurrentCulture;

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
            _culture = CultureInfo.CurrentCulture;

            var info = _db.Infoes.Find(1);
            var category = _db.ProductCategories.Find(id);

            ViewBag.currentMenu = "Products";
            // SEO
            ViewBag.title = (_culture.Name == "vi") ? category.VN_Name : category.EN_Name;
            ViewBag.keywords = category.SEO_Keywords;
            ViewBag.description = category.SEO_Description;
            ViewBag.url = info.URL + "/product-categories/" + id;
            ViewBag.image = info.URL + category.Image;

            if (category == null)
            {
                return View("~/Views/Shared/_NotFound.cshtml");
            }

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