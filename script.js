function converter() {
  var valor = document.getElementById("valor").value;

  if (!valor) {
    alert("Digite um valor válido.");
    return;
  }

  var mDestino = document.getElementById("mDestino").value;

  var mOrigem = "BRL"; //fixo em Reais
  var apiKey = "37a6ba3c5c02393a252c428b"; //senha da API

  //API para obter as taxas de câmbio
  var url = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/${mOrigem}`;

  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.result === "error") {
        console.error("Ocorreu um erro ao obter as taxas de câmbio:", data["error-type"]);
        return;
      }

      var tConversao = data.conversion_rates[mDestino];
      var resultado = (valor * tConversao).toFixed(2);

      // Exibe o resultado da conversão
      document.getElementById("vConvertido").textContent = resultado + " " + mDestino;
    })
    .catch(error => {
      console.error("Ocorreu um erro ao obter as taxas de câmbio:", error);
    });

    //mostra na tela a data e a hora da conversão em tempo real
    
    function exibirDataHora() {
      var dataHoraElement = document.getElementById("dataHora");
      var dataHora = new Date();
      var data = dataHora.toLocaleDateString();
      var hora = dataHora.toLocaleTimeString();
    
      dataHoraElement.textContent = "Data e Hora: " + data + " - " + hora;
    }
    
    exibirDataHora();
    setInterval(exibirDataHora, 1000);
}
