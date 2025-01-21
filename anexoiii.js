document.addEventListener("DOMContentLoaded", () => {
    const camposFaturamento = document.getElementById("campos-faturamento");
    const calcularBtn = document.getElementById("calcular");
    const faixaDisplay = document.getElementById("faixa");
    const aliquotaDisplay = document.getElementById("aliquota");
    const faturamentoTotalDisplay = document.getElementById("faturamentoTotal");
    const impostoDisplay = document.getElementById("imposto");

    // Gerar 12 campos de faturamento
    for (let i = 1; i <= 12; i++) {
        const label = document.createElement("label");
        label.textContent = `Faturamento mês ${i}:`;
        const input = document.createElement("input");
        input.type = "number";
        input.id = `mes${i}`;
        input.placeholder = "Digite o faturamento";
        camposFaturamento.appendChild(label);
        camposFaturamento.appendChild(input);
    }

    // Função para calcular imposto
    calcularBtn.addEventListener("click", () => {
        let faturamentoTotal = 0;

        // Somar os valores dos 12 meses
        for (let i = 1; i <= 12; i++) {
            const mes = document.getElementById(`mes${i}`);
            faturamentoTotal += Number(mes.value) || 0; // Evitar NaN
        }

        // Determinar a faixa e calcular o imposto
        let faixa, aliquota, deducao, imposto;
        if (faturamentoTotal <= 180000) {
            faixa = "1ª Faixa";
            aliquota = 6.0;
            deducao = 0;
        } else if (faturamentoTotal <= 360000) {
            faixa = "2ª Faixa";
            aliquota = 11.2;
            deducao = 9360;
        } else if (faturamentoTotal <= 720000) {
            faixa = "3ª Faixa";
            aliquota = 13.5;
            deducao = 17640;
        } else if (faturamentoTotal <= 1800000) {
            faixa = "4ª Faixa";
            aliquota = 16.0;
            deducao = 35640;
        } else if (faturamentoTotal <= 3600000) {
            faixa = "5ª Faixa";
            aliquota = 21.0;
            deducao = 125640;
        } else if (faturamentoTotal <= 4800000) {
            faixa = "6ª Faixa";
            aliquota = 33.0;
            deducao = 648000;
        } else {
            faixa = "Fora do Simples Nacional";
            aliquota = 0;
            deducao = 0;
        }

        imposto = (faturamentoTotal * (aliquota / 100)) - deducao;

        // Atualizar os resultados
        faixaDisplay.textContent = `Faixa: ${faixa}`;
        aliquotaDisplay.textContent = `Alíquota Efetiva: ${(aliquota).toFixed(2)}%`;
        faturamentoTotalDisplay.textContent = `Faturamento Total: R$ ${faturamentoTotal.toFixed(2)}`;
        impostoDisplay.textContent = `Imposto Devido: R$ ${imposto > 0 ? imposto.toFixed(2) : 0}`;
    });
});