import { Category } from '../models/Category';

const seedCategory = async () => {
  const categories = [
    {
      name: 'Muebles',
      description: 'Muebles para todos los gustos y estilos.',
    },
    {
      name: 'Camas',
      description: 'Camas cómodas para un descanso de calidad.',
    },
    {
      name: 'Colchones',
      description: 'Colchones de alta calidad para un buen sueño.',
    },
    {
      name: 'Sillas y Sofás',
      description: 'Sillas, sofás y muebles de asiento para tu hogar.',
    },
    {
      name: 'Mesas',
      description: 'Mesas de comedor y escritorios.',
    },
    {
      name: 'Decoración',
      description: 'Accesorios decorativos para tu hogar.',
    },
    {
      name: 'Armarios',
      description: 'Armarios y muebles de almacenamiento.',
    },
    {
      name: 'Oficina',
      description: 'Muebles y accesorios para tu oficina.',
    },
  ];

  try {
    await Category.deleteMany();
    await Category.insertMany(categories);
    console.log('Categorías insertadas correctamente');
  } catch (error) {
    console.error('Error insertando categorías:', error);
  }
};

export default seedCategory;