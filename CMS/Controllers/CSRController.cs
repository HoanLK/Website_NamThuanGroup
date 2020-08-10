using AutoMapper;
using CMS.Models;
using CMS.Models.ViewModels;
using System.Collections.Generic;
using System.Configuration;
using System.Globalization;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("csr")]
    public class CSRController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;
        private CultureInfo _culture;

        public CSRController()
        {
            // MAPPER
            var config = new MapperConfiguration(
                cfg =>
                {
                    // Component => Component View Model
                    cfg.CreateMap<Component, ComponentViewModel>()
                          .ForMember(cvm => cvm.Id, opt => opt.MapFrom(c => c.Id))
                          .ForMember(cvm => cvm.MainTitle, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_MainTitle : c.EN_MainTitle))
                          .ForMember(cvm => cvm.SubTitle, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_SubTitle : c.EN_SubTitle))
                          .ForMember(cvm => cvm.Content, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_Content : c.EN_Content))
                          .ForMember(cvm => cvm.Link, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_Link : c.EN_Link))
                          .ForMember(cvm => cvm.TextButton, opt => opt.MapFrom(c => (_culture.Name == "vi") ? c.VN_TextButton : c.EN_TextButton))
                          .ForMember(cvm => cvm.IsSingleMedia, opt => opt.MapFrom(c => c.IsSingleMedia))
                          .ForMember(cvm => cvm.LinkMedia, opt => opt.MapFrom(c => c.LinkMedia))
                          .ForMember(cvm => cvm.AnimateIn, opt => opt.MapFrom(c => c.AnimateIn))
                          .ForMember(cvm => cvm.AnimateOut, opt => opt.MapFrom(c => c.AnimateOut))
                          .ForMember(cvm => cvm.Timeout, opt => opt.MapFrom(c => c.Timeout))
                          .ForMember(cvm => cvm.Icon, opt => opt.MapFrom(c => c.Icon))
                          .ForMember(cvm => cvm.SortOrder, opt => opt.MapFrom(c => c.SortOrder))
                          .ForMember(cvm => cvm.ComponentImages, opt => opt.MapFrom(c => c.ComponentImages));
                    // Module => Module View Model
                    cfg.CreateMap<Module, ModuleViewModel>()
                        .ForMember(mv => mv.Name, opt => opt.MapFrom(m => m.Name))
                        .ForMember
                        (
                            mv => mv.Components,
                            opt => opt.MapFrom
                            (
                                m => _mapper.Map<ICollection<Component>, ICollection<ComponentViewModel>>(m.Components)
                            )
                        );
                }
            );
            _mapper = new Mapper(config);
        }

        // GET: /csr
        [Route()]
        public async Task<ActionResult> Index()
        {
            var info = _db.Infoes.Find(1);

            ViewBag.currentMenu = "CSR";
            // SEO
            ViewBag.title = Resources.CSR;
            ViewBag.keywords = info.Keywords;
            ViewBag.description = info.Description;
            ViewBag.url = info.URL + "/csr";
            ViewBag.image = info.URL + info.Image;

            _culture = CultureInfo.CurrentCulture;

            CSRViewModel model = new CSRViewModel()
            {
                CSR = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:csr"))),
            };

            return View(model);
        }

        private int? GetComponentId(string key)
        {
            if (int.TryParse(ConfigurationManager.AppSettings[key], out int id))
            {
                return id;
            }

            return null;
        }
    }
}