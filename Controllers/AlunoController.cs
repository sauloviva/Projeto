using Microsoft.AspNetCore.Mvc;
using Projeto.Models;

namespace Projeto.Controllers
{
    [Route("[controller]/[action]")]
    [ApiController]
    public class AlunoController : ControllerBase
    {
        private BDContexto contexto;
        
        public AlunoController(BDContexto bdContexto)
        {
            contexto = bdContexto;
        }
        
        [HttpGet]
        public List<Aluno> Listar()
        {
            return contexto.Alunos.ToList();
        }

        [HttpPost]
        public string Cadastrar ([FromBody] Aluno novoAluno)
        {
            contexto.Add(novoAluno);
            contexto.SaveChanges();
            return "Aluno cadastrado com sucesso!";
        }

        [HttpDelete]
        public string Excluir ([FromBody] int id)
        {
            Aluno dados = contexto.Alunos.FirstOrDefault (p => p.Id ==id);

            if (dados == null)
            {
                return "Não foi encontrado Aluno para o Id Informado!";
            }
            else
            {
                contexto.Remove(dados);
                contexto.SaveChanges();

                return "Aluno removido com sucesso!";
            }
        
        }

        [HttpGet]
        public Aluno Visualizar(int id)
        {
            return contexto.Alunos.Select(p => new Aluno
            {
                Id = p.Id,
                Nome = p.Nome,
                Materia = p.Materia,
                Avalie = p.Avalie,
                Comente = p.Comente,
            }).FirstOrDefault(p => p.Id == id);
        }   
    
    }
   
}