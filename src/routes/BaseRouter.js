import { Router } from "express";
import { passportCall } from "../middlewares/passportCall.js";
import { executePolicies } from "../middlewares/policies.js";

export default class BaseRouter {

    constructor(){
        this.router = Router();
        this.init()
    }

    init(){}//Servirá para la inicialización de los hijos

    getRouter(){
        return this.router;
    }

    get(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.get(path,this.generateCustomResponses,passportCall('current'),executePolicies(policies), this.applyCallbacks(callbacks));
    }
    post(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.post(path,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }
    put(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.put(path,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }
    delete(path,policies,...callbacks){
        if(!policies||!Array.isArray(policies)) throw new Error('Policies required for endpoint '+path);
        this.router.delete(path,this.generateCustomResponses,passportCall('current'),executePolicies(policies),this.applyCallbacks(callbacks));
    }

    generateCustomResponses(req,res,next){
        res.sendSuccess = (message) => res.status(200).send({status:"success",message});
        res.sendBadRequest = (reason) => res.status(400).send({status:"success",error:reason});
        res.sendUnauthorized = (reason) => res.status(401).send({status:"error",error:reason||"Unauthorized"})
        res.sendFailed = (reason) => res.status(401).send({status:"error",error:reason||"Failed"})
        next();
    }

    applyCallbacks(callbacks){
        return callbacks.map((callback)=>async(...params)=>{
            //Esta función, dentro ya tiene los params req,res,next
            try{
                await callback.apply(this,params);
            }catch(error){
                console.log(error);
                params[1].status(500).send({status:"error",error:`${error.name} ${error.message}`});
            }
        })
    }
}