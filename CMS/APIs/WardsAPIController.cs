using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.APIs
{
    public class WardsAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/WardsAPI
        public IQueryable<Ward> GetWards()
        {
            return db.Wards;
        }

        // GET: api/WardsAPI?request=...&&value=...
        public IQueryable<Ward> GetWards(string request, string value)
        {
            if (request == "DistrictId")
            {
                if (int.TryParse(value, out int districtId))
                {
                    return db.Wards.Where(p => p.DistrictId == districtId);
                }
            }

            return null;
        }

        // GET: api/WardsAPI/5
        [ResponseType(typeof(Ward))]
        public async Task<IHttpActionResult> GetWard(int id)
        {
            Ward ward = await db.Wards.FindAsync(id);
            if (ward == null)
            {
                return NotFound();
            }

            return Ok(ward);
        }

        // PUT: api/WardsAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutWard(int id, Ward ward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != ward.Id)
            {
                return BadRequest();
            }

            db.Entry(ward).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WardExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/WardsAPI
        [ResponseType(typeof(Ward))]
        public async Task<IHttpActionResult> PostWard(Ward ward)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Wards.Add(ward);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (WardExists(ward.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = ward.Id }, ward);
        }

        // DELETE: api/WardsAPI/5
        [ResponseType(typeof(Ward))]
        public async Task<IHttpActionResult> DeleteWard(int id)
        {
            Ward ward = await db.Wards.FindAsync(id);
            if (ward == null)
            {
                return NotFound();
            }

            db.Wards.Remove(ward);
            await db.SaveChangesAsync();

            return Ok(ward);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool WardExists(int id)
        {
            return db.Wards.Count(e => e.Id == id) > 0;
        }
    }
}