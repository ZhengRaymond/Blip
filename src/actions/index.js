import axios from 'axios';

export const GET_BLIPS = 'GET_BLIPS';
export const GET_TWEETS = 'GET_TWEETS';

const ROOT_URL = 'http://localhost:5000';
// const ROOT_URL = 'https://f52ff9f7.ngrok.io';

export function getTweets(name) {
  const request = axios.get(`${ROOT_URL}/tweets/${name}`);

  return (dispatch) => {
    request.then(({data}) => {
      console.log('action', data);
      dispatch({
        type: GET_TWEETS,
        payload: data
      })
    })
  }
}

export function getBlips() {
  const request = axios.get(`${ROOT_URL}/blips`);

  return (dispatch) => {
    request.then(({data}) => {
      dispatch({
        type: GET_BLIPS,
        payload: data
      })
    })
  }
  // request
  //   .then((data) => console.log('ACTIONS data: ', data))
  //   .catch((err) => console.log('ACTIONS err: ', err));
  //
  // return {
  //   type: GET_BLIPS,
  //   // payload: BLIP_SET_BIG
  //   payload: request
  // };
}


// const BLIP_SET_SMALL = {
//   "LA event": {
//     lng: -118.2437,
//     lat: 34.0522,
//     heat: 30,
//     hover: false,positive: true,
//     active: false
//   },
//   "NY event": {
//     lng: -73.935242,
//     lat: 40.730610,
//     heat: 68,
//     hover: false,
//     active: false
//   },
//   "LOCATION#0": {
//     lat: 35.359692,
//     lng: -110.330565,
//     heat: 18,
//     hover: false,
//     active: false
//   },
//   "LOCATION#1": {
//     lat: 31.472926,
//     lng: -104.134281,
//     heat: 23,
//     hover: false,positive: true,
//     active: false
//   },
//   "LOCATION#2": {
//     lat: 44.564821,
//     lng: -112.637704,
//     heat: 44,
//     hover: false,
//     active: false
//   },
//   "LOCATION#3": {
//     lat: 44.400455,
//     lng: -93.933278,
//     heat: 72,
//     hover: false,positive: true,
//     active: false
//   },
//   "LOCATION#4": {
//     lat: 41.374774,
//     lng: -79.958668,
//     heat: 14,
//     hover: false,
//     active: false,
//     positive: true
//   },
//   "LOCATION#5": {
//     lat: 44.085638,
//     lng: -70.114919,
//     heat: 29,
//     hover: false,
//     active: false
//   },
//   "LOCATION#6": {
//     lat: 29.149794,
//     lng: -82.155934,
//     heat: 60,
//     hover: false,
//     active: false,
//     positive: true
//   }
// };
//
// const BLIP_SET_BIG = {
//   "LA event":{"lng":-118.2437,"lat":34.0522,"heat":53.33521368871373,"hover":false,"positive":true,"active":false},
//   "NY event":{"lng":-73.935242,"lat":40.73061,"heat":63.112977259709766,"hover":false,"active":false},
//   "LOCATION#0":{"lat":35.359692,"lng":-110.330565,"heat":42.45013985830094,"hover":false,"active":false},
//   "LOCATION#1":{"lat":31.472926,"lng":-104.134281,"heat":29.618643492193574,"hover":false,"positive":true,"active":false},
//   "LOCATION#2":{"lat":44.564821,"lng":-112.637704,"heat":45.4147938060422,"hover":false,"active":false},
//   "LOCATION#3":{"lat":44.400455,"lng":-93.933278,"heat":20.248439332241773,"hover":false,"positive":true,"active":false},
//   "LOCATION#4":{"lat":41.374774,"lng":-79.958668,"heat":52.85914600302497,"hover":false,"active":false,"positive":true},
//   "LOCATION#5":{"lat":44.085638,"lng":-70.114919,"heat":51.10938037672731,"hover":false,"active":false},
//   "LOCATION#6":{"lat":29.149794,"lng":-82.155934,"heat":20.870339854767703,"hover":false,"active":false,"positive":true},
//   "location0.28939471062925604":{"lat":40.400455,"lng":-102.933278,"heat":30.34514460856383,"hover":false,"active":false,"positive":false},
//   "location0.6585734062579951":{"lat":37.400455,"lng":-109.933278,"heat":28.705251960982135,"hover":false,"active":false,"positive":false},
//   "location0.6126265459775557":{"lat":34.400455,"lng":-109.933278,"heat":41.591514552648505,"hover":false,"active":false,"positive":false},
//   "location0.40538358678215425":{"lat":36.400455,"lng":-94.933278,"heat":59.04327461276648,"hover":false,"active":false,"positive":false},
//   "location0.045655326941319796":{"lat":35.400455,"lng":-108.933278,"heat":22.148251819646045,"hover":false,"active":false,"positive":false},
//   "location0.48461496615754074":{"lat":39.400455,"lng":-86.933278,"heat":59.13040285494548,"hover":false,"active":false,"positive":false},
//   "location0.3591495683901824":{"lat":36.400455,"lng":-104.933278,"heat":53.52432568114057,"hover":false,"active":false,"positive":false},
//   "location0.8549214569448558":{"lat":40.400455,"lng":-89.933278,"heat":40.659175013206294,"hover":false,"active":false,"positive":false},
//   "location0.0806408227242621":{"lat":36.400455,"lng":-92.933278,"heat":42.33735640335423,"hover":false,"active":false,"positive":true},
//   "location0.3908412489158031":{"lat":36.400455,"lng":-89.933278,"heat":41,"hover":false,"active":false,"positive":false},
//   "location0.8099774531050712":{"lat":39.400455,"lng":-90.933278,"heat":62.227206680826704,"hover":false,"active":false,"positive":false},
//   "location0.43344754104399175":{"lat":34.400455,"lng":-112.933278,"heat":50.381617569164504,"hover":false,"active":false,"positive":false},
//   "location0.690430570939607":{"lat":38.400455,"lng":-98.933278,"heat":16.556633120909456,"hover":false,"active":false,"positive":true},
//   "location0.4137040683940716":{"lat":34.400455,"lng":-96.933278,"heat":22.551475471226745,"hover":false,"active":false,"positive":true},
//   "location0.6845722324354528":{"lat":40.400455,"lng":-111.933278,"heat":25.817106296099652,"hover":false,"active":false,"positive":true}
// }
//
// const TWEET_IDS = [
//   "900018824493379585",
//   "900018824321355776",
//   "900018824262627330",
//   "900018823847346177",
//   "900018823612334080",
//   "900018823562186755",
//   "900018823398608896",
//   "900018823302189063",
//   "900018823046320130",
//   "900018822886850561",
//   "900018822702178308",
//   "900018822546980866",
//   "900018822433951745",
//   "900018822345891841",
//   "900018822291361792",
//   "900018822039691264",
//   "900018822001897473",
//   "900018821917847552",
//   "900018821775413248",
//   "900018821716692992",
//   "900018821368512513",
//   "900018821284720640",
//   "900018821230194688",
//   "900018821226008577",
//   "900018821121093633",
//   "900018821108510720",
//   "900018821033078784",
//   "900018821028732928",
//   "900018821024579584",
//   "900018820835934208",
//   "900018820814917632",
//   "900018820739473408",
//   "900018820630368257",
//   "900018820575842304",
//   "900018820395479043",
//   "900018820122763264",
//   "900018820059987973",
//   "900018820022226944",
//   "900018819980197889",
//   "900018819619540992",
//   "900018819594366976",
//   "900018819464388608",
//   "900018819023896576",
//   "900018818914951168",
//   "900018818902364160",
//   "900018818843652096",
//   "900018818822680576",
//   "900018818625544192",
//   "900018818575196160",
//   "900018818461818880",
//   "900018818390441985",
//   "900018818382278656",
//   "900018818369630208",
//   "900018818277421056",
//   "900018818277355522",
//   "900018818227085312",
//   "900018818134757376",
//   "900018818109636609",
//   "900018818017370113",
//   "900018818004733953"
// ];
