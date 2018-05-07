using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using go2sweden.Models;

namespace go2sweden.Controllers
{
    public class SearchController : Controller
    {
        public IActionResult Index()
        {
            SearchViewModel result = new SearchViewModel().Load();
            return View(result);
        }
        public IActionResult Sweden()
        {
            return View();
        }
    }
}