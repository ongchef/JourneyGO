'use server';

export async function getRecommend(Token, lat, lng, category, page) {
  const url = `${process.env.BASE_URL}/api/spots/recommend/${lat}/${lng}/${category}/${page}`
  const bearer_token = `Bearer ${Token}`;

  try {
    console.log("getRecommend params", category, page);
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `${bearer_token}`,
      },
      cache: 'no-cache',
    });

    // const formattedData = data?.["businesses"]?.map((spot) => {
    //   return {
    //     title: spot?.name,
    //     location: (spot?.location?.address1 + ", " + spot?.location?.city + ", " + spot?.location?.state),
    //     description: "",
    //     lng: spot?.coordinates?.longitude,
    //     lat: spot?.coordinates?.latitude,
    //     img: spot?.image_url,
    //     rating: spot?.rating,
    //     review_count: spot?.review_count,
    //     categories: spot?.categories?.map((category) => category?.title),
    //     price: spot?.price,
    //     phone: spot?.display_phone,
    //     is_closed: spot?.is_closed,
    //   }
    // });
    // return formattedData;

    if(res.ok) {
      const data = await res.json();
      console.log("getRecommend status", res.status);
      const formattedData = data?.["businesses"]?.map((spot) => {
        return {
          title: spot?.name,
          location: (spot?.location?.address1 + ", " + spot?.location?.city + ", " + spot?.location?.state),
          description: "",
          lng: spot?.coordinates?.longitude,
          lat: spot?.coordinates?.latitude,
          img: spot?.image_url,
          rating: spot?.rating,
          review_count: spot?.review_count,
          categories: spot?.categories?.map((category) => category?.title),
          price: spot?.price,
          phone: spot?.display_phone,
          is_closed: spot?.is_closed,
        }
      });
      return {res: formattedData, status: res.status};
    } else {
      console.error(`getRecommend error`, res.status, res.statusText);
      return undefined;
    }
  } catch (error) {
    console.error(error);
    return undefined;
  }
}

