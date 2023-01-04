using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class PagingParams
    {
        private const int maxPageSize = 50;
        public int pageNumber { get; set; } = 1;
        private int pageSize = 1;
        public int PageSize
        {
            get => pageSize;
            set => pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
    }

}