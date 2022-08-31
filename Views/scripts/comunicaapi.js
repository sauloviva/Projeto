$(document).ready(function() {
    grid();
});

function limpar() {
    formulario.IdInput.value = '';
    formulario.nomeInput.value = '';
    formulario.materia.value = '';
    formulario.avaliacaoInput.value = '';
    formulario.ComentariosInput.value = '';
}

function grid() {
    $.get('https://localhost:5001/Aluno/Listar')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {                
                let linha = $('<tr class="text-center"></tr>');
                
                linha.append($('<td></td>').html(resposta[i].id));
                linha.append($('<td></td>').html(resposta[i].nome));
                linha.append($('<td></td>').html(resposta[i].materia));
                linha.append($('<td></td>').html(resposta[i].avalie));
                linha.append($('<td></td>').html(resposta[i].comente))
                
                let botaoExcluir = $('<button class="btn btn-danger"></button>').attr('type', 'button').html('Excluir').attr('onclick', 'excluir(' + resposta[i].id + ')');

                let acoes = $('<td></td>');
                acoes.append(botaoExcluir);

                linha.append(acoes);
                
                $('#grid').append(linha);
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert("Erro ao consultar a API!");
        });
}

function excluir(id) {
    console.log(id)
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Aluno/Excluir/',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function(resposta) { 
            alert("Aluno removido com sucesso!");
            location.reload(true);
        },
        error: function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a remoção!");
        }
    });
}

function cadastrar() {
    
    let aluno = {
        id:formulario.idInput.value,
        nome: formulario.nomeInput.value,
        materia: formulario.materiarecebe.value,
        avalie: formulario.avaliacaoInput.value,
        comente: formulario.comentariosInput.value
    };

    console.log(aluno);

    $.ajax({
        type: 'POST',
        url: 'https://localhost:5001/Aluno/Cadastrar',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(aluno),
        success: function() {
            alert("Aluno cadastrado com sucesso!");
            limpar();
            location.reload(true);
        },
        error: function() {
            alert("Erro ao realizar o cadastro!");
        }
    });

    function excluir(id) {
    console.log(id)
    $.ajax({
        type: 'DELETE',
        url: 'https://localhost:5001/Aluno/Excluir/',
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(id),
        success: function(resposta) { 
            alert("Aluno removido com sucesso!");
            location.reload(true);
        },
        error: function(erro, mensagem, excecao) { 
            alert("Erro ao realizar a remoção!");
        }
    });

    function visualizar (id) {
        console.log(id)
        $.ajax({
            type: 'GET',
            url: 'https://localhost:5001/Aluno/Visualizar/'+id,
            contentType: "application/json; charset=utf-8",
            success: function(resposta) { 
                alert("Aluno:" + resposta.nome);
                location.reload(true);
            },
            error: function(erro, mensagem, excecao) { 
                alert("Erro ao realizar a remoção!");
            }
        });
}
}}