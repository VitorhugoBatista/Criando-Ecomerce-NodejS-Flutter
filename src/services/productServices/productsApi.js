/* eslint-disable prefer-const */
/* eslint-disable eol-last */
/* eslint-disable no-extra-semi */
/* eslint-disable space-before-blocks */
/* eslint-disable no-unused-vars */
/* eslint-disable no-empty-function */
/* eslint-disable no-multiple-empty-lines */
/* eslint-disable linebreak-style */
import axios from "axios";






async function fetchProducts(res){
let products=[];

const responseBR = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
const responseEU = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
if(responseBR.status === 200 || responseEU.status === 200){
let parseBR=JSON.stringify(responseBR.data);
}

}
export default fetchProducts;