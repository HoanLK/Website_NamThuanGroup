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
            ViewBag.currentMenu = "Certificate";

            List<Certificate> model = await _db.Certificates.Where(p => p.Published == true).AsNoTracking().ToListAsync();

            return View(model);
        }
    }
}