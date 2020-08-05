using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Certificate;
using CMS.Models.Resources.Post;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    [Authorize]
    public class CertificateAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public CertificateAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<CertificateCreateResource, Certificate>();
                    // Edit
                    cfg.CreateMap<CertificateEditResource, Certificate>();
                    cfg.CreateMap<Certificate, CertificateEditResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/CertificateAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.Certificates, loadOptions);
        }

        // GET: api/CertificateAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Certificate data = await _db.Certificates.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Certificate, CertificateEditResource>(data));
        }

        // PUT: api/CertificateAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, CertificateEditResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != resource.Id)
            {
                return BadRequest();
            }

            if (resource is null)
            {
                return BadRequest();
            }

            Certificate data = await _db.Certificates.FindAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            _mapper.Map(resource, data);
            data.ModifyUser = User.Identity.GetUserId();
            data.ModifyTime = DateTime.Now;

            _db.Entry(data).State = EntityState.Modified;

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }

        // POST: api/CertificateAPI
        public async Task<IHttpActionResult> PostAsync(CertificateCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Certificate data = _mapper.Map<CertificateCreateResource, Certificate>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.Certificates.Add(data);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok(data.Id);
        }

        // DELETE: api/CertificateAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Certificate data = await _db.Certificates.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            _db.Certificates.Remove(data);

            try
            {
                await _db.SaveChangesAsync();
            }
            catch (Exception)
            {
                throw;
            }

            return Ok();
        }
    }
}