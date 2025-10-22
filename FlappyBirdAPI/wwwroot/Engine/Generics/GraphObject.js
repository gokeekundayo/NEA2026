export default class GraphObject {
    constructor({ x, y, background, width, height,target,sizeX = 8,sizeY = 8,max }) {
        this.elements = []
        Object.assign(this, { x, y, background, width, height,target,sizeX,sizeY,max})
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
        //Text
        let scaleFactor = this.max/this.height
        for(let y=0;y<=this.max;y+=this.max/this.factorY*this.sizeY){
            context.fillText(this.max-y,this.x-50,this.y+y)
            context.beginPath()
            context.moveTo(this.x+10,this.y+y)
            context.lineTo(this.x-10,this.y+y)
            context.stroke()
            context.beginPath()
        }
    }
    init(){

    }
    addBar(Bar){
        this.elements.push(Bar)
    }
}