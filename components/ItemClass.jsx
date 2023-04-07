export class Item {
    constructor(id, variation={}){
        this.id = id
        this.variation = variation
        this.status = true
        this.timestamp = Date.now()
    }
}