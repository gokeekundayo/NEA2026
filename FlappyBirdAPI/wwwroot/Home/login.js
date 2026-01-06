import { getID } from "../Engine/Tools/Tools.js";
getID("usernameInput").addEventListener("input",()=>{
    console.log("dd");
    
    if(getID("usernameInput").value.length>=5){
        getID("loginButton").setAttribute("valid",true)
        
    }
    else{
        getID("loginButton").setAttribute("valid",false)

    }
})
