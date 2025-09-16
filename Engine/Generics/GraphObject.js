export default class GraphObject {
    constructor({ x, y, background, width, height,target,sizeX = 8,sizeY = 8 }) {
        this.elements = []
        Object.assign(this, { x, y, background, width, height,target,sizeX,sizeY})
        this.factorX = this.width/this.sizeX
        this.factorY = this.width/this.sizeY
        //Start Drawing on Instantiation
      this.target.Graphs.push(this)
    }

    draw(context){
        context.strokeStyle = "black" //Set Black border color for graph
        context.strokeRect(this.x,this.y,this.width,this.height) //Draw Borders
        
        for(let element of this.elements){
            element.draw(context)
        }
    }
    addBar(Bar){
        this.elements.push(Bar)
    }
}