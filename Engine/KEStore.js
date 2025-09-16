import EnergyStore from "./EnergyStore.js";
export default class KEStore extends EnergyStore{
    constructor(){
        super();
    }

    calculate(obj = this.target){
           const  KEx = (1/2)* obj.mass * (obj.velocity.x^2)
          const   KEy = (1/2)* obj.mass * (obj.velocity.y^2)
            return KEx+KEy
    }

    update(deltaTime){
        this.energy = this.calculate()
    }
}