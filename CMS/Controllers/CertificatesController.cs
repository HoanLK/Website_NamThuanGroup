using CMS.Models;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("certificates")]
    public class CertificatesController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();

        // GET: /certificates
        [Route()]
        public async Task<ActionResult> Index()
        {
            var info = _db.Infoes.Find(1);

            ViewBag.currentMenu = "Certificate";
            // SEO
            ViewBag.title = Resources.Certificate;
            ViewBag.keywords = info.Keywords;
            ViewBag.description = info.Description;
            ViewBag.url = info.URL + "/certificates";
            ViewBag.image = info.URL + info.Image;

            List<Certificate> model = await _db.Certificates.Where(p => p.Published == true).AsNoTracking().ToListAsync();

            return View(model);
        }
    }
}