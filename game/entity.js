class Entity {
    constructor() {
        this.id = this.uuidv4();
        this.update_mix_ins = [];
    }

    uuidv4() {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      )
    }

    update() {
        for (let i = 0; i < this.update_mix_ins.length; i++) {
            this.update_mix_ins[i](this);
        }
    }
}

