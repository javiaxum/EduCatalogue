using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Application.Core
{
    public class ImageParams : PagingParams
    {
        public bool isBackgroundImage { get; set; } 
        public bool isTitleImage { get; set; } 
        public bool isEmblemImage { get; set; } 
    }
}