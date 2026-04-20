import data from '../config/database.js'

class clienteService {
    async buscar() {
        return data
    }

    async buscarId(id) {
        const cliente = data.find(el => el.id == id)
        return cliente
    }

    async insert(nome, profissao) {
        const id = data.length === 0 ? 1 : (data.at(-1).id) + 1
        const cliente = { id, nome, profissao }
        data.push(cliente)

        return cliente
    }

    async update(id, nome, profissao) {
        const cliente = data.find(el => el.id == id)
        if (!cliente) {
            return
        }

        if (nome !== undefined) {
            cliente.nome = nome.trim()
        }

        if (profissao !== undefined) {
            cliente.profissao = profissao.trim()
        }

        return cliente
    }

    async delete(id) {
        const indx = data.findIndex(el => el.id == id)
        if (indx == -1) return

        const cliRemove = data.splice(indx, 1)
        return cliRemove
    }
}

export default new clienteService()