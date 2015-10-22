using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using WebApplication6_landing.JsonResults;

namespace WebApplication6_landing.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Feedback(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string receiver = collection["receiver"];
                string message = collection["message"];

                System.Web.Mail.MailMessage mail = new System.Web.Mail.MailMessage();

                string SMTP_SERVER = "http://schemas.microsoft.com/cdo/configuration/smtpserver";
                string SMTP_SERVER_PORT = "http://schemas.microsoft.com/cdo/configuration/smtpserverport";
                string SEND_USING = "http://schemas.microsoft.com/cdo/configuration/sendusing";
                string SMTP_USE_SSL = "http://schemas.microsoft.com/cdo/configuration/smtpusessl";
                string SMTP_AUTHENTICATE = "http://schemas.microsoft.com/cdo/configuration/smtpauthenticate";
                string SEND_USERNAME = "http://schemas.microsoft.com/cdo/configuration/sendusername";
                string SEND_PASSWORD = "http://schemas.microsoft.com/cdo/configuration/sendpassword";

                mail.Fields[SMTP_SERVER] = ConfigurationManager.AppSettings["SMTP"];
                mail.Fields[SMTP_SERVER_PORT] = 465;
                mail.Fields[SEND_USING] = 2;
                mail.Fields[SMTP_USE_SSL] = true;
                mail.Fields[SMTP_AUTHENTICATE] = 1;
                mail.Fields[SEND_USERNAME] = ConfigurationManager.AppSettings["SMTP_login"];
                mail.Fields[SEND_PASSWORD] = ConfigurationManager.AppSettings["SMTP_password"];

                mail.From = ConfigurationManager.AppSettings["messageFrom"];
                mail.To = ConfigurationManager.AppSettings["messageTo"];
                mail.Subject = "Запрос";
                mail.BodyFormat = System.Web.Mail.MailFormat.Text;
                mail.Body = "Куда ответить: " + receiver + "\n";
                if (message != null)
                {
                    mail.Body += "Сообщение: " + message + "\n";
                }

                System.Web.Mail.SmtpMail.SmtpServer = ConfigurationManager.AppSettings["SMTP"] + ":465";
                System.Web.Mail.SmtpMail.Send(mail);

                jm.Result = true;
                jm.Message = "Спасибо, запрос отправлен. Ожидайте ответ.";
            }
            catch (Exception e)
            {
                jm.Result = true;
                jm.Message = "Во время отправки произошла ошибка - " + e.ToString();
            }


            return Json(jm);
        }

    }
}