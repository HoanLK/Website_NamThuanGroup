using CMS.Models;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;

namespace CMS.APIs
{
    public class ModuleODataController : ODataController
    {
        private readonly CMSEntities _db = new CMSEntities();

        // PATCH: odata/ModuleOData(5)
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> Patch([FromODataUri] int key, Delta<Module> patch)
        {
            Validate(patch.GetEntity());

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var data = await _db.Modules.FindAsync(key);
            if (data is null)
            {
                return NotFound();
            }

            // Logs
            data.ModifyTime = DateTime.Now;
            data.ModifyUser = User.Identity.Name;

            patch.Patch(data);
            _db.Entry(data).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                return BadRequest("Lưu thất bại");
            }

            return Ok();
        }
    }
}