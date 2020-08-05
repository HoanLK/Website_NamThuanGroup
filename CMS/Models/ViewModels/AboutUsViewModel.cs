using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModels
{
    public class AboutUsViewModel
    {
        public ComponentViewModel Image { get; set; }
        public ComponentViewModel Vision { get; set; }
        public ComponentViewModel Mission { get; set; }
        public ComponentViewModel CoreValues { get; set; }
        public ComponentViewModel BrandingVision { get; set; }
        public ComponentViewModel PlanningVision { get; set; }
    }
}