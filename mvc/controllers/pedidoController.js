const Carrito = require('../models/carrito');
const Pedido =require('../models/pedidos');
const enviarmail = require('../utils/mail')
const enviarwhatsapp = require('../utils/whatsapp')
const enviarsms = require('../utils/sms')
const loggerError = require('pino')('./logs/error.log')
const loggerWarn = require('pino')('./logs/warn.log')

exports.getPedidos = async (req, res, next) => {
  try{  
    pedidos = await Pedido.find({id_comprador: req.user._id}).lean() 
    console.log(pedidos)
    await res.json(pedidos) 
  }
  catch (e) { loggerError.error(e) } 
  }

  exports.getPendientes = async (req, res, next) => {
    try{
      
      pendientes = await Pedido.find({}).lean()
      loggerWarn.warn(pendientes)
      await res.json(pendientes) 
    }
    catch (e) {  loggerError.error(e) } 
    }

exports.createPedido = async (req, res, next) => {  
  try{
    let encontrados = await Carrito.find({id_comprador:req.user._id}).lean() 
    if(!(Object.entries(encontrados).length === 0))
    { 
      let total=0
      encontrados.forEach(element =>{
        total += element.cant_compra * element.precio
      });
          let json = {"id_comprador":encontrados[0].id_comprador,"id_vendedor":"no asignado","estado":false,"productos":encontrados,"datos_comprador":req.user,"importe":total}
          pedido = new Pedido(json)
          await pedido.save()
          await  Carrito.deleteMany({id_comprador:encontrados[0].id_comprador})
          await res.send("pedido en camino")  

    }else
    {
      await res.redirect("/")
    }
    
  }
catch (e) {  loggerError.error(e) }
}

