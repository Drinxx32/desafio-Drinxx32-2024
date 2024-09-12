class RecintosZoo {
    constructor() {
        this.recintos = [
            { numero: 1, bioma: 'savana', tamanho: 10, animais: [{ especie: 'MACACO', quantidade: 3, tamanho: 1 }] },
            { numero: 2, bioma: 'floresta', tamanho: 5, animais: [] },
            { numero: 3, bioma: 'savana e rio', tamanho: 7, animais: [{ especie: 'GAZELA', quantidade: 1, tamanho: 2 }] },
            { numero: 4, bioma: 'rio', tamanho: 8, animais: [] },
            { numero: 5, bioma: 'savana', tamanho: 9, animais: [{ especie: 'LEAO', quantidade: 1, tamanho: 3 }] }
        ];

        this.animaisValidos = {
            'LEAO': { tamanho: 3, bioma: ['savana'], carnivoro: true },
            'LEOPARDO': { tamanho: 2, bioma: ['savana'], carnivoro: true },
            'CROCODILO': { tamanho: 3, bioma: ['rio'], carnivoro: true },
            'MACACO': { tamanho: 1, bioma: ['savana', 'floresta'], carnivoro: false },
            'GAZELA': { tamanho: 2, bioma: ['savana'], carnivoro: false },
            'HIPOPOTAMO': { tamanho: 4, bioma: ['savana', 'rio'], carnivoro: false }
        };
    }

    // Função de erro
    analisaRecintos(animal, quantidade) {
        // Verifica se o animal é válido
        if (!this.animaisValidos[animal]) {
            return { erro: "Animal inválido" };
        }

        // Verifica se a quantidade é válida
        if (!Number.isInteger(quantidade) || quantidade <= 0) {
            return { erro: "Quantidade inválida" };
        }

        const especie = this.animaisValidos[animal];
        const espaco = especie.tamanho * quantidade;
        let recintosViaveis = [];

        for (let recinto of this.recintos) {
            let espacoOcupado = this.calcularEspacoOcupado(recinto);
            let espacoLivre = recinto.tamanho - espacoOcupado;
            let temOutroAnimal = recinto.animais.length > 0

            // Verificação de bioma compatível
            if (!especie.bioma.includes(recinto.bioma)) {
                continue;
            }

             // Regra dos carnívoros
        if (this.isCarnivoro(animal) && recinto.animais.length > 0 && !recinto.animais.some(a => a.especie === animal)) {
            continue;
        }

        // Regra dos hipopótamos
        if (animal === 'HIPOPOTAMO' && recinto.bioma !== 'savana e rio' && recinto.animais.length > 0) {
            continue;
        }
        
        // Regra dos macacos
        if (animal === 'MACACO' && !temOutroAnimal) {
            continue;
        }

        // Espaço adicional 

        let espacoAdicional = temOutroAnimal ? 1 : 0;
        
        // Verificar se o espaço livre no recinto é suficiente
        
        if (espacoLivre >= espaco + espacoAdicional) {
            recintosViaveis.push({
                numero: recinto.numero,
                descricao: `Recinto ${recinto.numero} (espaço livre: ${espacoLivre - espaco - espacoAdicional} total: ${recinto.tamanho})`
            });
        }
    }

    // Ordena os recintos pela ordem numérica
    
    recintosViaveis.sort((a, b) => a.numero - b.numero);

    if (recintosViaveis.length > 0) {
        return { recintosViaveis: recintosViaveis.map(r => r.descricao) };
    } else {
        return { erro: "Não há recinto viável" };
    }
}
    // Calcular o espaço ocupado no recinto
    
    calcularEspacoOcupado(recinto) {
        let espacoOcupado = 0;
        for (let animal of recinto.animais) {
            let especie = this.animaisValidos[animal.especie];
            espacoOcupado += especie ? especie.tamanho * animal.quantidade : 0;
        }
        return espacoOcupado;
    }

    // Verificar se o animal é carnívoro
    
    isCarnivoro(animal) {
        return this.animaisValidos[animal]?.carnivoro || false;
    }
}
export { RecintosZoo as RecintosZoo };

