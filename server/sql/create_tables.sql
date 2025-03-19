CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(30) NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  password VARCHAR(255),
  google_id VARCHAR(255) UNIQUE,
  facebook_id VARCHAR(255) UNIQUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL,
  stock INTEGER NOT NULL DEFAULT 0,
  category VARCHAR(255),
  imageUrl VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS carts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total_price NUMERIC(10,2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INTEGER NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INTEGER NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO products (name, description, price, stock, category, imageUrl) VALUES
('Razer Huntsman V3 Pro', 
 'High-end gaming keyboard featuring Razer optical switches, customizable RGB lighting, and dedicated media controls for an enhanced gaming experience.', 
 199.99, 20, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306595/razer-huntsman-v3-pro-hero-desktop-v3_scwicm.webp'),
('Razer DeathAdder V3 Pro', 
 'Ergonomic, high-performance gaming mouse with precision tracking, wireless connectivity, and customizable DPI settings.', 
 149.99, 30, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306695/61Syl8a3uwL_tchxwa.jpg'),
('Razer Kraken V3 Pro', 
 'Immersive gaming headset with advanced sound quality, noise cancellation, and comfortable memory foam ear cushions.', 
 129.99, 25, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306753/82f60aaa-1fbd-4fc1-a0b8-418acf50abba_x99jvw.jpg'),
('Vitesse Gaming Chair', 
 'Premium ergonomic gaming chair featuring adjustable lumbar support, high-quality cushioning, and a sleek design for extended gaming sessions.', 
 299.99, 15, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306770/71DlNwhYT1L_he1eoc.jpg'),
('Samsung Odyssey G3 Gaming Monitor', 
 '24-inch Full HD gaming monitor with a high refresh rate, fast response time, and immersive visuals designed for competitive gaming.', 
 199.99, 10, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306818/81HN5m6HR8L_fs2hgk.jpg'),
('PS5 DualSense Edge Controller', 
 'Premium wireless controller for PlayStation 5 featuring customizable controls, enhanced ergonomics, and advanced haptic feedback.', 
 179.99, 20, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306843/Sony-PS5-DualSense-Edge-Wireless-Controller_657e4493-944a-4782-9654-f8e024752c67.8319804d8bf7e5311004fecfb9f0e7f4_h7eo7i.png'),
('Alienware Gaming Laptop', 
 'High-performance gaming laptop with top-tier graphics, fast processing, and an immersive display for a superior gaming experience.', 
 1999.99, 5, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306874/maxresdefault_yod3er.jpg'),
('Gaming Desk', 
 'Spacious and adjustable gaming desk designed for ergonomic comfort, optimal cable management, and a sleek aesthetic.', 
 249.99, 12, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306892/19d0d99ce371276efc80369ae2638b11_cwggdc.png'),
('PS VR 2', 
 'Next-generation virtual reality headset for PlayStation 5 featuring advanced visuals, immersive tracking, and a comfortable design.', 
 549.99, 8, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306946/61LfMet7s4L_qf0v3e.jpg'),
('HyperX Gaming Microphone', 
 'High-quality condenser microphone designed for streamers and gamers, offering clear and professional-level sound capture.', 
 99.99, 30, 'Gaming', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742306973/71jfzOmq6dL_ofzpvv.jpg');

INSERT INTO products (name, description, price, stock, category, imageUrl) VALUES
('Beats Studio Buds', 
 'Compact true wireless earbuds offering active noise cancellation and transparency mode for balanced, high-quality sound. Ideal for everyday listening.', 
 149.99, 40, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307075/black-01-solobuds_dbkbu7.jpg'),
('Apple Smart Watch', 
 'A sleek smartwatch with advanced health and fitness tracking, customizable watch faces, and seamless integration with iOS devices for everyday convenience.', 
 399.99, 30, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307093/71pbEc1KO3L_yo4mge.jpg'),
('Potensic ATOM SE GPS Drone with Camera 4K', 
 'A compact drone featuring 4K video capture, GPS-assisted flight, and intelligent flight modes for stunning aerial photography and recreational flying.', 
 249.99, 25, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307117/61fbYPFOoSL_sdmeun.jpg'),
('Alexa Amazon (Echo Dot)', 
 'A smart speaker powered by Alexa that offers voice-controlled assistance, smart home integration, and crisp sound quality in a compact design.', 
 49.99, 50, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307155/amazon-alexa-echo-featured_cst8kt.jpg'),
('INIU Portable Charger', 
 'A high-capacity portable charger with fast charging technology and multiple USB ports, perfect for on-the-go power for your devices.', 
 29.99, 60, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307182/B5_c14ee22a-a4bc-4da7-9249-380c0bfcac4b_pothap.png'),
('Bose SoundLink Max Portable Speaker', 
 'A premium portable Bluetooth speaker delivering powerful sound, deep bass, and rugged durability for both indoor and outdoor use.', 
 349.99, 15, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742307205/6577664_rd_jincil.jpg'),
('iPad Air', 
 'A lightweight, high-performance tablet featuring a stunning Liquid Retina display, powerful processing, and support for Apple Pencil, ideal for both work and play.', 
 599.99, 20, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742308821/iPadAirFront.jpg_xuoqs9.jpg'),
('MacBook Pro', 
 'A powerful laptop equipped with the latest Apple M1 Pro chip, a high-resolution Retina display, and advanced features designed for professionals and creatives.', 
 1999.99, 10, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742308881/81Aty4Ef1WL_ol3ikt.jpg'),
('Smart Glasses', 
 'Futuristic smart glasses offering augmented reality features, hands-free notifications, and integrated audio for a seamlessly connected lifestyle.', 
 399.99, 12, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742308930/maxresdefault_ullq8f.jpg'),
('FitBit', 
 'A lightweight fitness tracker that monitors activity, heart rate, sleep, and provides personalized insights to help you lead a healthier lifestyle.', 
 129.99, 35, 'Tech', 'https://res.cloudinary.com/deamdwd4t/image/upload/v1742308941/d56eeaa21522d8918ee1cedde9dea91293.rsquare.w600_fqinio.jpg');


