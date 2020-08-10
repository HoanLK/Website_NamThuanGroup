using AutoMapper;
using CMS.Models;
using CMS.Models.ViewModels;
using System.Collections.Generic;
using System.Configuration;
using System.Data.Entity;
using System.Globalization;
using System.Linq;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace CMS.Controllers
{
    [RoutePrefix("about-us")]
    public class AboutController : BaseController
    {
        private readonly CMSEntities _db = new CMSEntities();
        private readonly Mapper _mapper;
        private CultureInfo _culture;

        public AboutController()
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

        // GET: /about-us
        [Route()]
        public async Task<ActionResult> Index()
        {
            ViewBag.currentMenu = "AboutUs";

            _culture = CultureInfo.CurrentCulture;

            AboutUsViewModel model = new AboutUsViewModel()
            {
                Intro = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:Intro"))),
                Counter = _mapper.Map<Module, ModuleViewModel>(await _db.Modules.FindAsync(GetComponentId("template:aboutus:Counter"))),
                Image = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:Image"))),
                Vision = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:Vision"))),
                Mission = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:Mission"))),
                CoreValues = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:CoreValues"))),
                BrandingVision = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:BrandingVision"))),
                PlanningVision = _mapper.Map<Component, ComponentViewModel>(await _db.Components.FindAsync(GetComponentId("template:aboutus:PlanningVision")))
            };

            return View(model);
        }

        // GET: /about-us/development-history
        [Route("development-history")]
        public async Task<ActionResult> DevelopmentHistory()
        {
            ViewBag.currentMenu = "AboutUs";

            _culture = CultureInfo.CurrentCulture;

            int? id = GetComponentId("template:aboutus:DevelopmentHistory");
            DevelopmentHistoryViewModel model = new DevelopmentHistoryViewModel()
            {
                Components = _mapper.Map<List<Component>, List<ComponentViewModel>>(await _db.Components.Where(p => p.Published == true && p.ModuleId == id)
                                                              .AsNoTracking()
                                                              .OrderBy(p => p.SortOrder)
                                                              .ToListAsync())
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