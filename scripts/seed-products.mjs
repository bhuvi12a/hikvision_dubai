// Seed script to add product categories and subcategories
// Run with: node scripts/seed-products.mjs

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

async function postJSON(endpoint, data) {
    const res = await fetch(`${BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const text = await res.text();
        throw new Error(`Failed POST ${endpoint}: ${res.status} - ${text}`);
    }
    return res.json();
}

async function seed() {
    console.log(`\n🌱 Seeding database via ${BASE_URL}...\n`);

    // ============================================
    // 1. Create Navbar Categories (top-level nav)
    // ============================================
    console.log('📁 Creating Navbar Categories...');

    const navProducts = await postJSON('/api/navbar-categories', {
        name: 'Products',
        slug: 'products',
        description: 'All Hikvision products',
        order: 1,
        isActive: true,
    });
    console.log(`   ✅ Created: ${navProducts.name} (${navProducts._id})`);

    const navSolution = await postJSON('/api/navbar-categories', {
        name: 'Solution',
        slug: 'solution',
        description: 'Hikvision solutions',
        order: 2,
        isActive: true,
    });
    console.log(`   ✅ Created: ${navSolution.name} (${navSolution._id})`);

    // ============================================
    // 2. Create Categories (under "Products")
    // ============================================
    console.log('\n📂 Creating Categories...');

    const catNetworkProducts = await postJSON('/api/categories', {
        name: 'Network Products',
        slug: 'network-products',
        description: 'IP-based network surveillance products',
        navbarCategory: navProducts._id,
        isActive: true,
    });
    console.log(`   ✅ Created: ${catNetworkProducts.name}`);

    const catTurboHD = await postJSON('/api/categories', {
        name: 'Turbo HD Products',
        slug: 'turbo-hd-products',
        description: 'Turbo HD analog surveillance products',
        navbarCategory: navProducts._id,
        isActive: true,
    });
    console.log(`   ✅ Created: ${catTurboHD.name}`);

    const catAccessControl = await postJSON('/api/categories', {
        name: 'Access Control',
        slug: 'access-control',
        description: 'Access control and intercom systems',
        navbarCategory: navProducts._id,
        isActive: true,
    });
    console.log(`   ✅ Created: ${catAccessControl.name}`);

    const catDisplayControl = await postJSON('/api/categories', {
        name: 'Display And Control',
        slug: 'display-and-control',
        description: 'Display and control equipment',
        navbarCategory: navProducts._id,
        isActive: true,
    });
    console.log(`   ✅ Created: ${catDisplayControl.name}`);

    // ============================================
    // 3. Create SubCategories (under "Network Products")
    // ============================================
    console.log('\n📄 Creating SubCategories under Network Products...');

    const subCategories = [
        { name: 'Network Cameras', slug: 'network-cameras', description: 'IP network cameras' },
        { name: 'PTZ Cameras', slug: 'ptz-cameras', description: 'Pan-Tilt-Zoom network cameras' },
        { name: 'Network Video Recorder', slug: 'network-video-recorder', description: 'NVR recording systems' },
        { name: 'Server', slug: 'server', description: 'Server solutions' },
        { name: 'Explosion-Proof and Anti-Corrosion Series', slug: 'explosion-proof-anti-corrosion', description: 'Explosion-proof and anti-corrosion camera series' },
        { name: 'Storage', slug: 'storage', description: 'Storage solutions' },
        { name: 'Kits', slug: 'kits', description: 'Camera and NVR kits' },
    ];

    for (const sub of subCategories) {
        const created = await postJSON('/api/subcategories', {
            ...sub,
            category: catNetworkProducts._id,
            isActive: true,
        });
        console.log(`   ✅ Created: ${created.name}`);
    }

    console.log('\n🎉 Seeding complete!\n');
    console.log('Summary:');
    console.log('  - 2 Navbar Categories (Products, Solution)');
    console.log('  - 4 Categories (Network Products, Turbo HD Products, Access Control, Display And Control)');
    console.log('  - 7 SubCategories under Network Products');
    console.log('\nYou can now add more subcategories for other categories via the admin panel.\n');
}

seed().catch((err) => {
    console.error('\n❌ Seeding failed:', err.message);
    process.exit(1);
});
