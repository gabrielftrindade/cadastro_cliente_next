import Layout from "../components/Layout"
import Tabela from "../components/Tabela"
import Cliente from "../core/Cliente"
import Botao from "../components/Botao"
import Formulario from "../components/Fomulario"
import { useEffect, useState } from "react"

export default function Home() {
  const dados = [
    new Cliente('Ana', 34, '1'),
    new Cliente('Bia', 25, '2'),
    new Cliente('Carlos', 41, '3'),
    new Cliente('Pedro', 46, '4'),
  ]
  const [cliente, setCliente] = useState<Cliente>(Cliente.vazio())
  let [clientes, setClientes] = useState(dados)
  const [visivel, setVisivel] = useState<'tabela' | 'form'>('tabela')

  function clienteSelecionado(cliente: Cliente) {
    setCliente(cliente)
    setVisivel('form')
  }

  function clienteExcluido(cliente: Cliente) {
    let filterCliente = clientes.filter(x => x.id !== cliente.id)
    clientes = filterCliente
    setClientes(clientes)
  }
  
  function salvarCliente(cliente: Cliente) {
    let cl = clientes.length > 0 ? +clientes[clientes.length - 1].id + 1 : 0
    clientes.push(new Cliente(cliente.nome, cliente.idade, cl.toString()))
    setClientes(clientes)
    setVisivel('tabela')
  }

  function editarCliente(cliente: Cliente) {
    let index = clientes.findIndex((obj => obj.id == cliente.id))
    clientes[index] = cliente
    setVisivel('tabela')
  }

  function novoCliente() {
    setCliente(Cliente.vazio())
    setVisivel('form')
  }

  return (
    <div className={`
      flex justify-center items-center h-screen
      bg-gradient-to-r from-blue-500 to-purple-500
      text-white
    `}>
      <Layout titulo="Cadastro Simples">
        {visivel === 'tabela' ? (
            <>
              <div className="flex justify-end">
                <Botao 
                  cor="green" 
                  className="mb-4"
                  onClick={novoCliente}
                >
                  Novo Cliente
                </Botao>
              </div>
              <Tabela clientes={clientes} 
                clienteSelecionado={clienteSelecionado}
                clienteExcluido={clienteExcluido}
              />
            </>
          ) : (
            <Formulario cliente={cliente}
              clienteMudou={cliente.id ? editarCliente : salvarCliente}
              cancelado={() => setVisivel('tabela')}
            />
          )
        }
      </Layout>
    </div>
  )
}
