const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    
    try {
        const url = 'http://localhost:3001/ar/projects/maison-du-patrimoine';
        console.log(`Navigating to ${url}...`);
        await page.goto(url, { waitUntil: 'networkidle' });
        
        // Wait for fonts and animations
        await page.waitForTimeout(3000);
        
        const artifactDir = 'C:/Users/PCIB/.gemini/antigravity/brain/b0a866d8-c546-4884-ab01-2897e77b264a';
        
        // 1. Full Hero Screenshot
        const fullHeroPath = path.join(artifactDir, 'ar_hero_full_before.png');
        await page.screenshot({ path: fullHeroPath });
        console.log(`Saved: ${fullHeroPath}`);
        
        // 2. Close-up of labels/title/meta
        // We'll just crop or take a smaller screenshot of the bottom area and top area
        // Or just take a screenshot of the hero section specifically
        const hero = await page.$('section');
        if (hero) {
            const closeUpPath = path.join(artifactDir, 'ar_hero_closeup_before.png');
            await hero.screenshot({ path: closeUpPath });
            console.log(`Saved: ${closeUpPath}`);
        }

    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
