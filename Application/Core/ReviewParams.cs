using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class ReviewParams : PagingParams
    {
        public string TargetRating { get; set; }
        public string Sorting { get; set; }
    }
}