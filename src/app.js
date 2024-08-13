import express from "express"
import cookieParser from "cookie-parser"
import session from "express-session"
import FileStore from "session-file-store";
import MongoStore from "connect-mongo";

const app = express()
const PORT = 8080;
const fileStore = FileStore(session);

app.use(express.json())
app.use(cookieParser())
app.use(session({
    //Crear session con MemoryStorage
    secret: "secretCoder",
    resave: true, //mantener sesion activa con inactividad del user
    saveUninitialized: true, //Permite guardar una session aun uando el objeto no tenga nada 

    //Crear session con File Storage

    // store: new fileStore({ path: "./src/sessions ", ttl: 100, retries: 1 })

    //path: la ruta donde se van a guardar los archivitos de sesion. 
    //ttl: Time To Live (en segundos va)
    //retries: cantidad de veces que el servidor tratara de leer el archivo. 

    //Crear session con mongodb
    store: MongoStore.create({
        mongoUrl: "mongodb+srv://valentinoburioni:vburioni1234@apivb.vym0xct.mongodb.net/eccomerce"
    })
}))


//Crear cookie
app.get("/crearcookie", (req, res) => {
    res.cookie("COQUEE", "Esto es una cookie de COQUEE MONTANA").send("Cookie creada :)")
})

//Eliminar Cookie
app.get("/borracookie", (req, res) => {
    res.clearCookie("COQUEE").send("Cookie creada :)")
})


app.get("/login", (req, res) => {
    let usuario = req.query.usuario;
    req.session.usuario = usuario
    res.send("Guardamos el usuario por medio de query :D")
})

app.get("/usuario", (req, res) => {
    if (req.session.usuario) {
        return res.send(`El usuario registrado es: ${req.session.usuario}`)
    } else {
        res.send("No hay usuarios registrados")
    }
})


app.listen(PORT)