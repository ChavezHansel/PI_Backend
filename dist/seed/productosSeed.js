"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Product_1 = require("../models/Product");
const seedProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = [
        {
            name: "Cama King Size",
            description: "Cama de tamaño King para un descanso inigualable.",
            images: ["https://i5.walmartimages.com/seo/Homfa-King-Size-Bed-Modern-Upholstered-Platform-Bed-Frame-with-Adjustable-Headboard-for-Bedroom-Black_071e7f94-e474-4914-9d9c-3734614cea12.4378f27c8594341a40fc001962b43fe5.jpeg"],
            variations: [
                { color: "Blanco", size: "King", price: 600, stock: 30 },
                { color: "Negro", size: "King", price: 650, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c0"
        },
        {
            name: "Cama Queen Size",
            description: "Cama de tamaño Queen para un descanso cómodo.",
            images: ["https://sierramuebles.pe/wp-content/uploads/2023/07/cama-moli-queen-size-2.jpeg"],
            variations: [
                { color: "Beige", size: "Queen", price: 550, stock: 30 },
                { color: "Blanco", size: "Queen", price: 580, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c0"
        },
        {
            name: "Cama Individual",
            description: "Cama de tamaño individual para habitaciones pequeñas.",
            images: ["https://medias.conforama.es/media/650by551/b3cc3cfdcde08ebc565db107742c121301cae0f5_f8750adf69004e3db2a1410893d5632e.jpg"],
            variations: [
                { color: "Blanco", size: "Individual", price: 300, stock: 30 },
                { color: "Madera", size: "Individual", price: 320, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c0"
        },
        {
            name: "Cama Literas",
            description: "Literas para niños o habitaciones compartidas.",
            images: ["https://colineal.pe/cdn/shop/products/COL103F163400_3.jpg?v=1666651470"],
            variations: [
                { color: "Blanco", size: "Doble", price: 500, stock: 30 },
                { color: "Madera", size: "Doble", price: 530, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c0"
        },
        {
            name: "Cama Nido",
            description: "Cama nido para ahorrar espacio en habitaciones pequeñas.",
            images: ["https://dauihome.com/wp-content/uploads/2022/01/cama-nido-juvenil-estilo-nordico-ambiente-1.jpg"],
            variations: [
                { color: "Madera", size: "Nido", price: 450, stock: 30 },
                { color: "Blanco", size: "Nido", price: 470, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c0"
        },
        {
            name: "Colchón Memory Foam",
            description: "Colchón de espuma viscoelástica para un descanso perfecto.",
            images: ["https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/41824747_3/w=800,h=800,fit=pad"],
            variations: [
                { color: "Blanco", size: "Queen", price: 350, stock: 30 },
                { color: "Blanco", size: "King", price: 400, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c1"
        },
        {
            name: "Colchón Viscoelástico",
            description: "Colchón viscoelástico que se adapta a tu cuerpo.",
            images: ["https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_010018/tienda_010018_85450f5f2b9129b433b0f9f1f58e28861f2e2d55_producto_large_90.png"],
            variations: [
                { color: "Blanco", size: "Individual", price: 450, stock: 30 },
                { color: "Rojo", size: "Queen", price: 470, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c1"
        },
        {
            name: "Colchón Orthopedic",
            description: "Colchón ortopédico ideal para problemas de espalda.",
            images: ["https://perezoso.pe/wp-content/uploads/2022/03/PRODUCTO-12-1-1.jpg"],
            variations: [
                { color: "Blanco", size: "Queen", price: 500, stock: 30 },
                { color: "Blanco", size: "King", price: 550, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c1"
        },
        {
            name: "Colchón de Resorte",
            description: "Colchón de resorte para mayor comodidad.",
            images: ["https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/43260454_1/w=800,h=800,fit=pad"],
            variations: [
                { color: "Blanco", size: "Individual", price: 300, stock: 30 },
                { color: "Blanco", size: "Queen", price: 330, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c1"
        },
        {
            name: "Colchón Híbrido",
            description: "Colchón híbrido con resorte y espuma para un confort excepcional.",
            images: ["https://m.media-amazon.com/images/I/910c3WSWRDL.jpg"],
            variations: [
                { color: "Blanco", size: "Queen", price: 550, stock: 30 },
                { color: "Blanco", size: "King", price: 600, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c1"
        },
        {
            name: "Sofá 3 Plazas",
            description: "Sofá de lujo para 3 personas, ideal para tu sala de estar.",
            images: ["https://meblero.com/wp-content/uploads/2023/04/Sofa-tres-plazas-asientos-deslizantes-cabezales-reclinables-abierto-beige.-Lecco.jpg"],
            variations: [
                { color: "Beige", size: "Grande", price: 800, stock: 30 },
                { color: "Gris", size: "Grande", price: 850, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c2"
        },
        {
            name: "Silla de Oficina",
            description: "Silla ergonómica de oficina con ajuste de altura.",
            images: ["https://promart.vteximg.com.br/arquivos/ids/7795539-1000-1000/139427.jpg?v=638417920471370000"],
            variations: [
                { color: "Negro", size: "Mediana", price: 150, stock: 30 },
                { color: "Gris", size: "Mediana", price: 160, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c2"
        },
        {
            name: "Silla Lounge",
            description: "Silla lounge moderna para descansar en cualquier habitación.",
            images: ["https://s3.amazonaws.com/newsroom001/media/images/53b1/24a9/c07a/8071/fd00/5f53/original/open-uri20140630-26750-4le07h?1404118179"],
            variations: [
                { color: "Azul", size: "Mediana", price: 250, stock: 30 },
                { color: "Rojo", size: "Mediana", price: 260, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c2"
        },
        {
            name: "Sofá Cama",
            description: "Sofá cama multifuncional, ideal para recibir visitas.",
            images: ["https://colineal.pe/cdn/shop/files/COL1040013M20T336900_2aeed1d2-4f94-4879-9ce0-a9c7c9b4ba4c.jpg?v=1727990655"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c2"
        }, {
            name: "Mesa de Comedor",
            description: "Mesa de comedor de madera para 6 personas.",
            price: 400,
            images: ["https://thepopulardesign.pe/wp-content/uploads/2022/05/MESA-DE-COMEDOR-SLAB-M-180.png"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c3"
        },
        {
            name: "Mesa de Café",
            description: "Mesa de café de estilo moderno para tu sala.",
            images: ["https://tramontinastorepe.vteximg.com.br/arquivos/ids/937554/14564051PNM001B.png?v=638518220532170000"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c3"
        },
        {
            name: "Mesa de Estudio",
            description: "Mesa de estudio moderna, perfecta para tu oficina.",
            images: ["https://promart.vteximg.com.br/arquivos/ids/7792028-1000-1000/10177.jpg?v=638417890259330000"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c3"
        },
        {
            name: "Mesa Redonda",
            description: "Mesa redonda de comedor para 4 personas.",
            images: ["https://visso-home.com/wp-content/uploads/2023/05/Mesa-Redonda-7.jpg"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 20 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c3"
        },
        {
            name: "Mesa Rectangular",
            description: "Mesa rectangular de madera para comedor.",
            images: ["https://casalindaperu.com/wp-content/uploads/2022/12/014069.jpg"],
            variations: [
                { color: "Negro", size: "Doble", price: 700, stock: 30 },
                { color: "Gris", size: "Doble", price: 750, stock: 30 }
            ],
            isActive: true,
            category: "67524065b6fdce214db990c3"
        },
    ];
    try {
        yield Product_1.Product.deleteMany();
        yield Product_1.Product.insertMany(products);
        console.log('Productos insertados correctamente.');
    }
    catch (error) {
        console.error('Error insertando categorías:', error);
    }
});
/*
const seedProduct = async () => {
    const products = [
        {
          name: "Cama King Size",
          description: "Cama de tamaño King para un descanso inigualable.",
          price: 600,
          images: ["https://i5.walmartimages.com/seo/Homfa-King-Size-Bed-Modern-Upholstered-Platform-Bed-Frame-with-Adjustable-Headboard-for-Bedroom-Black_071e7f94-e474-4914-9d9c-3734614cea12.4378f27c8594341a40fc001962b43fe5.jpeg"],
          variations: { color: ["Blanco", "Negro"], size: ["King"] },
          isActive: true,
          category: "67524065b6fdce214db990c0"
        },
        {
          name: "Cama Queen Size",
          description: "Cama de tamaño Queen para un descanso cómodo.",
          price: 550,
          images: ["https://sierramuebles.pe/wp-content/uploads/2023/07/cama-moli-queen-size-2.jpeg"],
          variations: { color: ["Beige", "Blanco"], size: ["Queen"] },
          isActive: true,
          category: "67524065b6fdce214db990c0"
        },
        {
          name: "Cama Individual",
          description: "Cama de tamaño individual para habitaciones pequeñas.",
          price: 300,
          images: ["https://medias.conforama.es/media/650by551/b3cc3cfdcde08ebc565db107742c121301cae0f5_f8750adf69004e3db2a1410893d5632e.jpg"],
          variations: { color: ["Blanco", "Madera"], size: ["Individual"] },
          isActive: true,
          category: "67524065b6fdce214db990c0"
        },
        {
          name: "Cama Literas",
          description: "Literas para niños o habitaciones compartidas.",
          price: 500,
          images: ["https://colineal.pe/cdn/shop/products/COL103F163400_3.jpg?v=1666651470"],
          variations: { color: ["Blanco", "Madera"], size: ["Doble"] },
          isActive: true,
          category: "67524065b6fdce214db990c0"
        },
        {
          name: "Cama Nido",
          description: "Cama nido para ahorrar espacio en habitaciones pequeñas.",
          price: 450,
          images: ["https://dauihome.com/wp-content/uploads/2022/01/cama-nido-juvenil-estilo-nordico-ambiente-1.jpg"],
          variations: { color: ["Madera", "Blanco"], size: ["Nido"] },
          isActive: true,
          category: "67524065b6fdce214db990c0"
        },
        
        {
          name: "Colchón Memory Foam",
          description: "Colchón de espuma viscoelástica para un descanso perfecto.",
          price: 350,
          images: ["https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/41824747_3/w=800,h=800,fit=pad"],
          variations: { color: ["Blanco"], size: ["Queen", "King"] },
          isActive: true,
          category: "67524065b6fdce214db990c1"
        },
        {
          name: "Colchón Viscoelástico",
          description: "Colchón viscoelástico que se adapta a tu cuerpo.",
          price: 450,
          images: ["https://d20f60vzbd93dl.cloudfront.net/uploads/tienda_010018/tienda_010018_85450f5f2b9129b433b0f9f1f58e28861f2e2d55_producto_large_90.png"],
          variations: { color: ["Blanco"], size: ["Individual", "Queen"] },
          isActive: true,
          category: "67524065b6fdce214db990c1"
        },
        {
          name: "Colchón Orthopedic",
          description: "Colchón ortopédico ideal para problemas de espalda.",
          price: 500,
          images: ["https://perezoso.pe/wp-content/uploads/2022/03/PRODUCTO-12-1-1.jpg"],
          variations: { color: ["Blanco"], size: ["Queen", "King"] },
          isActive: true,
          category: "67524065b6fdce214db990c1"
        },
        {
          name: "Colchón de Resorte",
          description: "Colchón de resorte para mayor comodidad.",
          price: 300,
          images: ["https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/tottusPE/43260454_1/w=800,h=800,fit=pad"],
          variations: { color: ["Blanco"], size: ["Individual", "Queen"] },
          isActive: true,
          category: "67524065b6fdce214db990c1"
        },
        {
          name: "Colchón Híbrido",
          description: "Colchón híbrido con resorte y espuma para un confort excepcional.",
          price: 550,
          images: ["https://m.media-amazon.com/images/I/910c3WSWRDL.jpg"],
          variations: { color: ["Blanco"], size: ["Queen", "King"] },
          isActive: true,
          category: "67524065b6fdce214db990c1"
        },
      
        {
          name: "Sofá 3 Plazas",
          description: "Sofá de lujo para 3 personas, ideal para tu sala de estar.",
          price: 800,
          images: ["https://meblero.com/wp-content/uploads/2023/04/Sofa-tres-plazas-asientos-deslizantes-cabezales-reclinables-abierto-beige.-Lecco.jpg"],
          variations: { color: ["Beige", "Gris"], size: ["Grande"] },
          isActive: true,
          category: "67524065b6fdce214db990c2"
        },
        {
          name: "Silla de Oficina",
          description: "Silla ergonómica de oficina con ajuste de altura.",
          price: 150,
          images: ["https://promart.vteximg.com.br/arquivos/ids/7795539-1000-1000/139427.jpg?v=638417920471370000"],
          variations: { color: ["Negro", "Gris"], size: ["Mediana"] },
          isActive: true,
          category: "67524065b6fdce214db990c2"
        },
        {
          name: "Silla Lounge",
          description: "Silla lounge moderna para descansar en cualquier habitación.",
          price: 250,
          images: ["https://s3.amazonaws.com/newsroom001/media/images/53b1/24a9/c07a/8071/fd00/5f53/original/open-uri20140630-26750-4le07h?1404118179"],
          variations: { color: ["Azul", "Rojo"], size: ["Mediana"] },
          isActive: true,
          category: "67524065b6fdce214db990c2"
        },
        {
          name: "Sofá Cama",
          description: "Sofá cama multifuncional, ideal para recibir visitas.",
          price: 700,
          images: ["https://colineal.pe/cdn/shop/files/COL1040013M20T336900_2aeed1d2-4f94-4879-9ce0-a9c7c9b4ba4c.jpg?v=1727990655"],
          variations: { color: ["Negro", "Gris"], size: ["Doble"] },
          isActive: true,
          category: "67524065b6fdce214db990c2"
        },
        {
          name: "Silla de Comedor",
          description: "Silla de comedor con un diseño moderno y elegante.",
          price: 180,
          images: ["https://imagedelivery.net/4fYuQyy-r8_rpBpcY7lH_A/sodimacPE/8916314_01/w=800,h=800,fit=pad"],
          variations: { color: ["Blanco", "Negro"], size: ["Mediana"] },
          isActive: true,
          category: "67524065b6fdce214db990c2"
        },
      
        {
          name: "Mesa de Comedor",
          description: "Mesa de comedor de madera para 6 personas.",
          price: 400,
          images: ["https://thepopulardesign.pe/wp-content/uploads/2022/05/MESA-DE-COMEDOR-SLAB-M-180.png"],
          variations: { color: ["Madera Oscura", "Blanco"], size: ["Grande"] },
          isActive: true,
          category: "67524065b6fdce214db990c3"
        },
        {
          name: "Mesa de Café",
          description: "Mesa de café de estilo moderno para tu sala.",
          price: 120,
          images: ["https://tramontinastorepe.vteximg.com.br/arquivos/ids/937554/14564051PNM001B.png?v=638518220532170000"],
          variations: { color: ["Negro", "Madera"], size: ["Pequeña"] },
          isActive: true,
          category: "67524065b6fdce214db990c3"
        },
        {
          name: "Mesa de Estudio",
          description: "Mesa de estudio moderna, perfecta para tu oficina.",
          price: 200,
          images: ["https://promart.vteximg.com.br/arquivos/ids/7792028-1000-1000/10177.jpg?v=638417890259330000"],
          variations: { color: ["Blanco", "Negro"], size: ["Mediana"] },
          isActive: true,
          category: "67524065b6fdce214db990c3"
        },
        {
          name: "Mesa Redonda",
          description: "Mesa redonda de comedor para 4 personas.",
          price: 300,
          images: ["https://visso-home.com/wp-content/uploads/2023/05/Mesa-Redonda-7.jpg"],
          variations: { color: ["Madera", "Negro"], size: ["Mediana"] },
          isActive: true,
          category: "67524065b6fdce214db990c3"
        },
        {
          name: "Mesa Rectangular",
          description: "Mesa rectangular de madera para comedor.",
          price: 350,
          images: ["https://casalindaperu.com/wp-content/uploads/2022/12/014069.jpg"],
          variations: { color: ["Madera", "Blanco"], size: ["Grande"] },
          isActive: true,
          category: "67524065b6fdce214db990c3"
        },
      ];
      
  try {
    await Product.deleteMany();
    await Product.insertMany(products);
    console.log('Categorías insertadas correctamente');
  } catch (error) {
    console.error('Error insertando categorías:', error);
  }
};
*/
exports.default = seedProduct;
//# sourceMappingURL=productosSeed.js.map