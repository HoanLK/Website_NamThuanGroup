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
    public class DistrictAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/DistrictAPI
        public IQueryable<District> GetDistricts()
        {
            return db.Districts;
        }

        // GET: api/DistrictAPI?request=...&&value=...
        public IQueryable<District> GetDistricts(string request, string value)
        {
            if(request == "CityId")
            {
                return db.Districts.Where(p => p.CityId == value);
            }

            return null;
        }

        //GET: api/DistrictAPI/5
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> GetDistrict(int id)
        {
            District district = await db.Districts.FindAsync(id);
            if (district == null)
            {
                return NotFound();
            }

            return Ok(district);
        }

        // PUT: api/DistrictAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutDistrict(int id, District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != district.Id)
            {
                return BadRequest();
            }

            db.Entry(district).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DistrictExists(id))
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

        // POST: api/DistrictAPI
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> PostDistrict(District district)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Districts.Add(district);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (DistrictExists(district.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = district.Id }, district);
        }

        // DELETE: api/DistrictAPI/5
        [ResponseType(typeof(District))]
        public async Task<IHttpActionResult> DeleteDistrict(int id)
        {
            District district = await db.Districts.FindAsync(id);
            if (district == null)
            {
                return NotFound();
            }

            db.Districts.Remove(district);
            await db.SaveChangesAsync();

            return Ok(district);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool DistrictExists(int id)
        {
            return db.Districts.Count(e => e.Id == id) > 0;
        }
    }
}