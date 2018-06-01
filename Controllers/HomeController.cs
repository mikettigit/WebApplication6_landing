using System;
using System.Collections.Generic;
using System.Configuration;
using System.IO;
using System.Linq;
using System.Net.Mail;
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

        public ActionResult Season(string id)
        {
            ViewBag.Season = id;
            return View("~/Views/Home/Index.cshtml");
        }

        [AcceptVerbs(HttpVerbs.Post)]
        public ActionResult Feedback(FormCollection collection)
        {

            JsonMessage jm = new JsonMessage();

            try
            {
                string receiver = collection["receiver"];
                string message = collection["message"];
                string body = "";// "Куда ответить: " + receiver + "\n";
                string subject = "Запрос";
                if (message != null)
                {
                    body += "Сообщение: " + message + "<br/>";
                }
                string source = collection["source"];
                if (!String.IsNullOrWhiteSpace(source))
                {
                    body += "Сайт-образец: " + source + "<br/>";
                }
                string budget = collection["budget"];
                if (!String.IsNullOrWhiteSpace(budget))
                {
                    body += "Бюджет: " + budget + "<br/>";
                }
                string domain = collection["domain"];
                if (!String.IsNullOrWhiteSpace(domain))
                {
                    body += "Свой домен: " + domain + "<br/>";
                }

                if (Convert.ToBoolean(ConfigurationManager.AppSettings["UseAgavaMail"]))
                {
                    SmtpClient SMTPServer = new SmtpClient("localhost");

                    ////1
                    //MailMessage mailObj = new MailMessage();
                    //mailObj.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                    //mailObj.To.Add(ConfigurationManager.AppSettings["messageTo"]);
                    //mailObj.Subject = subject;
                    //mailObj.Body = body;
                    //SMTPServer.Send(mailObj);

                    //2
                    MailMessage mailObj2 = new MailMessage();
                    mailObj2.From = new MailAddress(ConfigurationManager.AppSettings["messageFrom"]);
                    mailObj2.To.Add(receiver);
                    mailObj2.Bcc.Add(ConfigurationManager.AppSettings["messageTo"]);
                    mailObj2.Subject = "Ваше сообщение, отправленное с сайта ReadyMade зарегистрировано";

                    string filename = Server.MapPath("/Content/Templates/mail.htm");
                    if (System.IO.File.Exists(filename))
                    {
                        using (StreamReader sr = new StreamReader(filename))
                        {
                            mailObj2.Body = sr.ReadToEnd();
                            mailObj2.Body = mailObj2.Body.Replace("[%текст%]", body);
                        };
                        mailObj2.IsBodyHtml = true;
                        SMTPServer.Send(mailObj2);
                    }
                }
                else
                {
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
                    mail.Subject = subject;
                    mail.BodyFormat = System.Web.Mail.MailFormat.Text;
                    mail.Body = body;

                    System.Web.Mail.SmtpMail.SmtpServer = ConfigurationManager.AppSettings["SMTP"] + ":465";
                    System.Web.Mail.SmtpMail.Send(mail);
                }

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