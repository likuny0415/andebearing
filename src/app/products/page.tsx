import ProductCard from "../../components/ProductCard";

// Sample product data - in a real application, this would come from an API or database
const products = [
  {
    id: 'deep-groove-ball-bearing',
    name: 'Deep Groove Ball Bearing',
    category: 'Ball Bearings',
    description: 'Versatile bearing type suitable for high-speed applications with radial and axial loads in both directions.',
    imageSrc: '/images/deep-groove-ball-bearing.jpg',
    price: 'From $12.99'
  },
  {
    id: 'angular-contact-ball-bearing',
    name: 'Angular Contact Ball Bearing',
    category: 'Ball Bearings',
    description: 'Designed to handle combined loads, these bearings are ideal for applications requiring high precision and rigidity.',
    imageSrc: '/images/angular-contact-ball-bearing.jpg',
    price: 'From $19.99'
  },
  {
    id: 'self-aligning-ball-bearing',
    name: 'Self-Aligning Ball Bearing',
    category: 'Ball Bearings',
    description: 'Features two rows of balls with a common sphered raceway in the outer ring, allowing for self-alignment.',
    imageSrc: '/images/self-aligning-ball-bearing.jpg',
    price: 'From $22.99'
  },
  {
    id: 'cylindrical-roller-bearing',
    name: 'Cylindrical Roller Bearing',
    category: 'Roller Bearings',
    description: 'High load capacity and low friction, ideal for applications with heavy radial loads and high speeds.',
    imageSrc: '/images/cylindrical-roller-bearing.jpg',
    price: 'From $29.99'
  },
  {
    id: 'tapered-roller-bearing',
    name: 'Tapered Roller Bearing',
    category: 'Roller Bearings',
    description: 'Designed to handle combined loads, these bearings have tapered inner and outer raceways with tapered rollers.',
    imageSrc: '/images/tapered-roller-bearing.jpg',
    price: 'From $24.99'
  },
  {
    id: 'spherical-roller-bearing',
    name: 'Spherical Roller Bearing',
    category: 'Roller Bearings',
    description: 'Self-aligning bearings with high load capacity, suitable for applications where misalignment or shaft deflection occurs.',
    imageSrc: '/images/spherical-roller-bearing.jpg',
    price: 'From $39.99'
  },
  {
    id: 'needle-roller-bearing',
    name: 'Needle Roller Bearing',
    category: 'Roller Bearings',
    description: 'Compact design with high load capacity, ideal for applications with limited radial space.',
    imageSrc: '/images/needle-roller-bearing.jpg',
    price: 'From $18.99'
  },
  {
    id: 'thrust-ball-bearing',
    name: 'Thrust Ball Bearing',
    category: 'Thrust Bearings',
    description: 'Designed to handle axial loads in one direction, commonly used in low to medium speed applications.',
    imageSrc: '/images/thrust-ball-bearing.jpg',
    price: 'From $15.99'
  },
  {
    id: 'linear-guide',
    name: 'Linear Guide System',
    category: 'Linear Motion',
    description: 'Precision-engineered linear motion systems for smooth, accurate movement in industrial machinery and automation.',
    imageSrc: '/images/linear-guide.jpg',
    price: 'From $89.99'
  },
  {
    id: 'mounted-bearing-unit',
    name: 'Mounted Bearing Unit',
    category: 'Mounted Units',
    description: 'Pre-assembled units consisting of a bearing, housing, seal, and locking device, ready for easy installation.',
    imageSrc: '/images/mounted-bearing-unit.jpg',
    price: 'From $45.99'
  },
  {
    id: 'bearing-housing',
    name: 'Bearing Housing',
    category: 'Accessories',
    description: 'Protective enclosures for bearings, available in various designs to suit different application requirements.',
    imageSrc: '/images/bearing-housing.jpg',
    price: 'From $32.99'
  },
  {
    id: 'bearing-lubricant',
    name: 'Bearing Lubricant',
    category: 'Accessories',
    description: 'High-performance lubricants specifically formulated to reduce friction and extend bearing life.',
    imageSrc: '/images/bearing-lubricant.jpg',
    price: 'From $9.99'
  }
];

// Group products by category
const groupedProducts = products.reduce((acc, product) => {
  if (!acc[product.category]) {
    acc[product.category] = [];
  }
  acc[product.category].push(product);
  return acc;
}, {} as Record<string, typeof products>);

// Get unique categories
const categories = Object.keys(groupedProducts);

export default function ProductsPage() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="bg-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl font-bold mb-4">Our Products</h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Explore our comprehensive range of high-quality bearings and related products,
            designed to meet the demands of various industries and applications.
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        {categories.map((category) => (
          <div key={category} className="mb-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 pb-2 border-b border-gray-200">
              {category}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {groupedProducts[category].map((product) => (
                <ProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  category={product.category}
                  description={product.description}
                  imageSrc={product.imageSrc}
                  price={product.price}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 