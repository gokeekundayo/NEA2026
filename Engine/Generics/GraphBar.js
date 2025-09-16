export default class GraphBar {
    constructor({start, cWidth, cHeight, parent, name,color}) {

        Object.assign(this, { start, cWidth, cHeight, parent,name,color })
        this.parent.elements.push(this)
        this.init()
        this.keyAttach;
        this.scaleKeyAttach;
        this.text;
    }

    draw(context) {
        if(this.keyAttach){
            this.cHeight = this.target[keyAttach]
            if(this.scaleKeyAttach){
            this.cHeight = this.target[keyAttach]/this.parent.height
  
            }
          }
          //
        context.save() 
        context.fillStyle = this.color??"green"
        context.strokeStyle = "black"
        //Drawing rectangle
        context.lineWidth = 2;
        context.strokeRect(this.x, this.y, this.cWidth * this.parent.factorX, this.cHeight*this.parent.factorY )
        context.stroke()
        context.fillRect(this.x, this.y, this.cWidth * this.parent.factorX, this.cHeight*this.parent.factorY )
        context.restore() //Reset Canvas settings

        //Drawing Text
        if(this.text){
            context.fillText(this.text,this.x,this.y)
        }
    }

    setValue(value){
        this.cHeight = value
        this.init()
    }

    init(){
        this.offsetX = (this.start * this.parent.factorX) //Multiply start by parent factor
        this.offsetY = this.parent.height - (this.cHeight*this.parent.factorY) //Ensure Drawing starts from top, not bottom

        this.x = this.parent.x + this.offsetX
        this.y = this.parent.y + this.offsetY
    }

    attachToKey(key,scale = false){
        this.keyAttach = key
        this.scaleKeyAttach = scale
    }
    setText(text){
        this.text = text
    }
}