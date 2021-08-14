﻿using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {

        [HttpGet]
        public string GetProducts() 
        {
            return "products";
        }

        [HttpGet("{id}")]
        public string GetProduct()
        {
            return "One product";
        }
    }
}