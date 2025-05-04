<meta name='viewport' content='width=device-width, initial-scale=1'/><script>const express = require('express');
const puppeteer = require('puppeteer');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/watch', async (req, res) => {
    const { url } = req.query;
    if (!url) return res.send('يرجى إدخال رابط الفيديو');

    try {
        const browser = await puppeteer.launch({ headless: 'new' });
        const page = await browser.newPage();
        await page.goto(url);

        // استخراج رابط الفيديو الحقيقي
        const videoUrl = await page.evaluate(() => {
            const video = document.querySelector('video');
            return video ? video.src : window.location.href;
        });

        await browser.close();

        // إعادة توجيه المستخدم لرابط الفيديو
        res.redirect(videoUrl);

    } catch (err) {
        console.error(err);
        res.status(500).send('حدث خطأ في معالجة الفيديو');
    }
});

app.listen(PORT, () => {
    console.log(`🚀 الخادم يعمل على http://localhost:${PORT}`);
});</script>