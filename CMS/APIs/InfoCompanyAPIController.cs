using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Description;
using CMS.Models;

namespace CMS.APIs
{
    public class InfoCompanyAPIController : ApiController
    {
        private CMSEntities db = new CMSEntities();

        // GET: api/InfoCompanyAPI
        public IQueryable<InfoCompany> GetInfoCompanies()
        {
            return db.InfoCompanies;
        }

        // GET: api/InfoCompanyAPI/5
        [ResponseType(typeof(InfoCompany))]
        public IHttpActionResult GetInfoCompany(int id)
        {
            InfoCompany infoCompany = db.InfoCompanies.Find(id);
            if (infoCompany == null)
            {
                return NotFound();
            }

            return Ok(infoCompany);
        }

        // PUT: api/InfoCompanyAPI/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutInfoCompany(int id, InfoCompany infoCompany)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != infoCompany.Id)
            {
                return BadRequest();
            }

            db.Entry(infoCompany).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InfoCompanyExists(id))
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

        // POST: api/InfoCompanyAPI
        [ResponseType(typeof(InfoCompany))]
        public IHttpActionResult PostInfoCompany(InfoCompany infoCompany)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.InfoCompanies.Add(infoCompany);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = infoCompany.Id }, infoCompany);
        }

        // DELETE: api/InfoCompanyAPI/5
        [ResponseType(typeof(InfoCompany))]
        public IHttpActionResult DeleteInfoCompany(int id)
        {
            InfoCompany infoCompany = db.InfoCompanies.Find(id);
            if (infoCompany == null)
            {
                return NotFound();
            }

            db.InfoCompanies.Remove(infoCompany);
            db.SaveChanges();

            return Ok(infoCompany);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool InfoCompanyExists(int id)
        {
            return db.InfoCompanies.Count(e => e.Id == id) > 0;
        }
    }
}