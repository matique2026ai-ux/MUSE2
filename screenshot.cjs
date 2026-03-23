const { chromium } = require('playwright');
const path = require('path');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage({ viewport: { width: 1366, height: 1024 } });
    
    try {
        await page.goto('http://localhost:3000/en/projects/civic-hub', { waitUntil: 'networkidle' });
        
        // Wait for fonts and animations
        await page.waitForTimeout(2000);
        
        // Scroll to the Editorial Section
        await page.evaluate(() => {
            const section = document.querySelector('section');
            if (section) section.scrollIntoView();
        });
        
        const screenshotPath = path.resolve('C:/Users/PCIB/.gemini/antigravity/brain/edd418ad-cace-4e13-a1ca-8b93e4ed3084/en_it10_final.png');
        await page.screenshot({ path: screenshotPath, fullPage: true });
        console.log(`Success: ${screenshotPath}`);
    } catch (e) {
        console.error(e);
    } finally {
        await browser.close();
    }
})();
