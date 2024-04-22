import {Client} from "@googlemaps/google-maps-services-js";
import dotenv from 'dotenv'

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
        console.log(response.data.results)
        const place_list = response.data.results.map(async (place)=>{
            if (place.photos[0]){
                console.log(place.photos[0].photo_reference)
                const photo = await getPhoto(place.photos[0].photo_reference)
                console.log(photo)
                place.photos = photo
                return place
            }
            else{
                place.photos = undefined
                return place
            }
        })
        return Promise.all(place_list)
    })
    // return await client.findPlaceFromText(args).then((response)=>{
    //     console.log(response.data.candidates)
    //     return response.data.candidates
    //     // 回傳樣式自己定義
    // })
}