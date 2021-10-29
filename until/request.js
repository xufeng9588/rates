const _request = require('request');
const _axios = require('axios');
const { reject } = require('lodash');
async function request(o){
  return new Promise((resolve, reject) => {
    _request(o, (e, res, body) => {
      if(e) return reject(e)
      try {
        if(!body||!body.length) console.log(o,'....')
        if(typeof body === 'string' && body && body.length) body= JSON.parse(body)
      } catch (error) {
        reject(error)
        console.log(body,'body....')
      }
      resolve(body);
    });
  }).catch(()=>{
    console.log('请求出错--->');
    return 'err'
  })
}

async function axios(o){
  return new Promise((resolve,reject)=>{
    _axios({url:o}).then(res=>{
      if(res.data){
        const body = res.data;
      try {
        // if(!body||!body.length) console.log(o,'....')
        if(typeof body === 'string') body= JSON.parse(body)
      } catch (error) {
        reject(error)
        // console.log(body,'body....')
      }
      resolve(body);
      }
    }).catch(err=>{
      console.log(err)
    })
  }).catch(()=>{
    console.log('请求出错--->');
    return 'err'
  })
}
// const url = 'https://www.futunn.com/quote-api/get-news-list?stock_id=75909252204894&seq_mark=1625203541&market_type=2&type=0&subType=0'
// async function aa (){
//   const bb = await axios(url)
//   console.log(bb)
// }
// aa()

module.exports =  { request ,axios };