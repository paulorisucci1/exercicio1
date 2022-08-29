class ContaController {
    constructor() {
        this.repositorioContas = new RepositorioContas();
        this.tiposContas = {
            "Conta": (numero, saldo) => new Conta(numero, saldo),
            "ContaBonificada": (numero, saldo) => new ContaBonificada(numero, saldo),
            "Poupanca": (numero, saldo, dataValidade) => new Poupanca(numero, saldo, dataValidade)
        };
    }

    adicionarConta(conta) {
        this.repositorioContas.adicionar(conta);
    }

    listar() {
        this.repositorioContas.getContas().forEach(conta =>
            this.inserirContaNoHTML(conta)
        );
    }

    inserir(evento) {
        evento.preventDefault();

        let novaConta = this.criarConta();

        this.repositorioContas.adicionar(novaConta);
        this.inserirContaNoHTML(novaConta);
    }

    criarConta() {

        const numero = document.querySelector('#numero').value;
        const saldo = document.querySelector('#saldo').value;
        const dataAniversario = document.querySelector('#dataAniversario').value;
        const tipoConta = document.querySelector('#tipoConta').value;

        let novaConta;

        if(tipoConta === 'Conta') {
            novaConta = new Conta(numero, Number(saldo));
        } else if(tipoConta === 'ContaBonificada') {
            novaConta = new ContaBonificada(numero, Number(saldo))
        } else {
            novaConta = new Poupanca(numero, saldo, dataAniversario);
        }

        return novaConta;
    }

    inserirContaNoHTML(conta) {
        const elementoP = document.createElement('p');
        elementoP.textContent = 'Conta ' + conta.numero + ': ' + conta.saldo;
        const botaoApagar = document.createElement('button');
        botaoApagar.textContent = 'X';

        if(conta.dataAniversario !== undefined) {
            elementoP.textContent += ", data de aniversário: "+conta.dataAniversario;
        }

        botaoApagar.addEventListener('click', (event) => {
            this.repositorioContas.remover(conta.numero);
            event.target.parentElement.remove();
        });

        elementoP.appendChild(botaoApagar);
        document.body.appendChild(elementoP);
    }
}
