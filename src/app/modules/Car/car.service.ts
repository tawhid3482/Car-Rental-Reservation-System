import { TCar } from "./car.interface";
import { CarModel } from "./car.model";


const createCarIntoDB = async (payload:TCar)=>{
    const result = await CarModel.create(payload)
    return result
}
const getAllCarFromDB = async()=>{

}

export const carServices = {
    createCarIntoDB,
    getAllCarFromDB,
}