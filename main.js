const tipoVeiculo = document.querySelectorAll(".tipoVeiculo")
const marcas = document.querySelector(".marcas")
const modelos = document.querySelector(".modelos")
const anos = document.querySelector(".anos")
const detalhes = document.querySelector(".detalhes")

let tipoDeVeiculo = ""
let marcaDoVeiculo = ""
let modeloDoVeiculo = ""
let anoVeiculo = ""

function escolheTipoDeVeiculo(tipoVeiculo) {
  const userData = fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas`)
    .then(response => response.json())
    .then(data => {
      marcas.innerHTML = ""
      data.forEach((marca) => {
        let marcaOption = new Option((text = marca.nome), (value = marca.codigo))

        marcas.append(marcaOption)
      })



    })



}

function escolheMarca(marca, tipoVeiculo) {
  const userData = fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca}/modelos`)
    .then(response => response.json())
    .then(data => {
      modelos.innerHTML = ""
      data.modelos.forEach((modelo) => {
        let modeloOption = new Option((text = modelo.nome), (value = modelo.codigo))
        modelos.append(modeloOption)


      })



    })
}

function escolheModelo(modelo, marca, tipoVeiculo) {
  const userData = fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca}/modelos/${modelo}/anos`)
    .then(response => response.json())
    .then(data => {
      anos.innerHTML = ""
      data.forEach((ano) => {
        let anoOption = new Option((text = ano.nome), (value = ano.codigo))
        anos.append(anoOption)

      })



    })
}

function escolheAno(ano, modelo, marca, tipoVeiculo) {
  console.log(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
  const userData = fetch(`https://parallelum.com.br/fipe/api/v1/${tipoVeiculo}/marcas/${marca}/modelos/${modelo}/anos/${ano}`)
    .then(response => response.json())
    .then(data => {
      detalhes.innerHTML = `<p>Valor: ${data.Valor}<br>
      Marca:${data.Marca}<br>
      Modelo:${data.Modelo}<br>
      Ano Modelo:${data.AnoModelo}<br>
      Combustivel:${data.Combustivel}<br>
      Codigo Fipe:${data.CodigoFipe}<br>
      Mês Referencia:${data.MesReferencia}<br>
      Tipo Veiculo:${data.TipoVeiculo}<br>
      Tipo Combustivel:${data.SiglaCombustivel}</p>`

      



    })
}




tipoVeiculo.forEach(opcao => {
  opcao.addEventListener("click", function () {


    escolheTipoDeVeiculo(this.value)
    tipoDeVeiculo = this.value

  })
})

marcas.addEventListener("change", () => {
  escolheMarca(marcas.options[marcas.selectedIndex].value, tipoDeVeiculo)
  marcaDoVeiculo = marcas.options[marcas.selectedIndex].value, tipoDeVeiculo
})

modelos.addEventListener("change", () => {
  escolheModelo(modelos.options[modelos.selectedIndex].value, marcaDoVeiculo, tipoDeVeiculo)
  modeloDoVeiculo = modelos.options[modelos.selectedIndex].value
})

anos.addEventListener("change", () => {
  anoVeiculo = anos.options[anos.selectedIndex].value
  escolheAno(anoVeiculo, modeloDoVeiculo, marcaDoVeiculo, tipoDeVeiculo)


})