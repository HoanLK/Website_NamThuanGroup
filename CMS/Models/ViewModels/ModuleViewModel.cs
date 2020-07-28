using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CMS.Models.ViewModels
{
    public class ModuleViewModel
    {
        public string Name { get; set; }
        public List<ComponentViewModel> Components { get; set; }
    }
}