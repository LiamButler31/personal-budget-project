class Envelope {
    constructor (name, budget) {
        this.name = name
        this.budget = budget
        this.remaining = budget
    }

    static calculateAssignedBudget (arr) {
        let total = 0
        arr.forEach(element => {
            total += element.budget
        });
    }

    rename (newName) {
        this.name = newName
    }

    spend (amount) {
        this.remaining = this.remaining - amount
    }
}

const seedEnvelopes = () => {
    const bills = new Envelope('bills', 200)
    const groceries = new Envelope('groceries', 300)
    const transport = new Envelope('transport', 50)
    const diningOut = new Envelope('dining', 100)
    const pub = new Envelope('pub', 100)
    const shopping = new Envelope('shopping', 150)
    const irregular = new Envelope('irregular', 100)
    const savings = new Envelope('savings', 1000)

    return [bills, groceries, transport, diningOut, pub, shopping, irregular, savings]
}


const generateNewEnvelope = (name, budget) => {
    return new Envelope(name, budget)
}

const getEnvelopeIndex = (envName, arr) => {
    return arr.findIndex((elem) => elem.name == envName)
}

module.exports = { seedEnvelopes, generateNewEnvelope, getEnvelopeIndex }