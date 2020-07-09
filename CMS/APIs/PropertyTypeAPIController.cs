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
    public class PropertyTypeAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/PropertyTypeAPI
        public IQueryable<PropertyType> GetPropertyTypes()
        {
            return db.PropertyTypes.OrderBy(p => p.Order);
        }

        // GET: api/PropertyTypeAPI/5
        [ResponseType(typeof(PropertyType))]
        public async Task<IHttpActionResult> GetPropertyType(string id)
        {
            PropertyType propertyType = await db.PropertyTypes.FindAsync(id);
            if (propertyType == null)
            {
                return NotFound();
            }

            return Ok(propertyType);
        }

        // PUT: api/PropertyTypeAPI/5
        [ResponseType(typeof(void))]
        public async Task<IHttpActionResult> PutPropertyType(string id, PropertyType propertyType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != propertyType.Id)
            {
                return BadRequest();
            }

            db.Entry(propertyType).State = EntityState.Modified;

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PropertyTypeExists(id))
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

        // POST: api/PropertyTypeAPI
        [ResponseType(typeof(PropertyType))]
        public async Task<IHttpActionResult> PostPropertyType(PropertyType propertyType)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PropertyTypes.Add(propertyType);

            try
            {
                await db.SaveChangesAsync();
            }
            catch (DbUpdateException)
            {
                if (PropertyTypeExists(propertyType.Id))
                {
                    return Conflict();
                }
                else
                {
                    throw;
                }
            }

            return CreatedAtRoute("DefaultApi", new { id = propertyType.Id }, propertyType);
        }

        // DELETE: api/PropertyTypeAPI/5
        [ResponseType(typeof(PropertyType))]
        public async Task<IHttpActionResult> DeletePropertyType(string id)
        {
            PropertyType propertyType = await db.PropertyTypes.FindAsync(id);
            if (propertyType == null)
            {
                return NotFound();
            }

            db.PropertyTypes.Remove(propertyType);
            await db.SaveChangesAsync();

            return Ok(propertyType);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PropertyTypeExists(string id)
        {
            return db.PropertyTypes.Count(e => e.Id == id) > 0;
        }
    }
}