import {
    getAllCountry,
    getCountryById
} from "../models/countryModel.js";

export const getCountries = async(req, res) => {
    const data = await getAllCountry()
    res.status(200).json(data)
}

export const getById = async(req, res) => {
    console.log("23",req.params)
    const { countryId } = req.params;
    console.log(countryId)
    try{
        const data = await getCountryById(countryId)
        if(data.length === 0){
            return res.status(404).json({message: "Cannot found countries by given groupId."})
        }

        return res.status(200).json(data)
    } catch (error) {
        return res.status(500).json({ message:error.message })
    }
}