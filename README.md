docker image:
# docker pull ezequieldiasar/xeneizeapp:latest

test de swagger a todas las rutas de user correctamente y schemas configurados correctamente

test unitario construido con un js con axios previo a la clase testing, como cumple la misma funcion que lo visto en clase pero mas simple, opte por dejar el js con axios, me gustaria que tambien lo tomen como valido asi no tengo que reconfigurar el codigo.

este js de axios se encarga:

# testing de los endpoints, si alguno falla lo descuenta de los testing pasados, por ej ENDPOINTS FUNCIONANDO 13/15 o 15/15 si funcionan todos

# hace un post a register para comprobar si funciona el registro en mongo
# hace un post a login para comprobar si logea

nota: logger es desactivado durante el testeo para no duplicar el nivel INFO sobre los gets, luego del testeo completado este vuelve a activarse, fue configurado en app.js

nota 2: si bien es una version simplificada y previo a la clase testing unitario, tengo bien presente que esto se esta ejecutando en todas sus fases incluyendo el dev, start. quiza ahi esta la principal diferencia con chai y supertest, pero es para practicas, en un entorno real no voy a usar un js en /public, para testear los endpoints simulando ser un cliente.

por ultimo si bien informe sobre porque no esta incluido adoption router, no lo inclui porque yo interpreto que ese router y entrega es para personas que quiza no hicieron un proyecto propio y se estuvieron manejando con mascotas, en mi caso desde el inicio del back-end 1 cree un proyecto diferente a pets dado que solo era de apoyo en su momento y lo que enseñaba con pets lo implementaba a mi proyecto semi ecommerce, por lo cual no vi necesario implementar ese router en mi proyecto, porque tampoco encajaria.

entiendo que quiza las vistas son basicas con handlebars, pero no tuve tiempo de unirlo a mi proyecto anterior de react en el cual si tengo un ecommerce con carrito, pero preferiria hacer eso con tiempo y tranquilo mientras continuo capacitandome en nestjs y angular, dado que no me convence mucho react.# backfinal
# backfinal
# backfinal
# backfinal
# backfinal
