using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Module;
using DevExtreme.AspNet.Data;
using Microsoft.AspNet.Identity;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.OData;

namespace CMS.APIs
{
    [Authorize]
    public class ModuleAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public ModuleAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Create
                    cfg.CreateMap<ModuleCreateResource, Module>();
                    // Edit
                    cfg.CreateMap<ModuleEditResource, Module>();
                    cfg.CreateMap<Module, ModuleEditResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/ModuleAPI
        public object Gets(DataSourceLoadOptions loadOptions)
        {
            if (loadOptions is null)
            {
                return BadRequest();
            }

            loadOptions.PrimaryKey = new[] { "Id" };
            loadOptions.PaginateViaPrimaryKey = true;

            return DataSourceLoader.Load(_db.Modules, loadOptions);
        }

        // GET: api/ModuleAPI/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Module data = await _db.Modules.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Module, ModuleEditResource>(data));
        }

        // PATCH: api/ModuleAPI/5
        [HttpPatch]
        [AcceptVerbs("PATCH", "MERGE")]
        public async Task<IHttpActionResult> PatchAsync(int id, Delta<Module> resource)
        {
            var data = await _db.Modules.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            // Logs
            data.ModifyTime = DateTime.Now;
            data.ModifyUser = User.Identity.Name;

            resource.Patch(data);
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

        // PUT: api/ModuleAPI/5
        public async Task<IHttpActionResult> PutAsync(int id, ModuleEditResource resource)
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

            Module data = await _db.Modules.FindAsync(id);

            if (data is null)
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

        // POST: api/ModuleAPI
        public async Task<IHttpActionResult> PostAsync(ModuleCreateResource resource)
        {
            if (resource is null)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            Module data = _mapper.Map<ModuleCreateResource, Module>(resource);
            data.CreateUser = User.Identity.GetUserId();
            data.CreateTime = DateTime.Now;

            _db.Modules.Add(data);

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

        // DELETE: api/ModuleAPI/5
        public async Task<IHttpActionResult> DeleteAsync(int id)
        {
            Module data = await _db.Modules.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            // Delete Module
            _db.Modules.Remove(data);

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