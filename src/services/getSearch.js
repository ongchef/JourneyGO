"use server";

export async function getSearch(Token, query) {
  console.log("Token:", Token);
  console.log("query:", query);
  const url = `https://backend-rd2rxwzuga-de.a.run.app/api/spots/search/${query}`;
  const bearer_token = `Bearer ${Token}`;
  try {
    const res = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${bearer_token}`,
      },
    });
    console.log("res:", res);
    const data = await res.json();
    const formattedData = data.map((spot) => {
      return {
        title: spot.name,
        location: spot.formatted_address,
        rating: spot.rating,
        lng: spot.geometry.location.lng,
        lat: spot.geometry.location.lat,
      };
    });
    const status = res.status;
    return formattedData;
  } catch (error) {
    console.error("Error:", error);
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
