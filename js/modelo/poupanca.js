class Poupanca extends Conta{

    constructor(numero, saldo = 0, dataAniversario) {
        super(numero, saldo);
        this.dataAniversario = dataAniversario;
    }

}