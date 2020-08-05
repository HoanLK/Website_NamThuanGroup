using AutoMapper;
using CMS.Models;
using CMS.Models.Resources.Info;
using System;
using System.Data.Entity;
using System.Threading.Tasks;
using System.Web.Http;

namespace CMS.APIs
{
    public class InfoAPIController : ApiController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;

        public InfoAPIController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    cfg.CreateMap<InfoResource, Info>();
                    cfg.CreateMap<Info, InfoResource>();
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: api/Info/5
        public async Task<IHttpActionResult> GetAsync(int id)
        {
            Info data = await _db.Infoes.FindAsync(id);
            if (data is null)
            {
                return NotFound();
            }

            return Ok(_mapper.Map<Info, InfoResource>(data));
        }

        // PUT: api/Info/5
        public async Task<IHttpActionResult> PutAsync(int id, InfoResource resource)
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

            Info data = await _db.Infoes.FindAsync(id);

            if (data == null)
            {
                return NotFound();
            }

            _mapper.Map(resource, data);

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
    }
}