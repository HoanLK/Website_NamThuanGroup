//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CMS.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class ComponentImage
    {
        public int Id { get; set; }
        public Nullable<int> ComponentId { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public string Link { get; set; }
    
        public virtual Component Component { get; set; }
    }
}