using System;
using System.Globalization;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using Microsoft.AspNet.Identity;
using Microsoft.AspNet.Identity.Owin;
using Microsoft.Owin.Security;

using CMS.Models;
using System.IO;

namespace CMS.Controllers
{
    [Authorize]
    public class AccountController : Controller
    {
        private ApplicationSignInManager _signInManager;
        private ApplicationUserManager _userManager;
        private CMSEntities _db = new CMSEntities();

        public AccountController()
        {
        }

        public AccountController(ApplicationUserManager userManager, ApplicationSignInManager signInManager)
        {
            UserManager = userManager;
            SignInManager = signInManager;
        }

        public ApplicationSignInManager SignInManager
        {
            get
            {
                return _signInManager ?? HttpContext.GetOwinContext().Get<ApplicationSignInManager>();
            }
            private set
            {
                _signInManager = value;
            }
        }

        public ApplicationUserManager UserManager
        {
            get
            {
                return _userManager ?? HttpContext.GetOwinContext().GetUserManager<ApplicationUserManager>();
            }
            private set
            {
                _userManager = value;
            }
        }

        // GET: /Account/Login
        [AllowAnonymous]
        public ActionResult Login(string returnUrl)
        {
            ViewBag.ReturnUrl = returnUrl;

            LoginViewModel model = new LoginViewModel()
            {
                RememberMe = true
            };

            return View(model);
        }

        // POST: /Account/Login
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Login(LoginViewModel model, string returnUrl)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // This doesn't count login failures towards account lockout
            // To enable password failures to trigger account lockout, change to shouldLockout: true
            var result = await SignInManager.PasswordSignInAsync(model.Email, model.Password, model.RememberMe, shouldLockout: true);

            // If it was a successful login
            if (result == SignInStatus.Success || result == SignInStatus.RequiresVerification)
            {
                // check that their email address is confirmed:
                var user = await UserManager.FindByNameAsync(model.Email);
                if (!await UserManager.IsEmailConfirmedAsync(user.Id))
                {
                    // sign them out!
                    AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);

                    TempData["UserId"] = user.Id;
                    return RedirectToAction("UnconfirmedEmail");
                }

                // reset their login 
            }

