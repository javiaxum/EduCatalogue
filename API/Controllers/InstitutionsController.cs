using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Domain;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace API.Controllers
{
    public class InstitutionsController : BaseAPIController
    {
        private readonly DataContext _context;
        public InstitutionsController(DataContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<List<HigherEducationalInstitution>>> GetInstitutions()
        {
            return await _context.Institutions.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<HigherEducationalInstitution>> GetInstitution(Guid id)
        {
            return await _context.Institutions.FindAsync(id);
        }
    }
}