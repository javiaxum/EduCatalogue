using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Domain
{
    public class Review
    {
        public Guid Id { get; set; }
        public Institution Institution { get; set; }
        public AppUser Author { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string ReviewMessage { get; set; }
        public int Rating { get; set; }
    }
}