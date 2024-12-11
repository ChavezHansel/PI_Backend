import { PriceRange } from "../models/PriceRange"; 


const priceRangesData = [
    { name: "0 - 100", minPrice: 0, maxPrice: 100 },
    { name: "101 - 500", minPrice: 101, maxPrice: 500 },
    { name: "501 - 1000", minPrice: 501, maxPrice: 1000 },
    { name: "1001 - 5000", minPrice: 1001, maxPrice: 5000 },
    { name: "5001 - 10000", minPrice: 5001, maxPrice: 10000 },
];
const seedPriceRange = async () => {
  try {
    await PriceRange.deleteMany();
    await PriceRange.insertMany(priceRangesData);
    console.log('Price ranges insertadas correctamente');
  } catch (error) {
    console.error('Error insertando categorías:', error);
  }
};

export default seedPriceRange;