            switch (result)
            {
                case SignInStatus.Success:
                    {
                        if (String.IsNullOrEmpty(returnUrl) || String.IsNullOrWhiteSpace(returnUrl))
                        {
                            return RedirectToLocal("/Admin");
                        }
                        else
                        {
                            return RedirectToLocal(returnUrl);
                        }
                    }

                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.RequiresVerification:
                    return RedirectToAction("SendCode", new { ReturnUrl = returnUrl, RememberMe = model.RememberMe });
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Thông tin đăng nhập chưa đúng");
                    return View(model);
            }
        }

        [AllowAnonymous]
        public ActionResult UnconfirmedEmail()
        {
            ResendValidationEmailViewModel ViewModel = new ResendValidationEmailViewModel();
            ViewModel.UserId = (string)TempData["UserId"];
            return View(ViewModel);
        }


        [AllowAnonymous]
        [HttpPost]
        public async Task<ActionResult> ResendValidationEmail(ResendValidationEmailViewModel ViewModel)
        {
            string callbackUrl = await generateConfirmAccountEmail(ViewModel.UserId);

#if DEBUG
            ViewModel.CallbackUrl = callbackUrl;
#endif

            return View(ViewModel);
        }


        private async Task<string> generateConfirmAccountEmail(string userId)
        {
            //Get body email
            string body;
            using (var sr = new StreamReader(Server.MapPath("\\Content\\Backend\\Templates\\Email\\") + "ConfirmAccount.txt"))
            {
                body = sr.ReadToEnd();
            }

            try
            {
                //Get email
                string email = UserManager.GetEmail(userId);

                //Gen link comfirm
                string code = await UserManager.GenerateEmailConfirmationTokenAsync(userId);
                var routeValues = new { userId = userId, code = code };
                var callbackUrl =
                    Url.Action("ConfirmEmail", "Account", routeValues, protocol: Request.Url.Scheme);

                string messageBody = string.Format(body, email, callbackUrl.ToString());

                //Send Email
                Emailer emailer = new Emailer();
                emailer.sendEmail(email, "Xác nhận Email", messageBody);

                return callbackUrl;
            }
            catch (Exception)
            {

                throw;
            }




        }

        // GET: /Account/VerifyCode
        [AllowAnonymous]
        public async Task<ActionResult> VerifyCode(string provider, string returnUrl, bool rememberMe)
        {
            // Require that the user has already logged in via username/password or external login
            if (!await SignInManager.HasBeenVerifiedAsync())
            {
                return View("Error");
            }
            return View(new VerifyCodeViewModel { Provider = provider, ReturnUrl = returnUrl, RememberMe = rememberMe });
        }

        // POST: /Account/VerifyCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> VerifyCode(VerifyCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }

            // The following code protects for brute force attacks against the two factor codes. 
            // If a user enters incorrect codes for a specified amount of time then the user account 
            // will be locked out for a specified amount of time. 
            // You can configure the account lockout settings in IdentityConfig
            var result = await SignInManager.TwoFactorSignInAsync(
                model.Provider,
                model.Code,
                isPersistent: model.RememberMe,
                rememberBrowser: model.RememberBrowser);

            switch (result)
            {
                case SignInStatus.Success:
                    return RedirectToLocal("/Admin");
                case SignInStatus.LockedOut:
                    return View("Lockout");
                case SignInStatus.Failure:
                default:
                    ModelState.AddModelError("", "Mã xác nhận sai.");
                    return View(model);
            }
        }

        //
        // GET: /Account/Register
        [Authorize]
        public ActionResult Register()
        {
            return View();
        }

        //
        // POST: /Account/Register
        [HttpPost]
        [Authorize]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> Register(RegisterViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = new CMS.Models.ApplicationUser { UserName = model.Email, Email = model.Email };

                var result = await UserManager.CreateAsync(user, model.Password);
                //Tạo tài khoản thành công
                if (result.Succeeded)
                {
                    //Tự động kích hoạt Email
                    if (model.AutoConfirm)
                    {
                        var infoUser = _db.AspNetUsers.Where(p => p.Email == model.Email).FirstOrDefault();
                        if (infoUser != null)
                        {
                            infoUser.EmailConfirmed = true;
                            await _db.SaveChangesAsync();

                            ViewBag.Message = "Nhấn vào Trang quản trị để trở về.";
                        }
                    }
                    //Không thì gửi mail kích hoạt
                    else
                    {
                        var callbackUrl = await generateConfirmAccountEmail(user.Id);

#if DEBUG
                        TempData["ViewBagLink"] = callbackUrl;
#endif

                        ViewBag.Message = "Xin vui lòng kiểm tra Email để xác nhận.";


                    }

                    return View("Info");
                }
                //Báo lỗi
                AddErrors(result);
            }

            return View(model);
        }

        // GET: /Account/ConfirmEmail
        [AllowAnonymous]
        public async Task<ActionResult> ConfirmEmail(string userId, string code)
        {
            if (userId == null || code == null)
            {
                ViewBag.Title = "Link xác thực không đúng";
                ViewBag.Message = "Vui lòng kiểm tra Email";

                return View("Error");
            }

            var user = UserManager.FindById(userId);

            if (user == null)
            {
                ViewBag.Title = "Tài khoản không tồn tại";
                ViewBag.Message = "Vui lòng liên hệ với Quản trị viên";

                return View("Error");
            }

            var result = await UserManager.ConfirmEmailAsync(userId, code);
            return View(result.Succeeded ? "ConfirmEmail" : "Error");
        }

        // GET: /Account/ForgotPassword
        [AllowAnonymous]
        public ActionResult ForgotPassword()
        {
            return View();
        }

        // POST: /Account/ForgotPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ForgotPassword(ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await UserManager.FindByNameAsync(model.Email);
                if (user == null || !(await UserManager.IsEmailConfirmedAsync(user.Id)))
                {
                    // Don't reveal that the user does not exist or is not confirmed
                    return View("ForgotPasswordConfirmation");
                }

                // For more information on how to enable account confirmation and password reset please visit http://go.microsoft.com/fwlink/?LinkID=320771
                // Send an email with this link
                string code = await UserManager.GeneratePasswordResetTokenAsync(user.Id);
                var callbackUrl = Url.Action("ResetPassword", "Account", new { userId = user.Id, code = code }, protocol: Request.Url.Scheme);

                Emailer emailer = new Emailer();
                emailer.sendEmail(model.Email, "Reset Password", "Vui lòng nhấn <a href=\"" + callbackUrl + "\"><b>vào đây</b></a> để thiết lập lại Mật khẩu");

                return RedirectToAction("ForgotPasswordConfirmation", "Account");
            }

            // If we got this far, something failed, redisplay form
            return View(model);
        }

        // GET: /Account/ForgotPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ForgotPasswordConfirmation()
        {
            return View();
        }

        // GET: /Account/ResetPassword
        [AllowAnonymous]
        public ActionResult ResetPassword(string code)
        {
            return code == null ? View("Error") : View();
        }

        // POST: /Account/ResetPassword
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View(model);
            }
            var user = await UserManager.FindByNameAsync(model.Email);
            if (user == null)
            {
                // Don't reveal that the user does not exist
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            var result = await UserManager.ResetPasswordAsync(user.Id, model.Code, model.Password);
            if (result.Succeeded)
            {
                return RedirectToAction("ResetPasswordConfirmation", "Account");
            }
            AddErrors(result);
            return View();
        }

        // GET: /Account/ResetPasswordConfirmation
        [AllowAnonymous]
        public ActionResult ResetPasswordConfirmation()
        {
            return View();
        }



        // GET: /Account/SendCode
        [AllowAnonymous]
        public async Task<ActionResult> SendCode(string returnUrl, bool rememberMe)
        {
            var userId = await SignInManager.GetVerifiedUserIdAsync();
            if (userId == null)
            {
                return View("Error");
            }
            var userFactors = await UserManager.GetValidTwoFactorProvidersAsync(userId);

            // If there's only one, don't make the user select it
            if (userFactors.Count == 1)
            {
                return RedirectToAction("VerifyCode", new
                {
                    Provider = userFactors[0],
                    ReturnUrl = returnUrl,
                    RememberMe = rememberMe
                });
            }

            var factorOptions = userFactors.Select(
                purpose => new SelectListItem { Text = purpose, Value = purpose }).ToList();

            return View(new SendCodeViewModel
            {
                Providers = factorOptions,
                ReturnUrl = returnUrl,
                RememberMe = rememberMe
            });
        }

        // POST: /Account/SendCode
        [HttpPost]
        [AllowAnonymous]
        [ValidateAntiForgeryToken]
        public async Task<ActionResult> SendCode(SendCodeViewModel model)
        {
            if (!ModelState.IsValid)
            {
                return View();
            }

            // Generate the token and send it
            if (!await SignInManager.SendTwoFactorCodeAsync(model.SelectedProvider))
            {
                return View("Error");
            }
            return RedirectToAction("VerifyCode", new { Provider = model.SelectedProvider, ReturnUrl = model.ReturnUrl, RememberMe = model.RememberMe });
        }


        public ActionResult LogOff()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie);
            return RedirectToAction("Login", "Account");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                if (_userManager != null)
                {
                    _userManager.Dispose();
                    _userManager = null;
                }

                if (_signInManager != null)
                {
                    _signInManager.Dispose();
                    _signInManager = null;
                }
            }

            base.Dispose(disposing);
        }

        #region Helpers
        // Used for XSRF protection when adding external logins
        private const string XsrfKey = "XsrfId";

        private IAuthenticationManager AuthenticationManager
        {
            get
            {
                return HttpContext.GetOwinContext().Authentication;
            }
        }

        private void AddErrors(IdentityResult result)
        {
            foreach (var error in result.Errors)
            {
                ModelState.AddModelError("", error);
            }
        }

        private ActionResult RedirectToLocal(string returnUrl)
        {
            if (Url.IsLocalUrl(returnUrl))
            {
                return Redirect(returnUrl);
            }
            return RedirectToAction("Index", "Home");
        }

        internal class ChallengeResult : HttpUnauthorizedResult
        {
            public ChallengeResult(string provider, string redirectUri)
                : this(provider, redirectUri, null)
            {
            }

            public ChallengeResult(string provider, string redirectUri, string userId)
            {
                LoginProvider = provider;
                RedirectUri = redirectUri;
                UserId = userId;
            }

            public string LoginProvider { get; set; }
            public string RedirectUri { get; set; }
            public string UserId { get; set; }

            public override void ExecuteResult(ControllerContext context)
            {
                var properties = new AuthenticationProperties { RedirectUri = RedirectUri };
                if (UserId != null)
                {
                    properties.Dictionary[XsrfKey] = UserId;
                }
                context.HttpContext.GetOwinContext().Authentication.Challenge(properties, LoginProvider);
            }
        }
        #endregion

        public JsonResult GetCurrentAccount()
        {
            var idUser = User.Identity.GetUserId();

            var model = (
                from u in _db.AspNetUsers
                where u.Id == idUser
                select new
                {
                    u.Id,
                    u.Email,
                }
            ).FirstOrDefault();

            return Json(model, JsonRequestBehavior.AllowGet);
        }
    }
}