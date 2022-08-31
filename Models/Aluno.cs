using System;
using System.Collections.Generic;

namespace Projeto.Models
{
    public partial class Aluno
    {
        public int Id { get; set; }
        public string? Nome { get; set; }
        public string? Materia { get; set; }
        public int Avalie { get; set; }
        public string? Comente { get; set; }
    }
}
