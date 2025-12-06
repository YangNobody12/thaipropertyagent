import { mutation } from "./_generated/server";

// Thai property seed data
const THAI_PROPERTIES = [
  // Bangkok Condos
  {
    name: "The Diplomat 39",
    location: "Bangkok",
    district: "Sukhumvit",
    price: 15500000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 75,
    description_th: "คอนโดหรูใจกลางสุขุมวิท ใกล้ BTS พร้อมพงษ์ วิวสวย ตกแต่งครบ",
    description_en: "Luxury condo in the heart of Sukhumvit, near BTS Phrom Phong. Beautiful view, fully furnished.",
    features: ["Fully Furnished", "City View", "Swimming Pool", "Gym", "24hr Security"],
    nearBts: "Phrom Phong",
    imageUrl: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800",
  },
  {
    name: "Ideo Q Sukhumvit 36",
    location: "Bangkok",
    district: "Sukhumvit",
    price: 8900000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 45,
    description_th: "คอนโดใหม่ ทำเลดี ใกล้ BTS ทองหล่อ เหมาะสำหรับคนทำงาน",
    description_en: "New condo, great location near BTS Thong Lo. Perfect for working professionals.",
    features: ["New Building", "Rooftop Garden", "Co-working Space", "Gym"],
    nearBts: "Thong Lo",
    imageUrl: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800",
  },
  {
    name: "Life Sathorn Sierra",
    location: "Bangkok",
    district: "Sathorn",
    price: 6500000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 35,
    description_th: "คอนโดราคาดี ย่านสาทร ใกล้ BTS ตลาดพลู การเดินทางสะดวก",
    description_en: "Affordable condo in Sathorn area, near BTS Talat Phlu. Convenient transportation.",
    features: ["Affordable", "Near BTS", "Swimming Pool", "Garden"],
    nearBts: "Talat Phlu",
    imageUrl: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800",
  },
  {
    name: "Ashton Silom",
    location: "Bangkok",
    district: "Silom",
    price: 22000000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 86,
    description_th: "คอนโดหรูระดับไฮเอนด์ ใจกลางสีลม วิวแม่น้ำเจ้าพระยา",
    description_en: "High-end luxury condo in central Silom with Chao Phraya River view.",
    features: ["River View", "Luxury Finish", "Infinity Pool", "Sky Lounge", "Concierge"],
    nearBts: "Chong Nonsi",
    nearMrt: "Silom",
    imageUrl: "https://images.unsplash.com/photo-1567496898669-ee935f5f647a?w=800",
  },
  {
    name: "Rhythm Rangnam",
    location: "Bangkok",
    district: "Phaya Thai",
    price: 5200000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    description_th: "สตูดิโอคอนโด ใกล้ BTS อนุสาวรีย์ชัย เหมาะสำหรับนักศึกษาและคนทำงาน",
    description_en: "Studio condo near BTS Victory Monument. Ideal for students and young professionals.",
    features: ["Studio", "Near University", "Affordable", "Gym"],
    nearBts: "Victory Monument",
    imageUrl: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800",
  },

  // Chiang Mai Properties
  {
    name: "D Condo Nim",
    location: "Chiang Mai",
    district: "Nimman",
    price: 2800000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 32,
    description_th: "คอนโดทันสมัยในย่านนิมมาน ใกล้ร้านกาแฟและร้านอาหารชื่อดัง",
    description_en: "Modern condo in trendy Nimman area. Close to famous cafes and restaurants.",
    features: ["Trendy Location", "Mountain View", "Swimming Pool", "Near Maya Mall"],
    imageUrl: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800",
  },
  {
    name: "Hillside 4 Condominium",
    location: "Chiang Mai",
    district: "Suthep",
    price: 4500000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 1,
    area: 65,
    description_th: "คอนโดวิวดอยสุเทพ ใกล้มหาวิทยาลัยเชียงใหม่ บรรยากาศเงียบสงบ",
    description_en: "Condo with Doi Suthep mountain view. Near Chiang Mai University, peaceful atmosphere.",
    features: ["Mountain View", "Near University", "Quiet Area", "Garden"],
    imageUrl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
  },
  {
    name: "The Nimmana",
    location: "Chiang Mai",
    district: "Nimman",
    price: 8500000,
    type: "house",
    bedrooms: 3,
    bathrooms: 3,
    area: 180,
    description_th: "บ้านเดี่ยวสไตล์โมเดิร์นลอฟท์ ใกล้ถนนนิมมาน พร้อมสวนส่วนตัว",
    description_en: "Modern loft-style house near Nimman Road with private garden.",
    features: ["Private Garden", "Modern Design", "Parking", "Near Nimman"],
    imageUrl: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800",
  },

  // Phuket Properties
  {
    name: "Kata Ocean View",
    location: "Phuket",
    district: "Kata",
    price: 12000000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 95,
    description_th: "คอนโดวิวทะเล หาดกะตะ เดินถึงชายหาดได้ เหมาะสำหรับลงทุนให้เช่า",
    description_en: "Sea view condo at Kata Beach. Walking distance to beach. Great for rental investment.",
    features: ["Sea View", "Near Beach", "Investment Property", "Resort Facilities"],
    imageUrl: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800",
  },
  {
    name: "Rawai Beach Villa",
    location: "Phuket",
    district: "Rawai",
    price: 35000000,
    type: "villa",
    bedrooms: 4,
    bathrooms: 4,
    area: 350,
    description_th: "วิลล่าหรูริมหาดราไวย์ พร้อมสระว่ายน้ำส่วนตัว วิวทะเลพาโนรามา",
    description_en: "Luxury beachfront villa in Rawai with private pool and panoramic sea view.",
    features: ["Private Pool", "Beachfront", "Sea View", "Luxury Finish", "Maid Quarters"],
    imageUrl: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800",
  },
  {
    name: "Patong Tower",
    location: "Phuket",
    district: "Patong",
    price: 7500000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 55,
    description_th: "คอนโดใจกลางป่าตอง ใกล้หาดและแหล่งบันเทิง รายได้ค่าเช่าดี",
    description_en: "Condo in central Patong, near beach and entertainment. Good rental income potential.",
    features: ["Central Location", "Near Beach", "Rental Income", "Near Bangla Road"],
    imageUrl: "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800",
  },
  {
    name: "Kamala Hills Estate",
    location: "Phuket",
    district: "Kamala",
    price: 55000000,
    type: "villa",
    bedrooms: 5,
    bathrooms: 6,
    area: 500,
    description_th: "วิลล่าสุดหรูบนเนินเขากมลา วิวทะเลอันดามัน สระว่ายน้ำอินฟินิตี้",
    description_en: "Ultra-luxury hillside villa in Kamala with Andaman Sea view and infinity pool.",
    features: ["Infinity Pool", "Sea View", "Wine Cellar", "Home Cinema", "Staff Quarters"],
    imageUrl: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800",
  },

  // Pattaya Properties
  {
    name: "The Base Central Pattaya",
    location: "Pattaya",
    district: "Central Pattaya",
    price: 3200000,
    type: "condo",
    bedrooms: 1,
    bathrooms: 1,
    area: 30,
    description_th: "คอนโดใจกลางพัทยา ใกล้ชายหาดและห้างสรรพสินค้า",
    description_en: "Condo in central Pattaya, near beach and shopping malls.",
    features: ["Central Location", "Near Beach", "Near Terminal 21", "Pool"],
    imageUrl: "https://images.unsplash.com/photo-1554995207-c18c203602cb?w=800",
  },
  {
    name: "Ocean Portofino",
    location: "Pattaya",
    district: "Jomtien",
    price: 9800000,
    type: "condo",
    bedrooms: 2,
    bathrooms: 2,
    area: 85,
    description_th: "คอนโดหรูหาดจอมเทียน วิวทะเลตรง ตกแต่งสไตล์เมดิเตอร์เรเนียน",
    description_en: "Luxury condo at Jomtien Beach with direct sea view. Mediterranean style.",
    features: ["Direct Sea View", "Beachfront", "Mediterranean Style", "Resort Pool"],
    imageUrl: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=800",
  },
  {
    name: "Palm Oasis Pool Villa",
    location: "Pattaya",
    district: "East Pattaya",
    price: 18500000,
    type: "villa",
    bedrooms: 3,
    bathrooms: 3,
    area: 250,
    description_th: "พูลวิลล่าสไตล์ทรอปิคอล เงียบสงบ พร้อมสวนและสระว่ายน้ำส่วนตัว",
    description_en: "Tropical-style pool villa in quiet area with garden and private pool.",
    features: ["Private Pool", "Tropical Garden", "Quiet Area", "Covered Parking"],
    imageUrl: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800",
  },
];

// Seed the database with Thai properties
export const seedProperties = mutation({
  args: {},
  handler: async (ctx) => {
    // Check if properties already exist
    const existingProperties = await ctx.db.query("properties").take(1);
    if (existingProperties.length > 0) {
      return { message: "Properties already seeded", count: 0 };
    }

    // Insert all properties
    for (const property of THAI_PROPERTIES) {
      await ctx.db.insert("properties", property);
    }

    return { message: "Properties seeded successfully", count: THAI_PROPERTIES.length };
  },
});

// Clear all properties (useful for testing)
export const clearProperties = mutation({
  args: {},
  handler: async (ctx) => {
    const properties = await ctx.db.query("properties").collect();
    for (const property of properties) {
      await ctx.db.delete(property._id);
    }
    return { message: "All properties cleared", count: properties.length };
  },
});

