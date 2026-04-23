#!/bin/bash
SITEMAP="https://www.topvpnr.com/sitemap.xml"

# Ping Google
curl -s "https://www.google.com/ping?sitemap=$SITEMAP" > /dev/null
echo "Google pinged"

# Ping Bing
curl -s "https://www.bing.com/ping?sitemap=$SITEMAP" > /dev/null
echo "Bing pinged"

# Ping Yandex
curl -s "https://webmaster.yandex.com/ping?sitemap=$SITEMAP" > /dev/null
echo "Yandex pinged"

# Ping IndexNow (submits to Bing, Yandex, Seznam simultaneously)
curl -s "https://api.indexnow.org/indexnow?url=$SITEMAP&key=1957f13beac545a1b2367587c681ab07" > /dev/null
echo "IndexNow pinged"

echo "All search engines pinged successfully!"
