class Envelope {
    constructor (name, budget) {
        this.id = Envelope.nextId
        this.name = name
        this.budget = budget
        this.remaining = budget

        Envelope.incrementId()
    }

    static nextId = 1
    static incrementId () {
        this.nextId += 1
    }

    static calculateAssignedBudget (arr) {
        let total = 0
        arr.forEach(element => {
            total += element.budget
        });
    }

    rename (newName) {
        this.name = newName
        return this
    }

    spend (amount) {
        this.remaining = this.remaining - Number(amount)
        return this
    }

    adjustBudget (newBudget) {
        this.budget = newBudget
        return this
    }

    adjustRemaining (newRemaining) {
        this.remaining = newRemaining
        return this
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

//Get index in envelope array that matches either a name or id search.
const getEnvelopeIndex = (key, arr, retEnv = false) => {
    let envIdType
    if (Number(key)) {
        envIdType = 'id'
    } else {
        envIdType = 'name'
    }

    if (retEnv) {
        return arr.find((elem) => elem[envIdType] == key)
    }

    return arr.findIndex((elem) => elem[envIdType] == key)
}

module.exports = { seedEnvelopes, generateNewEnvelope, getEnvelopeIndex }