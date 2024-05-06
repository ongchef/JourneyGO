'use server';

export async function getSurrounding(Token, query, spotId) {
  // spotId = String(spotId);
  const url = `${process.env.BASE_URL}/api/spots/search/surroundings/${query}/${spotId}`;
  const bearer_token = `Bearer ${Token}`;

  try {
    console.log("getSurrounding", query, spotId);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
    });
    if(res.ok) {
      const data = await res.json();
      const formattedData = data?.map((spot) => {
          const photoRef = spot?.photos?.[0]?.photo_reference;
          let photoUrl = "";
          if (photoRef) {
            photoUrl = `${process.env.GOOGLE_MAP_PLACE_URL}/photo?photo_reference=${photoRef}&maxwidth=100&key=${process.env.GOOGLE_MAP_API_KEY}`;
          }
          return {
            title: spot?.name,
            location: spot?.formatted_address,
            rating: spot?.rating,
            lng: spot?.geometry?.location?.lng,
            lat: spot?.geometry?.location?.lat,
            photo: photoUrl,
          };
        }
      );
      const status = res.status;
      console.log("getSurrounding", status);
      return formattedData;
    } else {
      console.log("getSurrounding", res.status, res.statusText);
      return undefined;
    }
  } catch (error) {
    console.error('Error:', error);
    return undefined;
  }
}

/*
[
    {
        "business_status": "OPERATIONAL",
        "formatted_address": "106台灣台北市大安區大安路二段47號",
        "geometry": {
            "location": {
                "lat": 25.0315104,
                "lng": 121.5461276
            },
            "viewport": {
                "northeast": {
                    "lat": 25.03285937989272,
                    "lng": 121.5474518298927
                },
                "southwest": {
                    "lat": 25.03015972010728,
                    "lng": 121.5447521701073
                }
            }
        },
        "icon": "https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png",
        "icon_background_color": "#FF9E67",
        "icon_mask_base_uri": "https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet",
        "name": "Pizza Hut必勝客-大安外送店",
        "opening_hours": {
            "open_now": true
        },
        "photos": [
            {
                "height": 3000,
                "html_attributions": [
                    "<a href=\"https://maps.google.com/maps/contrib/109602780502132286527\">Tommy Chang</a>"
                ],
                "photo_reference": "ATplDJbln6ObEbMJOt_PxXCZFwjyjf3lDkU1HSFP1bhVuBJxtxlQnlVRdsHa0Afb0OwriahALw-rckHG53fnkbqzkiECRN5jxgPcjLDUV4j11-487WihFfTmPbp-M8zXZ4rsrmqrgnuOq1Z1tpOheqyYskhxGB4QqJPVvQabpct4kTiR1A-k",
                "width": 4000
            }
        ],
        "place_id": "ChIJlaF1pDGqQjQRUMslrduoCss",
        "plus_code": {
            "compound_code": "2GJW+JF 住安里 台北市大安區",
            "global_code": "7QQ32GJW+JF"
        },
        "price_level": 2,
        "rating": 4.4,
        "reference": "ChIJlaF1pDGqQjQRUMslrduoCss",
        "types": [
            "meal_takeaway",
            "meal_delivery",
            "restaurant",
            "food",
            "point_of_interest",
            "establishment"
        ],
        "user_ratings_total": 953
    },
]
*/