/* eslint-disable linebreak-style */
/* eslint-disable indent */
import axios from 'axios';
async function fetchProducts() {
try {
    const responseBR = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/brazilian_provider');
    const responseEU = await axios.get('http://616d6bdb6dacbb001794ca17.mockapi.io/devnology/european_provider');
    if (responseBR.status === 200 && responseEU.status === 200) {
        const EUProducts = (responseEU.data).map((product) => ({
                productId: product.id,
                productName: product.name,
                productPrice: product.price,
                productDescription: product.description,
                productMaterial: product.details.material,
                productAdjective: product.details.adjective,
                productImagepath: product.gallery[0],
                hasdisCount: product.hasDiscount,
                discountValue: product.discountValue,
                finalPrice: (product.price - product.discountValue * product.price),
                supplier: 'EUSupplier',
            }));
        const BRProducts = (responseBR.data).map((product) => ({
                productId: product.id,
                productName: product.nome,
                productPrice: product.preco,
                productDescription: product.descricao,
                productMaterial: product.material,
                productAdjective: product.departamento,
                productImagepath: product.imagem,
                hasdisCount: 'false',
                discountValue: '0',
                finalPrice: product.preco,
                supplier: 'BRSupplier',
            }));
        const listFinal = [...EUProducts, ...BRProducts];
        return listFinal;
    }
} catch (err) {
    console.log(err);
    return ({ message: err });
}
}
export default fetchProducts();
