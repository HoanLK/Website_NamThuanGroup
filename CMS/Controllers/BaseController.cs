﻿using CMS.Helpers;
using System;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace CMS.Controllers
{
    public class BaseController : Controller
    {
        protected override IAsyncResult BeginExecuteCore(AsyncCallback callback, object state)
        {

            // Attempt to read the culture cookie from Request
            HttpCookie cultureCookie = Request.Cookies["_culture"];
            string cultureName;
            if (cultureCookie != null)
                cultureName = cultureCookie.Value;
            else
                cultureName = "en";
                //cultureName = Request.UserLanguages != null && Request.UserLanguages.Length > 0 ?
                //        Request.UserLanguages[0] :  // obtain it from HTTP header AcceptLanguages
                //        null;
            // Validate culture name
            cultureName = CultureHelper.GetImplementedCulture(cultureName); // This is safe

            // Modify current thread's cultures            
            Thread.CurrentThread.CurrentCulture = new System.Globalization.CultureInfo(cultureName);
            Thread.CurrentThread.CurrentUICulture = Thread.CurrentThread.CurrentCulture;

            return base.BeginExecuteCore(callback, state);
        }
    }
}