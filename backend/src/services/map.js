import {Client} from "@googlemaps/google-maps-services-js";
import dotenv from 'dotenv'
import { getTripGroupDays } from "../models/tripgroupModel.js";
import { getOneDayLonLat } from "../models/spotModel.js";

dotenv.config()

// 沒有指定地點，只有關鍵字，使用前一個 spot 的位置
const getPhoto = async(reference) => {
    const client = new Client({})
    const args = {
        params: {
            key: process.env.MAP_API_KEY,
            photoreference: reference,
            maxwidth: 400
        }
    }
    return await client.placePhoto(args).then((response)=>{
        console.log(response.data)
        return response.data
    })
    .catch((error)=>console.log(error))
}
export const findNearby = async(query, lon, lat) => {
    const client = new Client({});
    const args = {
        params: {
            key: process.env.MAP_API_KEY,
            query: query,
            location: { lat:lat, lng:lon },
            radius: 1000,
            language: "zh-TW"
        }
    };
    return await client.textSearch(args).then((response)=>{
        // map 所有 response 的圖片長怎樣
        return response.data.results
        // const place_list = response.data.results.map(async (place)=>{
        //     if (place.photos[0]){
        //         console.log(place.photos[0].photo_reference)
        //         const photo = await getPhoto(place.photos[0].photo_reference)
        //         console.log(photo)
        //         place.photos = photo
        //         return place
        //     }
        //     else{
        //         place.photos = undefined
        //         return place
        //     }
        // })
        // return Promise.all(place_list)

      // 回傳的樣式
      // [{
      //    business_status: 'OPERATIONAL',
      //    formatted_address: '106台灣台北市大安區瑞安街141號',
      //    geometry: { location: [Object], viewport: [Object] },
      //    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
      //    icon_background_color: '#FF9E67',
      //    icon_mask_base_uri: 'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
      //    name: 'ANTICO FORNO 老烤箱義式披薩餐酒',
      //    opening_hours: { open_now: false },
      //    photos: [ [Object] ],
      //    place_id: 'ChIJUcEGgSmqQjQRYCaPCUjkuHo',
      //    plus_code: { compound_code: '2GGQ+MV 龍生里 台北市大安區', global_code: '7QQ32GGQ+MV' },
      //    price_level: 2,
      //    rating: 4.4,
      //    reference: 'ChIJUcEGgSmqQjQRYCaPCUjkuHo',
      //    types: [ 'restaurant', 'point_of_interest', 'food', 'establishment' ],
      //    user_ratings_total: 1919
      //  },...]
    }).catch((err)=>{
        console.log(err)
    })
}

export const findPlace = async(query) => {
    const client = new Client({});
    const args = {
        params: {
            key: process.env.MAP_API_KEY,
            query: query,
            language: "zh-TW"
        }
    };
    return await client.textSearch(args).then((response)=>{
        return response.data.results
        // const place_list = response.data.results.map(async (place)=>{
        //     if (place.photos[0]){
        //         console.log(place.photos[0].photo_reference)
        //         const photo = await getPhoto(place.photos[0].photo_reference)
        //         console.log('photo',photo)
        //         place.photos = photo
        //         return place
        //     }
        //     else{
        //         place.photos = undefined
        //         return place
        //     }
        // })
        // return Promise.all(place_list)
    })
    // return await client.findPlaceFromText(args).then((response)=>{
    //     console.log(response.data.candidates)
    //     return response.data.candidates
    //     // 回傳樣式自己定義
    // })
}

export const getRoute = async(groupId,day,transType) => {
    const spots = await getOneDayLonLat(groupId,day)
    console.log(spots)
    const client = new Client({})
    const lonLatStr = spots.map((spot)=>{
        return spot.lat+","+spot.lon
    })
    const spotIdList = spots.map((spot)=>spot.spot_id)
    if(lonLatStr.length>1){
        const args = {
            params: {
                key: process.env.MAP_API_KEY,
                // origin: 'Disneyland',
                // destination: 'Universal',
                origin: lonLatStr[0],
                destination: lonLatStr.slice(-1)[0],
                waypoints: lonLatStr.slice(1,-1),
                mode:transType,
                language: "zh-TW"
            }
        };
        // Route API
        console.log(args)
        return await client.directions(args).then((response)=>{
            console.log(response.data)
            if(response.data.routes.length === 0){
                return response.data
            }
            else{
                const routes = response.data.routes[0].legs.map((route,index)=>{
                    if(Object.keys(route).length === 0){
                        return {
                            distance: 0,
                            duration: 0,
                            travel_mode: '',
                            dep_id: spotIdList[index],
                            arr_id: spotIdList[index+1]
                        }
                    }
                    else{
                        return {
                            distance: route.distance.text,
                            duration: route.duration.text,
                            travel_mode: transType,
                            dep_id: spotIdList[index],
                            arr_id: spotIdList[index+1]
                        }
                    }
                    
                })
                return {routes: routes,
                    spotIdList: spotIdList}
            }
            
        }).catch((err)=>console.log(err))
    }
    else{
        return undefined
    }
    
}