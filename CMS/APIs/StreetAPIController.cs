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
    public class StreetAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/StreetAPI
        public IQueryable<Street> GetStreets()
        {
            return db.Streets;
        }

        // GET: api/StreetAPI?request=...&&value=...
        public IQueryable<Street> GetStreets(string request, string value)
        {
            if (request == "DistrictId")
            {
                if (int.TryParse(value, out int districtId))
                {
                    return db.Streets.Where(p => p.DistrictId == districtId);
                }
            }

            return null;
        }

        // GET: api/StreetAPI/5
        [ResponseType(typeof(Street))]
        public async Task<IHttpActionResult> GetStreet(int id)
        {
            Street street = await db.Streets.FindAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            return Ok(street);
        }

        // PUT: api/StreetAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutStreet(int id, Street street)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != street.Id)
            {
                return BadRequest();
            }

            db.Entry(street).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StreetExists(id))
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

        // POST: api/StreetAPI
        [ResponseType(typeof(Street))]
        public async Task<IHttpActionResult> PostStreet(Street street)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Streets.Add(street);
            await db.SaveChangesAsync();

            return CreatedAtRoute("DefaultApi", new { id = street.Id }, street);
        }

        // DELETE: api/StreetAPI/5
        [ResponseType(typeof(Street))]
        public async Task<IHttpActionResult> DeleteStreet(int id)
        {
            Street street = await db.Streets.FindAsync(id);
            if (street == null)
            {
                return NotFound();
            }

            db.Streets.Remove(street);
            await db.SaveChangesAsync();

            return Ok(street);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool StreetExists(int id)
        {
            return db.Streets.Count(e => e.Id == id) > 0;
        }
    }
}