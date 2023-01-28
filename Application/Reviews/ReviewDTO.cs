using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Application.Profiles;
using Domain;

namespace Application.Reviews
{
    public class ReviewDTO
    {
        public Guid Id { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string ReviewMessage { get; set; }
        public int Rating { get; set; }
        public Guid InstitutionId { get; set; }
        public ProfileDTO Author { get; set; }
    }
}