/*
const data = 
{
  "businesses": [
    {
      "id": "HKR_FxnbRqGhhNtPmiTVmQ",
      "alias": "鼎泰豐-大安區-3",
      "name": "Din Tai Fung",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/JTnG-clKzfukQMM48DZrtQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E5%A4%A7%E5%AE%89%E5%8D%80-3?adjust_creative=Jj_UPLmCxbya5rGZn2Uk2A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Jj_UPLmCxbya5rGZn2Uk2A",
      "review_count": 379,
      "categories": [
        {
          "alias": "shanghainese",
          "title": "Shanghainese"
        },
        {
          "alias": "dimsum",
          "title": "Dim Sum"
        },
        {
          "alias": "taiwanese",
          "title": "Taiwanese"
        }
      ],
      "rating": 4.6,
      "coordinates": {
        "latitude": 25.033483,
        "longitude": 121.530112
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "信義路二段194號",
        "address2": null,
        "address3": null,
        "city": "Da'an District",
        "zip_code": "106",
        "country": "TW",
        "state": "TPE",
        "display_address": [
          "No. 194, Section 2, Xinyi Road",
          "信義路二段194號",
          "Da'an District, 台北市 106",
          "Taiwan"
        ]
      },
      "phone": "+886223218928",
      "display_phone": "+886 2 2321 8928",
      "distance": 2590.453858967909,
      "attributes": {
        "business_temp_closed": null,
        "menu_url": null,
        "open24_hours": null,
        "waitlist_reservation": null
      }
    },
    {
      "id": "HKR_FxnbRqGhhNtPmiTVmQ",
      "alias": "鼎泰豐-大安區-3",
      "name": "Din Tai Fung",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/JTnG-clKzfukQMM48DZrtQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E5%A4%A7%E5%AE%89%E5%8D%80-3?adjust_creative=Jj_UPLmCxbya5rGZn2Uk2A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Jj_UPLmCxbya5rGZn2Uk2A",
      "review_count": 379,
      "categories": [
        {
          "alias": "shanghainese",
          "title": "Shanghainese"
        },
        {
          "alias": "dimsum",
          "title": "Dim Sum"
        },
        {
          "alias": "taiwanese",
          "title": "Taiwanese"
        }
      ],
      "rating": 4.6,
      "coordinates": {
        "latitude": 25.033483,
        "longitude": 121.530112
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "信義路二段194號",
        "address2": null,
        "address3": null,
        "city": "Da'an District",
        "zip_code": "106",
        "country": "TW",
        "state": "TPE",
        "display_address": [
          "No. 194, Section 2, Xinyi Road",
          "信義路二段194號",
          "Da'an District, 台北市 106",
          "Taiwan"
        ]
      },
      "phone": "+886223218928",
      "display_phone": "+886 2 2321 8928",
      "distance": 2590.453858967909,
      "attributes": {
        "business_temp_closed": null,
        "menu_url": null,
        "open24_hours": null,
        "waitlist_reservation": null
      }
    },
    {
      "id": "HKR_FxnbRqGhhNtPmiTVmQ",
      "alias": "鼎泰豐-大安區-3",
      "name": "Din Tai Fung",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/JTnG-clKzfukQMM48DZrtQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E5%A4%A7%E5%AE%89%E5%8D%80-3?adjust_creative=Jj_UPLmCxbya5rGZn2Uk2A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Jj_UPLmCxbya5rGZn2Uk2A",
      "review_count": 379,
      "categories": [
        {
          "alias": "shanghainese",
          "title": "Shanghainese"
        },
        {
          "alias": "dimsum",
          "title": "Dim Sum"
        },
        {
          "alias": "taiwanese",
          "title": "Taiwanese"
        }
      ],
      "rating": 4.6,
      "coordinates": {
        "latitude": 25.033483,
        "longitude": 121.530112
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "信義路二段194號",
        "address2": null,
        "address3": null,
        "city": "Da'an District",
        "zip_code": "106",
        "country": "TW",
        "state": "TPE",
        "display_address": [
          "No. 194, Section 2, Xinyi Road",
          "信義路二段194號",
          "Da'an District, 台北市 106",
          "Taiwan"
        ]
      },
      "phone": "+886223218928",
      "display_phone": "+886 2 2321 8928",
      "distance": 2590.453858967909,
      "attributes": {
        "business_temp_closed": null,
        "menu_url": null,
        "open24_hours": null,
        "waitlist_reservation": null
      }
    },
    {
      "id": "HKR_FxnbRqGhhNtPmiTVmQ",
      "alias": "鼎泰豐-大安區-3",
      "name": "Din Tai Fung",
      "image_url": "https://s3-media4.fl.yelpcdn.com/bphoto/JTnG-clKzfukQMM48DZrtQ/o.jpg",
      "is_closed": false,
      "url": "https://www.yelp.com/biz/%E9%BC%8E%E6%B3%B0%E8%B1%90-%E5%A4%A7%E5%AE%89%E5%8D%80-3?adjust_creative=Jj_UPLmCxbya5rGZn2Uk2A&utm_campaign=yelp_api_v3&utm_medium=api_v3_business_search&utm_source=Jj_UPLmCxbya5rGZn2Uk2A",
      "review_count": 379,
      "categories": [
        {
          "alias": "shanghainese",
          "title": "Shanghainese"
        },
        {
          "alias": "dimsum",
          "title": "Dim Sum"
        },
        {
          "alias": "taiwanese",
          "title": "Taiwanese"
        }
      ],
      "rating": 4.6,
      "coordinates": {
        "latitude": 25.033483,
        "longitude": 121.530112
      },
      "transactions": [],
      "price": "$$",
      "location": {
        "address1": "信義路二段194號",
        "address2": null,
        "address3": null,
        "city": "Da'an District",
        "zip_code": "106",
        "country": "TW",
        "state": "TPE",
        "display_address": [
          "No. 194, Section 2, Xinyi Road",
          "信義路二段194號",
          "Da'an District, 台北市 106",
          "Taiwan"
        ]
      },
      "phone": "+886223218928",
      "display_phone": "+886 2 2321 8928",
      "distance": 2590.453858967909,
      "attributes": {
        "business_temp_closed": null,
        "menu_url": null,
        "open24_hours": null,
        "waitlist_reservation": null
      }
    }
  ],
  "total": 2800,
  "region": {
    "center": {
      "longitude": 121.5263524,
      "latitude": 25.0104369
    }
  }
}
*/