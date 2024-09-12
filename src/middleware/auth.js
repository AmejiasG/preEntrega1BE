//Verificación del rol admin


export function soloAdmin(req, res, next) {
    if(req.user.role === "admin") {
        next(); 
    } else {
        res.status(403).send("No eres admin"); 
        
    }
}


export function soloUser(req, res, next) {
    if(req.user.role === "user") {
        next(); 

    } else {
        res.status(403).send("No eres usuario"); 

    }
}